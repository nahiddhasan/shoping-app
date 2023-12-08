import Image from "next/image";
import Link from "next/link";

const SingleProductItem = ({ item }) => {
  return (
    <Link
      className="rounded-2xl relative overflow-hidden group/img cursor-pointer"
      href={`/product/${item.id}`}
    >
      {/* Image container */}
      <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden  cursor-pointer">
        <div className="h-full w-full relative aspect-square overflow-hidden rounded-2xl group-hover/img:hidden group-hover/img:opacity-0 transition duration-200">
          <Image src={item.displayImage} fill alt="" className="object-cover" />
        </div>
        <div className="h-full w-full relative aspect-square overflow-hidden rounded-2xl hidden opacity-0 group-hover/img:block group-hover/img:opacity-100 transition duration-1000">
          <Image src={item.hoverImage} fill alt="" className="object-cover" />
        </div>
        {/* product info */}
        <div className="h-full w-full absolute flex justify-between flex-col top-0 left-0 p-4">
          {item.status ? (
            <span className=" p-1 px-3 bg-white rounded-full w-max text-xs md:text-sm">
              {item.status}
            </span>
          ) : (
            <span></span>
          )}

          <div className="flex items-center justify-between group-hover/img:text-white">
            <span className="text-sm md:text-base">{item.title}</span>
            <span className="text-gray-600 group-hover/img:text-white">
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProductItem;
