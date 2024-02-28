import md5 from "md5";
import { fetchIds } from "./fetchIds";

const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = md5(`Valantis_${timeStamp}`);

export function getPositions(setPositions) {
  try {
    // первые 50
    fetch("http://api.valantis.store:40000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": password,
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
    // все
    fetch("http://api.valantis.store:40000/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Auth": password,
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
  } catch (err) {
    console.log(err);
    getPositions(setPositions);
  }
}
