import { useContext, useEffect, useState } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import donationsReducer from "../Reducers/donationsReducer";
import Data from "../Contexts/Data";

export default function useDonations() {
  const { donations, dispatchDonations } = useContext(Data);
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

  const submitDonation = async (storyId) => {
    console.log("test", newDonation);
    if (!newDonation?.name || !newDonation?.donation_amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(C.SERVER_URL + "newDonation", {
        ...newDonation,
        story_id: storyId,
        created_at: new Date().toISOString().split("T")[0],
      });

      console.log("Donation submitted successfully");

      const res = await axios.get(C.SERVER_URL + "donations");

      dispatchDonations({
        type: A.LOAD_DONATIONS_FROM_SERVER,
        payload: [...res.data.db],
      });

      setNewDonation({});
    } catch (error) {
      console.error(
        "Error submitting donation:",
        error.response || error.message || error
      );
    }
  };

  return {
    donations,
    dispatchDonations,
    newDonation,
    setNewDonation,
    submitDonation,
  };
}
