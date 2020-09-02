export default function isAdmin(
  state = localStorage.getItem("px_isadmin")
    ? localStorage.getItem("px_isadmin")
    : false,
  action
) {
  switch (action.type) {
    case "ISADMIN":
      localStorage.setItem("px_isadmin", action.payload);
      return action.payload;
    default:
      return state;
  }
}
