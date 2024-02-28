export const NameFilter = ({ filter }) => {
  function changeBrand(e) {
    if (e.target.value == "") {
      const newFilter = { ...filter.filters };
      delete newFilter.product;
      filter.setFilter(newFilter);
    } else {
      filter.setFilter({ ...filter.filters, product: e.target.value });
    }
  }
  return (
    <>
      <input onChange={changeBrand} type="text" placeholder="Название" />
    </>
  );
};
