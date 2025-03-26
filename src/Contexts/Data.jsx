import { createContext } from "react";
import useDonations from "../Hooks/useDonations";
import useStories from "../Hooks/useStories";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const { donations, dispatchDonations, newDonation, setNewDonation } =
    useDonations();

  const { stories, dispatchStories } = useStories();

  return (
    <Data.Provider
      value={{
        donations,
        dispatchDonations,
        newDonation,
        setNewDonation,
        stories,
        dispatchStories,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default Data;
