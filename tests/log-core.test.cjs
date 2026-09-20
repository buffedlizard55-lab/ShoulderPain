const { test } = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/log-core.js");
const good = {
  side: "mixed",
  m: 0,
  e: 5,
  hours: 12,
  breaks: 4,
  flags: { wing: true },
  notes: "Hello",
};
const parse = (x) => C.parse({ version: 1, entries: x }, "2026-09-20");
test("real past dates only; leap years and future handled", () => {
  for (const x of [
    "2026-02-30",
    "2025-02-29",
    "2026-09-21",
    "not-date",
    "0000-01-01",
  ])
    assert.equal(C.validDate(x, "2026-09-20"), false);
  assert.equal(C.validDate("2024-02-29", "2026-09-20"), true);
});
test("valid legacy v1 data retained with empty scores not zero", () => {
  const { entries, skipped } = parse({
    "2026-09-20": { ...good, m: null, e: null },
  });
  assert.equal(skipped, 0);
  assert.equal(entries["2026-09-20"].m, null);
  assert.equal(entries["2026-09-20"].flags.wing, true);
});
test("malformed numbers and booleans never coerced or rounded", () => {
  for (const [key, value] of [
    ["m", true],
    ["e", []],
    ["m", "5"],
    ["e", NaN],
    ["e", Infinity],
    ["hours", 25],
    ["breaks", 1.4],
    ["breaks", -1],
    ["exA", "false"],
  ])
    assert.equal(parse({ "2026-09-20": { ...good, [key]: value } }).skipped, 1);
});
test("invalid entries counted, not clamped or used in summaries", () => {
  const r = parse({
    "2026-09-20": good,
    "2026-02-30": good,
    "2026-09-19": null,
  });
  assert.equal(r.skipped, 2);
  assert.deepEqual(Object.keys(r.entries), ["2026-09-20"]);
});
test("invalid container, version, flags, notes, side rejected", () => {
  for (const x of [null, [], { entries: [] }, { version: 2, entries: {} }])
    assert.throws(() => C.parse(x));
  for (const x of [
    { flags: [] },
    { notes: 55 },
    { notes: "x".repeat(501) },
    { side: "unknown" },
  ])
    assert.equal(parse({ "2026-09-20": { ...good, ...x } }).skipped, 1);
});
test("prototype keys cannot enter date-indexed storage", () => {
  const x = JSON.parse('{"__proto__":{"side":"mixed"},"constructor":{}}');
  const result = parse(x);
  assert.equal(result.skipped, 2);
  assert.equal(Object.getPrototypeOf(result.entries), null);
});
test("entry limit", () => {
  assert.throws(() =>
    C.parse({
      entries: Object.fromEntries(
        Array.from({ length: 5001 }, (_, i) => [i, good]),
      ),
    }),
  );
});
test("CSV formula prevention, quoting, newlines, and null", () => {
  for (const x of ["=1+1", "+cmd", "-1", "@SUM(1)", "  =1", "\tcmd"])
    assert.ok(C.csvCell(x).startsWith("\"'"));
  assert.equal(C.csvCell('said "hello"'), '"said ""hello"""');
  assert.equal(C.csvCell(null), '""');
  assert.equal(C.csvCell("line1\nline2"), '"line1\nline2"');
});
