import { useContext, useEffect, useReducer } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import donationsReducer from "../Reducers/donationsReducer";
import axios from "axios";
import Messages from "../Contexts/Messages";
import { v4 } from "uuid";

export default function useDonations(dispatchStories) {
  const [donators, dispatchDonators] = useReducer(donationsReducer, []);
  const [donations, dispatchDonations] = useReducer(donationsReducer, []);
  const { setMessages } = useContext(Messages);

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

  const submitDonation = async (storyId, newDonation) => {
    if (!newDonation?.name || !newDonation?.donation_amount) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(C.SERVER_URL + "newDonation", {
        ...newDonation,
        story_id: storyId,
        created_at: new Date().toISOString().split("T")[0],
      })
      .then((res) => {
        setMessages((prevMessages) => {
          return [
            { id: v4(), type: "success", text: "Donation successful!" },
            ...prevMessages,
          ];
        });

        return Promise.all([
          axios.get(C.SERVER_URL + "donators"),
          axios.get(C.SERVER_URL + "donations"),
          axios.get(C.SERVER_URL + "stories"),
        ]);
      })
      .then(([donatorsRes, donationsRes, storiesRes]) => {
        dispatchDonators({
          type: A.LOAD_DONATORS_FROM_SERVER,
          payload: donatorsRes.data.db,
        });
        dispatchDonations({
          type: A.LOAD_DONATIONS_FROM_SERVER,
          payload: donationsRes.data.db,
        });
        dispatchStories({
          type: A.LOAD_STORIES_FROM_SERVER,
          payload: storiesRes.data.db,
        });
      })
      .catch((error) => {
        console.error(
          "Error submitting donation:",
          error.response || error.message || error
        );
      });
  };

  return {
    donators,
    dispatchDonators,
    donations,
    dispatchDonations,
    submitDonation,
  };
}
