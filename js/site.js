"use strict";
const filterBar = document.getElementById("product-filters");
if (filterBar) {
  const cards = [...document.querySelectorAll(".product[data-kind]")];
  const status = document.getElementById("filter-status");
  const describe = (count) =>
    `Showing ${count} option${count === 1 ? "" : "s"}. Read the qualification limits on each card.`;

  function applyFilter(button) {
    const filter = button.dataset.filter;
    let count = 0;
    cards.forEach((card) => {
      const visible =
        filter === "all" || card.dataset.kind.split(" ").includes(filter);
      card.hidden = !visible;
      if (visible) count += 1;
    });
    filterBar
      .querySelectorAll("button")
      .forEach((candidate) =>
        candidate.setAttribute("aria-pressed", String(candidate === button)),
      );
    if (status) status.textContent = describe(count);
  }

  filterBar.hidden = false;
  const allButton = filterBar.querySelector('button[data-filter="all"]');
  if (allButton) applyFilter(allButton);
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (button) applyFilter(button);
  });
}
