"use client";
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
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

const storage = getStorage(app);

const Hero = () => {
  const [bg, setBg] = useState();
  const [productImg, setProductImg] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const [uploading, setUploading] = useState();
  const [bgUrl, setBgUrl] = useState();
  const [productUrl, setProductUrl] = useState();
  const [progress, setProgress] = useState();
  const { isLoading, error, data } = useQuery({
    queryKey: ["hero"],
    queryFn: () =>
      fetch("http://localhost:3000/api/hero").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ bgUrl, productUrl, title, desc }) => {
      return fetch(`http://localhost:3000/api/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bg: bgUrl,
          productImage: productUrl,
          title,
          desc,
        }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
    },
  });

  // //handle bg image
  // const handleBg = (file) => {
  //   const name = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, name);

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setProgress(progress);
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {},
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setBgUrl(downloadURL);
  //       });
  //     }
  //   );
  // };

  // //handle product image
  // const handleProductImg = (file) => {
  //   const name = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, name);

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setProgress(progress);
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {},
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setProductUrl(downloadURL);
  //       });
  //     }
  //   );
  // };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (bg) {
      setUploading(true);
      const name = new Date().getTime() + bg.name;
      const storageRef = ref(storage, `/hero/${name}`);

      const uploadTask = uploadBytesResumable(storageRef, bg);

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
            setBgUrl(downloadURL);
            setUploading(false);
          });
        }
      );
    }

    if (productImg) {
      setUploading(true);
      const name = new Date().getTime() + productImg.name;
      const storageRef = ref(storage, `/hero/${name}`);

      const uploadTask = uploadBytesResumable(storageRef, productImg);

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
            setProductUrl(downloadURL);
            setUploading(false);
          });
        }
      );
    }

    mutation.mutate({ bgUrl, productUrl, title, desc });
    toast.success("Update succesfull!");
  };

  if (isLoading) return "Loading...";

  console.log(progress);
  return (
    <div className=" w-full my-4 flex items-center">
      {/* main Container  */}
      <div className="px-4 w-[1400px] mx-auto flex items-center justify-center ">
        <div
          style={
            bg
              ? { backgroundImage: `url(${URL.createObjectURL(bg)})` }
              : { backgroundImage: `url(${data[0].bg})` }
          }
          className={`relative w-full p-10 bg-[#f2f2f2]  bg-center bg-cover bg-no-repeat rounded-2xl flex items-center justify-center `}
        >
          {/* main container */}
          <div className="absolute top-2 right-2 z-10">
            <label
              htmlFor="bg"
              className="text-black  cursor-pointer flex gap-4"
            >
              <FiEdit2 />
            </label>

            <input
              type="file"
              id="bg"
              className="hidden"
              onChange={(e) => setBg(e.target.files[0])}
            />
          </div>
          {bg || productImg || title || desc ? (
            <button
              disabled={uploading}
              className={`p-1 px-2 disabled:cursor-not-allowed disabled:bg-green-300  bg-green-500 text-white rounded-lg absolute bottom-2 right-2 z-10`}
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            ""
          )}
          <div className="flex flex-col items-center justify-center">
            {/* image-container */}
            <div className="relative w-[250px] h-[300px] lg:w-[400px] lg:h-[350px] ">
              <label
                htmlFor="productImg"
                className="text-black absolute top-0 right-0 z-10 cursor-pointer"
              >
                <FiEdit2 />
              </label>
              {productImg ? (
                <Image
                  className="object-contain"
                  src={URL.createObjectURL(productImg)}
                  fill
                  alt="hero_img"
                />
              ) : (
                <Image
                  className="object-contain"
                  src={data[0].productImage}
                  fill
                  alt="hero_img"
                />
              )}

              <input
                type="file"
                id="productImg"
                className="hidden"
                onChange={(e) => setProductImg(e.target.files[0])}
              />
            </div>

            {/* info-contaniner  */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center flex-col leading-snug">
                <span className="text-sm font-bold tracking-widest uppercase text-black">
                  Introducing
                </span>
                <h1 className="text-[32px] md:text-[48px] lg:text-[68px] text-center text-black">
                  {data[0].title}
                </h1>
                <input
                  type="text"
                  className="w-44"
                  placeholder={data[0].title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="text-sm text-black">{data[0].desc}</span>
                <input
                  type="text"
                  className="w-44"
                  placeholder={data[0].desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <button className="w-max px-8 p-4 bg-black text-white rounded-full">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
