"use strict";
const filterBar = document.getElementById("product-filters");
if (filterBar) {
  filterBar.hidden = false;
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    let count = 0;
    document.querySelectorAll(".product[data-kind]").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        !card.dataset.kind.split(" ").includes(button.dataset.filter);
      if (!card.hidden) count++;
    });
    filterBar
      .querySelectorAll("button")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    document.getElementById("filter-status").textContent =
      `Showing ${count} options. Read the qualification limits on each card.`;
  });
}
