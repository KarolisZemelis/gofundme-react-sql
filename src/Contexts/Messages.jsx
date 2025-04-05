import { createContext, useState } from "react";

const Messages = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <Messages.Provider value={{ messages, setMessages }}>
      {children}
    </Messages.Provider>
  );
};
export default Messages;
