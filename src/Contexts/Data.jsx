import { createContext, useReducer, useState } from "react";
import useStories from "../Hooks/useStories";
import donationsReducer from "../Reducers/donationsReducer";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const [donators, dispatchDonators, donations, dispatchDonations] = useReducer(
    donationsReducer,
    []
  );
  const { stories, dispatchStories, setStoreStory } = useStories();
  const [modalStoryId, setModalStoryId] = useState(null);
  console.log("esu Data kontekste");
  // useEffect(
  //   (_) => {
  //     axios
  //       .get(C.SERVER_URL + "stories/1")
  //       .then((res) => {
  //         dispatchStories({
  //           type: A.LOAD_STORIES_FROM_SERVER,
  //           payload: res.data.db,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     console.log("esu Data kontekste USEEFFECT");
  //   },
  //   [donators, donations]
  // );

  return (
    <Data.Provider
      value={{
        donators,
        dispatchDonators,
        donations,
        dispatchDonations,
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
