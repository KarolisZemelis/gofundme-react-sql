import { createContext } from "react";
import useDonators from "../Hooks/useDonators";
import useStories from "../Hooks/useStories";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const { donators, dispatchDonators } = useDonators();
  const { stories, dispatchStories } = useStories();
  return (
    <Data.Provider
      value={{ donators, dispatchDonators, stories, dispatchStories }}
    >
      {children}
    </Data.Provider>
  );
};

export default Data;
