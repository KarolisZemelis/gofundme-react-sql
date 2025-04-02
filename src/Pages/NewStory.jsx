import { useState, useContext } from "react";
import useImage from "../Hooks/useImage";
import Data from "../Contexts/Data";

export default function NewStory() {
  const { image, readFile, remImage } = useImage();
  const { setStoreStory } = useContext(Data);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [requestAmount, setRequestAmount] = useState(0);
  console.log("newstory image", image);
  const handleSubmit = (_) => {
    setStoreStory({
      name,
      text,
      requestAmount,
      image,
    });
  };
  return (
    <section className="main">
      <div className="story-form">
        <div className="story-form__top">
          <h1>Create new story</h1>
        </div>
        <div className="story-form__name">
          <input
            type="text"
            id="name"
            placeholder="Name of your story"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="story-form__text">
          <textarea
            placeholder="Tell us about the story?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="story-form__request">
          <input
            type="number"
            id="request_amount"
            min={1}
            placeholder="What is the requested amount?"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
          />
        </div>
        <div className="story-form__image__container">
          {image.src ? (
            <div className="story-form__image__container__addedImage">
              <img src={image.src} alt="story picture" />
            </div>
          ) : (
            <div className="story-form__image__container__no-image"></div>
          )}
          <div className="story-form__image__container__buttons">
            <input
              id={image.id}
              type="file"
              onChange={(e) => readFile(e, image.id)}
            />
            <label htmlFor={image.id} className="add">
              Choose Image
            </label>
            <label className="rem" onClick={(_) => remImage(image.id)}>
              <span>Remove Image</span>
            </label>
          </div>
        </div>
        <button
          type="story-form__submit"
          className="submit"
          onClick={handleSubmit}
        >
          Submit Story
        </button>
      </div>
    </section>
  );
}
