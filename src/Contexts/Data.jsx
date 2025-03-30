import { createContext, useReducer, useEffect, useState } from "react";
import useStories from "../Hooks/useStories";
import axios from "axios";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import donatorsReducer from "../Reducers/donationsReducer";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const [donations, dispatchDonations] = useReducer(donatorsReducer, []);
  const { stories, dispatchStories } = useStories();
  const [modalStoryId, setModalStoryId] = useState(false);

  useEffect(
    (_) => {
      axios
        .get(C.SERVER_URL + "stories/1")
        .then((res) => {
          dispatchStories({
            type: A.LOAD_STORIES_FROM_SERVER,
            payload: res.data.db,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [donations, dispatchStories]
  );
  return (
    <Data.Provider
      value={{
        donations,
        dispatchDonations,
        stories,
        dispatchStories,
        modalStoryId,
        setModalStoryId,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default Data;
