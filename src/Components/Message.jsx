import { useContext, useEffect } from "react";
import Messages from "../Contexts/Messages";

export default function Message() {
  const { messages, setMessages } = useContext(Messages);
  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messages[0].id)
        );
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [messages, setMessages]);
  return (
    <div>
      {messages?.length > 0 &&
        messages.map((m) => {
          return (
            <div className="messages" key={m.id}>
              {m.text}
            </div>
          );
        })}
    </div>
  );
}
