export default function (state = null, action) {
  switch (action.type) {
    case "MESAGE_SEND":
      return action.playload;
  }
  return state
}
