import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the real checkout handler with a pending API request and local state.
function checkout(createOrder) {
  const state = initial => {
    let value = initial;
    return Object.assign(() => value, { set: next => { value = next; } });
  };
  const cart = {
    items: state([{ product: { id: 'plant', price: 20 }, quantity: 1 }]),
    subtotal: state(20), discountTotal: state(0), total: state(20),
    appliedCoupons: state([]), clear() { this.items.set([]); },
  };
  const source = readFileSync(new URL('../src/app/components/checkout/checkout.component.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, experimentalDecorators: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === '@angular/core') return {
        Component: () => target => target, signal: state,
        inject: token => token === 'cart' ? cart : { createOrder },
      };
      if (name.endsWith('/cart.service')) return { CartService: 'cart' };
      if (name.endsWith('/store-data.service')) return { StoreDataService: 'store' };
      return {};
    },
  });
  const component = new exports.CheckoutComponent();
  component.form = { fullName: 'Test', email: 'test@example.com', address: '1 Main', city: 'Boston', state: 'MA', zip: '02101', country: 'United States' };
  return component;
}
const event = { preventDefault() {} };

test('rapid submissions create one order, including after success', async () => {
  let finish;
  let calls = 0;
  const component = checkout(() => { calls++; return new Promise(resolve => { finish = resolve; }); });
  const pending = component.onSubmit(event);
  assert.equal(component.submitting(), true);
  await component.onSubmit(event);
  assert.equal(calls, 1);
  finish();
  await pending;
  await component.onSubmit(event);
  assert.equal(calls, 1);
  assert.equal(component.orderSuccess(), true);
  assert.equal(component.submitting(), false);
});

test('failed orders release the guard so checkout can be retried', async () => {
  let calls = 0;
  const component = checkout(async () => {
    if (++calls === 1) throw new Error('Temporary failure');
  });
  await component.onSubmit(event);
  assert.equal(component.errorMessage(), 'Temporary failure');
  assert.equal(component.submitting(), false);
  await component.onSubmit(event);
  assert.equal(calls, 2);
  assert.equal(component.orderSuccess(), true);
});
