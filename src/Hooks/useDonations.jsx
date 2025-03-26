import { useReducer, useEffect, useState } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import donationsReducer from "../Reducers/donationsReducer";

export default function useDonations() {
  const [donations, dispatchDonations] = useReducer(donationsReducer, null);
  const [newDonation, setNewDonation] = useState();

  useEffect((_) => {
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

  return { donations, dispatchDonations, newDonation, setNewDonation };
}
