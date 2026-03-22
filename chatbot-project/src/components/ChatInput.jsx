import { Chatbot } from "supersimpledev";
import { useState } from "react";
import LoadingSpinner from "../assets/loading-spinner.gif";
import dayjs from "supersimpledev/dayjs";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        sender: "user",
        message: inputText,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages([
      ...newChatMessages,

      {
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        sender: "robot",
        message: response,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
  }

  function clearMessages() {
    setChatMessages([]);
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        className="chat-input"
        onChange={saveInputText}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>

      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}

export default ChatInput;
