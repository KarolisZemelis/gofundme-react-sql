import { useState } from "react";
import { v4 } from "uuid";

export default function useImage() {
  const [image, setImage] = useState({ id: v4(), src: "" });

  const imageReader = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (_) => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const readFile = (e, id) => {
    const img = e.target.files[0];
    console.log("esu hooke", img);
    imageReader(img)
      .then((res) => setImage({ id: v4(), src: res }))
      .catch((_) => setImage({ id: v4(), src: "" }));
  };

  const remImage = () => {
    setImage({ id: v4(), src: null });
  };

  return { image, readFile, remImage };
}
