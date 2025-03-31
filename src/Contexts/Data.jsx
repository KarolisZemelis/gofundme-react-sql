import { createContext, useReducer, useEffect, useState } from "react";
import useStories from "../Hooks/useStories";
import axios from "axios";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import donationsReducer from "../Reducers/donationsReducer";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const [donators, dispatchDonators] = useReducer(donationsReducer, []);
  const [donations, dispatchDonations] = useReducer(donationsReducer, []);
  const { stories, dispatchStories } = useStories();
  const [modalStoryId, setModalStoryId] = useState(null);

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
    [donators, donations]
  );

  return (
    <Data.Provider
      value={{
        donators,
        dispatchDonators,
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
