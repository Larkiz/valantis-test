import { useEffect, useState } from "react";
import md5 from "md5";
const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = md5(`Valantis_${timeStamp}`);

export const BrandPick = ({ filter }) => {
  const [brands, setBrands] = useState(null);
  useEffect(() => {
    fetch("http://api.valantis.store:40000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": password,
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
