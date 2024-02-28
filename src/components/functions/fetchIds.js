import md5 from "md5";

const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = md5(`Valantis_${timeStamp}`);

export function fetchIds(ids) {
  const params =
    ids.length > 0
      ? { action: "get_items", params: { ids: ids } }
      : { action: "get_items" };

  return fetch("http://api.valantis.store:40000/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "X-Auth": password,
    },
    body: JSON.stringify(params),
  }).then((res) => {
    return res.json();
  });
}
