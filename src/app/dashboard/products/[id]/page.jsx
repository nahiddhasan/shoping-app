"use client";
import styles from "@/app/style";
import { app } from "@/utils/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";

const storage = getStorage(app);

const UpdateProduct = ({ params }) => {
  const { id } = params;
  const { isLoading, error, data } = useQuery({
    queryKey: ["updateProduct"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`).then(
        (res) => res.json()
      ),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["updateProduct"] });
    },
  });

  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [catSlug, setCatSlug] = useState();
  const [status, setStatus] = useState();
  const [price, setPrice] = useState();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [images, setImages] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [display, setDisplay] = useState("");
  const [hover, setHover] = useState("");

  const [displayUrl, setDisplayUrl] = useState();
  const [hoverUrl, setHoverUrl] = useState();
  const [imgUrl, setImgUrl] = useState([]);

  const [progress, setProgress] = useState(0);

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const clickImages = () => {
    uploadImages(images);
  };

  const addDisplay = () => {
    if (display) {
      handleDisplay(display);
    }
  };

  const addHover = () => {
    if (hover) {
      handleHover(hover);
    }
  };

  // //handle images
  const uploadImages = (files) => {
    const promises = [];
    files.map((file) => {
      const name = new Date().getTime() + file.name;
      const sotrageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(sotrageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {},
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            setImgUrl((prevState) => [...prevState, downloadURLs]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => toast.success("All images uploaded"))
      .then((err) => console.log(err));
  };

  //handle display image
  const handleDisplay = (file) => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDisplayUrl(downloadURL);
        });
      }
    );
  };

  //handle hover img
  const handleHover = (file) => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setHoverUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      desc,
      catSlug,
      status,
      price: parseFloat(price),
      color,
      size,
      isFeatured,
      displayImage: displayUrl,
      hoverImage: hoverUrl,
      images: imgUrl,
    });
    toast.success("Update succesfull!");
  };

  if (isLoading) {
    return "loading...";
  }

  return (
    <div className="p-4 py-8">
      <h1 className="text-3xl font-bold">Update Product</h1>

      <div className={`my-2 h-2 w-[85%] ring-1 ring-neutral-400 rounded-md`}>
        <div
          className={`bg-neutral-400 h-full transition-all duration-200`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center flex-wrap gap-6 py-6 w-full">
        <div className="w-[40%] gap-2 flex items-center">
          <label>Title:</label>
          <input
            type="text"
            placeholder={data.title}
            className={styles.addProductInput}
            onChange={(e) => setTitle(setTitle(e.target.value))}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Desc:</label>
          <input
            type="text"
            placeholder={data.desc}
            className={styles.addProductInput}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Color:</label>
          <input
            type="text"
            placeholder={data.color && data.color.map((i) => i)}
            className={styles.addProductInput}
            onChange={handleColor}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Size:</label>
          <input
            type="text"
            placeholder={data.size && data.size.map((i) => i)}
            className={styles.addProductInput}
            onChange={handleSize}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Price:</label>
          <input
            type="number"
            placeholder={data.price}
            className={styles.addProductInput}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Category:</label>
          <input
            type="text"
            placeholder={data.catSlug}
            className={styles.addProductInput}
            onChange={(e) => setCatSlug(e.target.value)}
          />
        </div>
        <div className="w-[40%] gap-2 flex items-center">
          <label>Status:</label>
          <input
            type="text"
            placeholder={data.status}
            className={styles.addProductInput}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="w-full gap-2 flex items-center">
          <span>Product Images:</span>
          {data.images &&
            data.images.map((img, i) => (
              <div key={i}>
                <Image
                  src={img}
                  height={100}
                  width={100}
                  alt="images"
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          <div className="flex gap-4 items-center">
            <label htmlFor="images">
              <div className="relative rounded-md ring-1 ring-neutral-400">
                {images && (
                  <AiOutlineCloudUpload className="cursor-pointer text-4xl" />
                )}
              </div>
            </label>

            <input
              type="file"
              id="images"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImages([...e.target.files]);
                }
              }}
            />

            <div className="flex gap-4 items-center">
              {images.map((url, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setImages((prev) => prev.filter((item) => item !== url))
                  }
                >
                  <Image
                    src={URL.createObjectURL(url)}
                    height={100}
                    width={100}
                    alt="images"
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
              <span
                className="cursor-pointer bg-green-600 p-1 px-2 rounded-md h-max"
                onClick={clickImages}
              >
                Add
              </span>
            </div>
          </div>
        </div>

        <div className="w-full gap-2 flex items-center">
          <label>Is Featured:</label>
          <div
            className="w-12 h-7 ring-1 ring-neutral-400  rounded-md relative flex items-center  cursor-pointer "
            onClick={() => setIsFeatured(!isFeatured)}
          >
            <div
              className={`transition-all duration-1000 h-[24px] w-[24px] rounded-full dark:bg-white bg-black absolute ${
                isFeatured ? "right-[2px]" : "left-[2px]"
              } `}
            />
          </div>
        </div>

        {isFeatured && (
          <div className="flex gap-6 items-center justify-between w-full">
            <div className="flex-1 gap-2 flex items-center">
              <span>Display Image:</span>
              <label htmlFor="display">
                <div className="ring-1 ring-neutral-400 rounded-md ">
                  <AiOutlineCloudUpload className="cursor-pointer text-4xl " />
                </div>
              </label>
              <div>
                <Image
                  src={data.displayImage}
                  alt=""
                  height={100}
                  width={100}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex items-center gap-4 rounded-md overflow-hidden">
                {display && (
                  <Image
                    src={URL.createObjectURL(display)}
                    alt=""
                    height={100}
                    width={100}
                    className="object-cover rounded-md"
                  />
                )}
                <span
                  className="cursor-pointer bg-green-600 p-1 px-2 rounded-md h-max"
                  onClick={addDisplay}
                >
                  Add
                </span>
              </div>

              <input
                id="display"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setDisplay(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>

            <div className="flex-1 gap-2 flex items-center">
              <span>Hover Image:</span>
              <label htmlFor="hover">
                <div className="ring-1 ring-neutral-400 rounded-md ">
                  <AiOutlineCloudUpload className="cursor-pointer text-4xl " />
                </div>
              </label>
              <div>
                <Image
                  src={data.hoverImage}
                  alt=""
                  height={100}
                  width={100}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex items-center gap-4 overflow-hidden">
                {hover && (
                  <Image
                    src={URL.createObjectURL(hover)}
                    alt=""
                    height={100}
                    width={100}
                    className="object-cover rounded-md"
                  />
                )}

                <span
                  className="cursor-pointer bg-green-600 p-1 px-2 rounded-md h-max"
                  onClick={addHover}
                >
                  Add
                </span>
              </div>

              <input
                id="hover"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setHover(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-green-600 p-2 px-4 rounded-lg"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
