import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as C from "../Constants/main";
import { useNavigate } from "react-router";
import Messages from "../Contexts/Messages";
import { v4 } from "uuid";

export default function useAuth(setUser) {
  const [loginForm, setLoginForm] = useState(null);
  const navigate = useNavigate();
  const { setMessages } = useContext(Messages);
  const getUser = (_) => {
    axios
      .get(C.SERVER_URL + "auth-user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(
    (_) => {
      if (null === loginForm) {
        return;
      }
      axios
        .post(C.SERVER_URL + "login", loginForm, { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
          navigate(C.GO_AFTER_LOGIN);
          setMessages((prevMessages) => {
            return [
              { id: v4(), type: "success", text: "Login successful!" },
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
    },
    [loginForm]
  );
  return { setLoginForm, getUser };
}
