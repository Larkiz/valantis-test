import apiPassword from "../../password";
import { fetchIds } from "./fetchIds";

export function getPositions(setPositions) {
  function first() {
    // первые 50
    fetch("https://api.valantis.store:41000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": apiPassword,
      },
      body: JSON.stringify({
        action: "get_ids",
        params: { offset: 0, limit: 50 },
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

          setPositions(unique);
        });
      });
  }
  function all() {
    // все
    fetch("https://api.valantis.store:41000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": apiPassword,
      },
      body: JSON.stringify({
        action: "get_ids",
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

          setPositions(unique);
        });
      });
  }
  try {
    first();
  } catch (err) {
    console.log(err);
    first();
  }
  try {
    all();
  } catch (err) {
    console.log(err);
    all();
  }
}
