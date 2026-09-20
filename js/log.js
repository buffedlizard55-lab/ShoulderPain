(function () {
  "use strict";
  const C = window.LogCore,
    KEY = "shoulderpain-log-v1";
  const $ = (id) => document.getElementById(id);
  let entries = Object.create(null),
    blocked = false,
    rawStored = null;
  const status = (message) => {
    $("log-status").textContent = message;
  };
  const flagText = (x) =>
    Object.keys(x.flags)
      .filter((k) => x.flags[k])
      .join(", ") || "—";
  const display = (x) => (x === null || x === undefined ? "—" : String(x));
  $("tracker").hidden = false;
  function readStorage() {
    try {
      rawStored = localStorage.getItem(KEY);
      if (!rawStored) {
        entries = Object.create(null);
        return;
      }
      const result = C.parse(JSON.parse(rawStored));
      if (result.skipped)
        throw Error(`${result.skipped} invalid stored entries`);
      entries = result.entries;
    } catch (error) {
      blocked = true;
      status(
        "Storage unavailable or invalid: " +
          error.message +
          ". Saving/import are blocked to protect existing data. Export the raw JSON backup if available, then delete the stored log to reset.",
      );
    }
  }
  function persist(next) {
    if (blocked) {
      status(
        "Saving is blocked. Export existing data and resolve the storage warning first.",
      );
      return false;
    }
    try {
      const serialized = JSON.stringify({ version: 1, entries: next });
      localStorage.setItem(KEY, serialized);
      entries = next;
      rawStored = serialized;
      render();
      return true;
    } catch {
      status(
        "Could not save. Your previous saved entries are unchanged; the current form is still here. Check browser storage access/space.",
      );
      return false;
    }
  }
  function reset() {
    $("entry-form").reset();
    $("f-date").value = C.today();
    $("f-date").max = C.today();
  }
  function formEntry() {
    const value = (id) => ($(id).value === "" ? null : Number($(id).value));
    return C.entry({
      m: value("f-morning"),
      e: value("f-evening"),
      side: $("f-side").value,
      hours: value("f-hours"),
      breaks: value("f-breaks"),
      exA: $("f-exA").checked,
      exB: $("f-exB").checked,
      flags: Object.fromEntries(
        ["wing", "weak", "nerve", "injury"].map((k) => [
          k,
          $("f-" + k).checked,
        ]),
      ),
      notes: $("f-notes").value,
    });
  }
  function render() {
    const dates = Object.keys(entries).sort().reverse();
    $("history-body").replaceChildren();
    if (!dates.length) {
      const row = document.createElement("tr"),
        cell = document.createElement("td");
      cell.colSpan = 10;
      cell.textContent = "No saved entries.";
      row.append(cell);
      $("history-body").append(row);
    }
    for (const date of dates) {
      const x = entries[date],
        row = document.createElement("tr");
      for (const value of [
        date,
        x.side,
        x.m,
        x.e,
        x.hours,
        x.breaks,
        `${x.exA ? "Yes" : "No"} / ${x.exB ? "Yes" : "No"}`,
        flagText(x),
        x.notes,
      ]) {
        const cell = document.createElement("td");
        cell.textContent = display(value);
        row.append(cell);
      }
      const actions = document.createElement("td");
      for (const text of ["Load", "Delete"]) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "table-button";
        b.textContent = text;
        b.setAttribute("aria-label", text + " entry " + date);
        b.addEventListener("click", () => {
          if (text === "Delete") {
            if (!confirm("Delete entry for " + date + "?")) return;
            const next = { ...entries };
            delete next[date];
            if (persist(next)) status("Deleted entry for " + date + ".");
          } else {
            $("f-date").value = date;
            $("f-side").value = x.side;
            for (const [id, key] of [
              ["morning", "m"],
              ["evening", "e"],
              ["hours", "hours"],
              ["breaks", "breaks"],
            ])
              $("f-" + id).value = x[key] ?? "";
            $("f-exA").checked = x.exA;
            $("f-exB").checked = x.exB;
            for (const key of ["wing", "weak", "nerve", "injury"])
              $("f-" + key).checked = x.flags[key];
            $("f-notes").value = x.notes;
            $("f-date").focus();
            status("Loaded " + date + ". Save to update.");
          }
        });
        actions.append(b);
      }
      row.append(actions);
      $("history-body").append(row);
    }
    const now = Date.parse(C.today() + "T00:00:00Z");
    const values = dates
      .filter((d) => now - Date.parse(d + "T00:00:00Z") < 7 * 86400000)
      .map((d) => entries[d].e)
      .filter((v) => v !== null);
    const average = values.length
      ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) +
        "/10 from " +
        values.length +
        " recorded evening scores"
      : "not recorded";
    $("log-summary").textContent =
      `${dates.length} days logged. Last 7 calendar days, average evening pain: ${average}.`;
  }
  $("entry-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const date = $("f-date").value;
    if (!C.validDate(date)) {
      status("Use a valid date from 1900 through today.");
      return;
    }
    try {
      const x = formEntry();
      if (!entries[date] && Object.keys(entries).length >= C.MAX_ENTRIES) {
        status(
          "5,000 entry limit reached. Export before removing old entries.",
        );
        return;
      }
      if (
        entries[date] &&
        !confirm("Replace the existing entry for " + date + "?")
      )
        return;
      if (persist({ ...entries, [date]: x }))
        status(
          "Saved " +
            date +
            "." +
            (flagText(x) !== "—"
              ? " Symptoms flagged: review the care thresholds now; this log does not assess urgency."
              : ""),
        );
    } catch (e) {
      status("Not saved: " + e.message + ". Check the form values.");
    }
  });
  $("reset-form").addEventListener("click", () => {
    reset();
    status("Form cleared; saved history unchanged.");
  });
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $("export-json").addEventListener("click", () => {
    const text = blocked
      ? rawStored
      : JSON.stringify({ version: 1, exported: C.today(), entries }, null, 2);
    if (!text) {
      status("No stored data is available for export.");
      return;
    }
    download(
      "shoulderpain-log-" + C.today() + ".json",
      text,
      "application/json",
    );
    status(
      blocked
        ? "Exported raw stored data for recovery; it may be invalid."
        : "JSON backup exported. Keep it private.",
    );
  });
  $("export-csv").addEventListener("click", () => {
    if (blocked) {
      status("Use raw JSON export to recover invalid stored data.");
      return;
    }
    const rows = [
      [
        "date",
        "sleep",
        "pain_am",
        "pain_pm",
        "desk_hours",
        "breaks",
        "mobility",
        "strength",
        "flags",
        "notes",
      ],
    ];
    Object.keys(entries)
      .sort()
      .forEach((d) => {
        const x = entries[d];
        rows.push([
          d,
          x.side,
          x.m,
          x.e,
          x.hours,
          x.breaks,
          x.exA,
          x.exB,
          flagText(x),
          x.notes,
        ]);
      });
    download(
      "shoulderpain-log-" + C.today() + ".csv",
      rows.map((r) => r.map(C.csvCell).join(",")).join("\r\n"),
      "text/csv",
    );
    status("CSV exported. Keep it private.");
  });
  $("import-json").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    if (blocked) {
      status(
        "Import blocked to protect existing data. Resolve the storage warning first.",
      );
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      status("Import rejected: file exceeds 20 MB.");
      return;
    }
    try {
      const { entries: incoming, skipped } = C.parse(
        JSON.parse(await file.text()),
      );
      const count = Object.keys(incoming).length;
      if (!count) {
        status(
          `No valid entries to import; ${skipped} invalid entries skipped.`,
        );
        return;
      }
      const replaced = Object.keys(incoming).filter((d) => entries[d]).length;
      const merged = { ...entries, ...incoming };
      if (Object.keys(merged).length > C.MAX_ENTRIES)
        throw Error("Merged log exceeds 5,000 entries.");
      if (
        !confirm(
          `Import ${count} entries, replacing ${replaced} dates? ${skipped} invalid entries will be skipped. Export a backup first if needed.`,
        )
      )
        return;
      if (persist(merged))
        status(
          `Imported ${count} valid entries; ${replaced} replaced; ${skipped} invalid entries skipped.`,
        );
    } catch (e) {
      status("Import failed: " + e.message);
    }
  });
  $("clear-log").addEventListener("click", () => {
    if (
      !confirm(
        "Delete all stored entries? Export a backup first. This cannot be undone.",
      )
    )
      return;
    try {
      localStorage.removeItem(KEY);
      entries = Object.create(null);
      rawStored = null;
      blocked = false;
      render();
      status("Stored log deleted. Exported files are not deleted.");
    } catch {
      status("Could not delete: browser storage is unavailable.");
    }
  });
  $("print-log").addEventListener("click", () => window.print());
  window.addEventListener("storage", (event) => {
    if (event.key === KEY || event.key === null) {
      rawStored = event.newValue;
      blocked = true;
      status(
        "Log changed in another tab. Reload before editing to avoid overwriting those changes.",
      );
    }
  });
  reset();
  readStorage();
  render();
})();
