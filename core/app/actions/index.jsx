export function SendMessage(message) {
  return {
    type: "MESAGE_SEND",
    playload: message
  };
}
