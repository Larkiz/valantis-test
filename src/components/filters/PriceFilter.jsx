export const PriceFilter = ({ filter }) => {
  function changeBrand(e) {
    if (e.target.value == "") {
      const newFilter = { ...filter.filters };
      delete newFilter.price;
      filter.setFilter(newFilter);
    } else {
      filter.setFilter({
        ...filter.filters,
        price: Number(e.target.value),
      });
    }
  }
  return (
    <>
      <input onChange={changeBrand} type="text" placeholder="Цена" />
    </>
  );
};
