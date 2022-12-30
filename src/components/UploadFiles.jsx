import React, { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import {
  ref,
  uploadBytes,
  list,
  listAll,
  getDownloadURL,
} from "firebase/storage";

export default function UploadFiles() {
  const [file, setFile] = useState();
  const [listOfImages, setListOfImages] = useState([]);
  const [link, setLink] = useState(null);

  const imagesRef = ref(storage, `images/`);

  const uploadFile = (e) => {
    e.preventDefault();
    if (!file) return;

    console.log(file);

    const imgRef = ref(storage, "images/" + file.name + new Date().getTime());
    uploadBytes(imgRef, file)
      .then(() => {
        alert("uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllImagesLink = () => {
    listAll(imagesRef)
      .then((res) => {
        res.items.forEach((item, index) => {
          getDownloadURL(item)
            .then((url) => {
              setListOfImages((prev) => [...prev, url]);
            })
            .catch((err) => console.log("Error in getDownload url ", err));
        });
      })
      .catch((err) => console.log("Error in fetching all images ", err));
  };

  useEffect(() => {
    fetchAllImagesLink();
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <hr />
      {listOfImages.map((imgLink) => (
        <img
          src={imgLink}
          width={200}
          height={150}
          onClick={() => alert(imgLink)}
        />
      ))}
    </div>
  );
}
