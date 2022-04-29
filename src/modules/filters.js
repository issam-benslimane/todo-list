const Filters = (function () {
  let filters = [];

  const getSelectedFilter = () => filters.find((e) => e.active);
  const changeFilter = (filter) => {
    if (filter === currentFilter) return;
    currentFilter = filter;
  };
  const addFilter = (details) => filters.push({ ...details });

  return { changeFilter, addFilter, getSelectedFilter };
})();
