import { useState } from "react";
import { BrandPick } from "./filters/BrandFilter";
import { NameFilter } from "./filters/NameFilter";
import { PriceFilter } from "./filters/PriceFilter";

import md5 from "md5";
import { fetchIds } from "./functions/fetchIds";
const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = md5(`Valantis_${timeStamp}`);

export const Filters = ({ setPositions }) => {
  const [filters, setFilters] = useState();
  console.log(filters);
  function search() {
    try {
      fetch("http://api.valantis.store:40000/", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "X-Auth": password,
        },
        body: JSON.stringify({
          action: "filter",
          params: filters,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          fetchIds(data.result).then((data) => {
            let unique = Array.from(
              new Set(data.result.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));
            console.log(data.status);
            setPositions(unique);
          });
        });
    } catch (err) {
      console.log(err);
      search();
    }
  }
  return (
    <>
      <NameFilter filter={{ filters: filters, setFilter: setFilters }} />
      <PriceFilter filter={{ filters: filters, setFilter: setFilters }} />
      <BrandPick filter={{ filters: filters, setFilter: setFilters }} />
      <button onClick={search}>Поиск</button>
    </>
  );
};