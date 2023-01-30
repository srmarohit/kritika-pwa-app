import React, { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import {
  ref,
  uploadBytes,
  list,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function UploadFiles() {
  const [file, setFile] = useState();
  const [listOfImages, setListOfImages] = useState([]);
  const [link, setLink] = useState(null);

  const imagesRef = ref(storage, `images/`);

  function getRefToStorage(URL) {
    const baseURL =
      "https://firebasestorage.googleapis.com/v0/b/at-pro.appspot.com/o/";
    let imagePath = URL.replace(baseURL, "");
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = imagePath.replace("%2F", "/");
    return imagePath;
  }

  const uploadFile = (e) => {
    e.preventDefault();
    if (!file) return;

    console.log(file);

    const imgRef = ref(storage, "images/" + file.name + new Date().getTime());
    uploadBytes(imgRef, file)
      .then((snapshot) => {
        alert("uploaded successfully");
        getDownloadURL(snapshot.ref).then((url) => {
          setListOfImages((prev) => [...prev, url]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFile = (url) => {
    let file_path = getRefToStorage(url);

    const fileRef = ref(storage, file_path);

    deleteObject(fileRef)
      .then(() => {
        alert("file deleted..");
        let filtImgLinks = listOfImages.filter((imgLink) => imgLink != url);
        setListOfImages(filtImgLinks);
      })
      .catch(() => {
        alert("error occured while deleting file..");
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
          onClick={() => deleteFile(imgLink)}
        />
      ))}
    </div>
  );
}
