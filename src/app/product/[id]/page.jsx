"use client";
import Loader from "@/components/Loader";
import MobileSlider from "@/components/MobileSlider";
import ProductFeature from "@/components/ProductFeatures";
import { addProduct } from "@/redux/cartRedux";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SingleProduct = ({ params }) => {
  const id = params.id;
  const { isLoading, error, data } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`).then(
        (res) => res.json()
      ),
  });

  const dispatch = useDispatch();
  const [selectedcolor, setSelectedcolor] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(null);
  const handleClick = () => {
    if (size == null) {
      return toast.error("You must select a size");
    }

    dispatch(
      addProduct({
        id: data.id,
        color: color,
        size: size,
        price: data.price,
        img: data.images[0],
        name: data.title,
        quantity: 1,
      })
    );
    toast.success("Product added to cart successfully");
  };

  const handleColor = (index, color) => {
    setColor(color);
    setSelectedcolor(index);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" w-full my-2 lg:my-12 flex items-center">
      {/* main container */}
      <div className=" px-4 lg:px-8 w-[1400px] mx-auto flex">
        {/* left side for showing item picture */}
        <div className="flex-[2] hidden md:flex gap-4 flex-wrap">
          {data.images.map((image, index) => (
            <div key={index} className=" w-[45%] h-[400px] relative">
              <Image src={image} fill alt="" className="object-cover" />
            </div>
          ))}
        </div>
        {/* Right side for Product information */}
        <div className="flex-1 flex flex-col">
          {/* product info */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl">{data.title}</h2>
              {/* <span className="text-sm text-gray-400">{data.des}</span> */}
            </div>
            <span className="text-xl">${data.price}</span>
          </div>
          {/* stars */}
          <div className="flex gap-2 mt-2">
            <div className="flex gap-1">
              <span>*</span>
              <span>*</span>
              <span>*</span>
              <span>*</span>
              <span>*</span>
            </div>
            <div className="flex gap-1 text-[12px]">
              <span>4.7</span>
              <span>(1250)</span>
            </div>
          </div>
          {/* mobile slider for showing the product images */}
          <div className="md:hidden">
            <MobileSlider images={data.images} />
          </div>
          {/* product details  */}
          <div>
            {/* color */}
            <div className="flex flex-col gap-1">
              <span className="capitalize">
                Color:
                {data.color[selectedcolor]}
              </span>
              <div className="flex gap-4 mb-2">
                {data.color.map((color, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full ring-2 ${
                      selectedcolor === index && " scale-125"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColor(index, color)}
                  />
                ))}
              </div>
            </div>
            {/* size */}
            <div className="flex flex-col gap-2">
              <span>Size</span>
              <select
                className="p-3 rounded-md"
                name="Select Size"
                id=""
                onChange={(e) => setSize(e.target.value)}
              >
                <option className="p-4" value="" selectedColor>
                  Select Size
                </option>
                {data.size.map((size, index) => (
                  <option key={index} className="p-4" value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            {/* add to cart button  */}
            <button
              className="w-full my-6 p-2 bg-black text-white rounded-full"
              onClick={handleClick}
            >
              Add to Cart
            </button>
            {/* product description  */}
            <p>{data.desc}</p>

            {/* features */}
            <div>
              <ProductFeature />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
