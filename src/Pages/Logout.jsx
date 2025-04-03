import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import * as C from "../Constants/main";
import Auth from "../Contexts/Auth";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(Auth);

  useEffect((_) => {
    axios
      .post(C.SERVER_URL + "logout", {}, { withCredentials: true })
      .then((res) => {
        //TO DO ADD MESSAGE HERE
        setUser(res.data.user);
        console.log("as esu logout prie navigate");
        navigate(C.GO_AFTER_LOGOUT);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <span>Logging out...</span>;
}
