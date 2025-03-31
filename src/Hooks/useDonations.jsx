import { useContext, useEffect, useState } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import Data from "../Contexts/Data";

export default function useDonations() {
  const { donators, dispatchDonators, dispatchDonations } = useContext(Data);
  const [newDonation, setNewDonation] = useState();

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

  const submitDonation = async (storyId) => {
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

      const res = await axios.get(C.SERVER_URL + "donators");

      dispatchDonators({
        type: A.LOAD_DONATORS_FROM_SERVER,
        payload: [...res.data.db],
      });
      dispatchDonations({
        type: A.LOAD_DONATIONS_FROM_SERVER,
        payload: res.data.db,
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
    donators,
    dispatchDonators,
    newDonation,
    setNewDonation,
    submitDonation,
  };
}
