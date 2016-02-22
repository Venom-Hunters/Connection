export function sendMessage(message, date) {
  console.log(message);
  return {
    type: "SEND_MESSAGE",
    playload: {
      message: message,
      date: date
    }
  };
}

export function getMessage() {
  return {
    type: "GET_MESSAGE",
    playload: message
  };
}
