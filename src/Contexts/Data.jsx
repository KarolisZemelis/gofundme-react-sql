import { createContext, useState } from "react";
import useStories from "../Hooks/useStories";
import useDonations from "../Hooks/useDonations";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const { stories, dispatchStories, setStoreStory } = useStories();
  const {
    donators,
    dispatchDonators,
    donations,
    dispatchDonations,
    submitDonation,
  } = useDonations(dispatchStories);

  const [modalStoryId, setModalStoryId] = useState(null);

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
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default Data;
