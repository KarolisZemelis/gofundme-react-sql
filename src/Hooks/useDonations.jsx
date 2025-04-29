import { useEffect, useReducer } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import donationsReducer from "../Reducers/donationsReducer";
import axios from "axios";

export default function useDonations() {
  const [donators, dispatchDonators] = useReducer(donationsReducer, []);
  const [donations, dispatchDonations] = useReducer(donationsReducer, []);

  useEffect((_) => {
    axios
      .get(C.SERVER_URL + "donators")
      .then((res) => {
        dispatchDonators({
          type: A.LOAD_DONATORS_FROM_SERVER,
          payload: res.data.db,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(C.SERVER_URL + "donations")
      .then((res) => {
        dispatchDonations({
          type: A.LOAD_DONATIONS_FROM_SERVER,
          payload: res.data.db,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    donators,
    dispatchDonators,
    donations,
    dispatchDonations,
  };
}
