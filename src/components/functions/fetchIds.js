import apiPassword from "../../password";

export function fetchIds(ids) {
  const params =
    ids.length > 0
      ? { action: "get_items", params: { ids: ids } }
      : { action: "get_items" };

  return fetch("http://api.valantis.store:40000/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "X-Auth": apiPassword,
    },
    body: JSON.stringify(params),
  }).then((res) => {
    return res.json();
  });
}
