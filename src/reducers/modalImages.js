export default function modalImages(
  state = { images: [], shown: 999, code: null },
  action
) {
  switch (action.type) {
    case "MODALIMAGES":
      return action.payload;
    default:
      return state;
  }
}
