import { createContext, useEffect, useState } from "react";

const Messages = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  useEffect(
    (_) => {
      console.log(messages);
    },
    [messages]
  );
  return (
    <Messages.Provider value={{ messages, setMessages }}>
      {children}
    </Messages.Provider>
  );
};
export default Messages;
