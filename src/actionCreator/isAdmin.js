export default function isAdmin(key) {
  //console.log(key);
  return { type: "ISADMIN", payload: key };
}
