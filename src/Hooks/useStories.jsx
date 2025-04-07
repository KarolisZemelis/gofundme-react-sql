import { useReducer, useEffect, useState } from "react";
import * as C from "../Constants/main";
import * as A from "../Constants/actions";
import axios from "axios";
import storiesReducer from "../Reducers/storiesReducer";

export default function useStories() {
  const [stories, dispatchStories] = useReducer(storiesReducer, []);
  const [storeStory, setStoreStory] = useState(null);

  useEffect(
    (_) => {
      if (null === storeStory) {
        return;
      }
      axios
        .post(C.SERVER_URL + "stories/new", storeStory, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setStoreStory(null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [storeStory]
  );

  useEffect((_) => {
    axios
      .get(C.SERVER_URL + "stories")
      .then((res) => {
        dispatchStories({
          type: A.LOAD_STORIES_FROM_SERVER,
          payload: res.data.db,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleStatusChange = async (id, status) => {
  //   axios
  //     .post(C.SERVER_URL + `updateStoryStatus/${id}`, {
  //       status: status,
  //     })
  //     .then((res) => {
  //       dispatchStories({
  //         type: A.UPDATE_STORIES_AFTER_STATUS,
  //         payload: { story_id: id, status: status },
  //       });
  //       console.log("success");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return {
    stories,
    dispatchStories,
    // handleStatusChange,
    storeStory,
    setStoreStory,
  };
}
