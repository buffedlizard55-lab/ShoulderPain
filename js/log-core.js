/* Pure validation shared by the browser and node tests; no network or storage. */
(function (root) {
  "use strict";
  const MAX_ENTRIES = 5000;
  const own = (x, key) => Object.prototype.hasOwnProperty.call(x, key);
  const object = (x) =>
    x !== null && typeof x === "object" && !Array.isArray(x);
  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function validDate(s, now = today()) {
    return (
      typeof s === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(s) &&
      s >= "1900-01-01" &&
      s <= now &&
      !Number.isNaN(Date.parse(s + "T00:00:00Z")) &&
      new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s
    );
  }
  function number(x, max, integer = false) {
    if (x === null || x === undefined || x === "") return null;
    if (
      typeof x !== "number" ||
      !Number.isFinite(x) ||
      x < 0 ||
      x > max ||
      (integer && !Number.isInteger(x))
    )
      throw Error("Invalid number");
    return x;
  }
  function bool(x) {
    if (x === undefined) return false;
    if (typeof x !== "boolean") throw Error("Invalid checkbox");
    return x;
  }
  function entry(x) {
    if (!object(x)) throw Error("Invalid entry");
    if (!["mixed", "left", "right", "back"].includes(x.side))
      throw Error("Invalid sleep side");
    if (x.flags !== undefined && !object(x.flags)) throw Error("Invalid flags");
    if (
      x.notes !== undefined &&
      (typeof x.notes !== "string" || x.notes.length > 500)
    )
      throw Error("Invalid notes");
    const flags = x.flags || {};
    return {
      m: number(x.m, 10),
      e: number(x.e, 10),
      side: x.side,
      hours: number(x.hours, 24),
      breaks: number(x.breaks, 99, true),
      exA: bool(x.exA),
      exB: bool(x.exB),
      flags: {
        wing: bool(flags.wing),
        weak: bool(flags.weak),
        nerve: bool(flags.nerve),
        injury: bool(flags.injury),
      },
      notes: x.notes || "",
    };
  }
  function parse(data, now = today()) {
    if (
      !object(data) ||
      !object(data.entries) ||
      (own(data, "version") && data.version !== 1)
    )
      throw Error("Expected a version 1 log with an entries object.");
    const keys = Object.keys(data.entries);
    if (keys.length > MAX_ENTRIES) throw Error("More than 5,000 dates.");
    const entries = Object.create(null);
    let skipped = 0;
    for (const date of keys) {
      try {
        if (!validDate(date, now)) throw Error("Invalid date");
        entries[date] = entry(data.entries[date]);
      } catch {
        skipped++;
      }
    }
    return { entries, skipped };
  }
  function csvCell(value) {
    let s = String(value ?? "");
    if (/^[\s]*[=+\-@]/.test(s) || /^[\t\r\n]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  }
  const api = { MAX_ENTRIES, today, validDate, entry, parse, csvCell };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.LogCore = api;
})(typeof window !== "undefined" ? window : globalThis);
