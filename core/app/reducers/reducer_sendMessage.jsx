export default function (state = [], action) {
  switch (action.type) {
    case "SEND_MESSAGE":
      return [action.playload, ...state];
  }
  return state
}
