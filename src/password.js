import md5 from "md5";
const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const apiPassword = md5(`Valantis_${timeStamp}`);

export default apiPassword;
