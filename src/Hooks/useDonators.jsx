import { useReducer, useEffect } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import donatorsReducer from "../Reducers/donatorsReducer";

export default function useDonators() {
  const [donators, dispatchDonators] = useReducer(donatorsReducer, null);

  useEffect((_) => {
    axios
      .get(C.SERVER_URL + "donators")
      .then((res) => {
        console.log("axios", res);
        dispatchDonators({
          type: A.LOAD_DONATORS_FROM_SERVER,
          payload: res.data.db,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { donators, dispatchDonators };
}
