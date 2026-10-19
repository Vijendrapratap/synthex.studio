import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, TOOLS, STACK_PRICE } from "./stack.ts";

const ids = Object.keys(TOOLS);

test("empty stack costs nothing", () => {
  assert.equal(quote([]).total, 0);
});

test("one tool has no discount and points at the 2-tool tier", () => {
  const q = quote(["seo"]);
  assert.equal(q.pct, 0);
  assert.equal(q.total, TOOLS.seo.price);
  assert.deepEqual(q.next, { need: 1, pct: 0.1 });
});

test("two tools get 10%", () => {
  const q = quote(["seo", "sentiment"]);
  assert.equal(q.pct, 0.1);
  assert.equal(q.total, Math.round((149 + 129) * 0.9));
  assert.equal(q.savings, q.list - q.total);
});

test("every tool is The Stack price", () => {
  const q = quote(ids);
  assert.equal(q.total, STACK_PRICE);
  assert.equal(q.isStack, true);
  assert.equal(q.next, null);
});

test("a partial stack never costs more than The Stack", () => {
  const q = quote(ids.slice(0, -1));
  assert.ok(q.total <= STACK_PRICE);
});

test("unknown and duplicate ids are ignored", () => {
  assert.equal(quote(["seo", "seo", "nope"]).total, TOOLS.seo.price);
});
