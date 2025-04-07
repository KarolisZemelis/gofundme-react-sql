import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import * as C from "../Constants/main";
import Auth from "../Contexts/Auth";
import Messages from "../Contexts/Messages";
import { v4 } from "uuid";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(Auth);
  const { setMessages } = useContext(Messages);

  useEffect((_) => {
    axios
      .post(C.SERVER_URL + "logout", {}, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        navigate(C.GO_AFTER_LOGOUT);
        setMessages((prevMessages) => {
          return [
            { id: v4(), type: "success", text: "Logout successful!" },
            ...prevMessages,
          ];
        });
      })
      .catch((err) => {
        console.log(err);
        setMessages((prevMessages) => {
          return [
            { id: v4(), type: "error", text: "Something went wrong!" },
            ...prevMessages,
          ];
        });
      });
  }, []);

  return <span>Logging out...</span>;
}
