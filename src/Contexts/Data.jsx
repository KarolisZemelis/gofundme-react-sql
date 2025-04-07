import { createContext, useContext, useState } from "react";
import useStories from "../Hooks/useStories";
import useDonations from "../Hooks/useDonations";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import Messages from "./Messages";
import { v4 } from "uuid";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const { stories, dispatchStories, setStoreStory } = useStories();
  const { donators, dispatchDonators, donations, dispatchDonations } =
    useDonations();
  const [modalStoryId, setModalStoryId] = useState(null);
  const { setMessages } = useContext(Messages);
  const handleStatusChange = async (id, status) => {
    axios
      .post(C.SERVER_URL + `updateStoryStatus/${id}`, {
        status: status,
      })
      .then((res) => {
        dispatchStories({
          type: A.UPDATE_STORIES_AFTER_STATUS,
          payload: { story_id: id, status: status },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitDonation = (storyId, newDonation) => {
    console.log("*************************************");
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
      .then(() => {
        dispatchDonators({
          type: A.UPDATE_DONATORS,
          payload: newDonation,
        });
        dispatchDonations({
          type: A.UPDATE_DONATIONS,
          payload: { ...newDonation, story_id: storyId },
        });
        dispatchStories({
          type: A.UPDATE_STORIES_AFTER_DONATION,
          payload: { ...newDonation, story_id: storyId },
        });
        setMessages((prevMessages) => {
          return [
            { id: v4(), type: "success", text: "Donation successful!" },
            ...prevMessages,
          ];
        });
      })
      .catch((error) => {
        console.error(
          "Error submitting donation:",
          error.response || error.message || error
        );
        setMessages((prevMessages) => {
          return [
            { id: v4(), type: "error", text: "Something went wrong!" },
            ...prevMessages,
          ];
        });
      });
  };

  return (
    <Data.Provider
      value={{
        donators,
        dispatchDonators,
        donations,
        dispatchDonations,
        submitDonation,
        stories,
        dispatchStories,
        setStoreStory,
        modalStoryId,
        setModalStoryId,
        handleStatusChange,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default Data;
