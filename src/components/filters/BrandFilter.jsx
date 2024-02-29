import { useEffect, useState } from "react";
import apiPassword from "../../password";

export const BrandPick = ({ filter }) => {
  const [brands, setBrands] = useState(null);
  function fetchBrand() {
    fetch("https://api.valantis.store:41000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": apiPassword,
      },
      body: JSON.stringify({
        action: "get_fields",
        params: { field: "brand" },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const filtered = data.result.filter((i) => {
          if (i != null) {
            return i;
          }
        });

        setBrands(filtered);
      });
  }
  useEffect(() => {
    try {
      fetchBrand();
    } catch (err) {
      fetchBrand();
    }
  }, []);

  function changeBrand(e) {
    if (e.target.value == "") {
      const newFilter = { ...filter.filters };
      delete newFilter.brand;
      filter.setFilter(newFilter);
    } else {
      filter.setFilter({ ...filter.filters, brand: e.target.value });
    }
  }

  return (
    <>
      <select onChange={changeBrand} name="">
        <option value={null}></option>
        {brands &&
          brands.map((i, j) => {
            return (
              <option key={j} value={i}>
                {i}
              </option>
            );
          })}
      </select>
    </>
  );
};
