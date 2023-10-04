import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const Featured = async () => {
  const FeaturedProduct = await getData();

  return (
    <div className=" w-full my-6 lg:my-12 flex items-center">
      {/* main container */}
      <div className=" px-4 lg:px-8 w-[1400px] mx-auto flex items-center justify-center  ">
        {/* container */}
        <div className="w-full ">
          {/* top heading container  */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl">Explore Model 000</h1>
            <Link href="/" className="underline text-xl md:text-2xl">
              Shop Now
            </Link>
          </div>
          {/* Products Container  */}
          <div className="my-4 grid w-full gap-x-[5px] gap-y-2 grid-cols-[repeat(2,1fr)] md:gap-x-3 md:gap-y-3.5 md:grid-cols-[repeat(3,1fr)]">
            {FeaturedProduct.map((item) => (
              <Link
                key={item.id}
                className=" h-[180px] md:h-[250px] lg:h-[400px] rounded-2xl relative overflow-hidden group/img cursor-pointer"
                href={`/product/${item.id}`}
              >
                {/* Image container */}
                <div className="relative h-full w-full group-hover/img:hidden">
                  <Image
                    src={item.displayImage}
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>
                <div className="invisible opacity-0 group-hover/img:visible group-hover/img:opacity-100 duration-300 transition-all relative h-full w-full">
                  <Image
                    src={item.hoverImage}
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>
                {/* info container */}
                <div className="h-full w-full absolute flex justify-between flex-col top-0 p-4">
                  {item.status ? (
                    <span className=" p-1 px-3 bg-white rounded-full w-max text-xs md:text-sm">
                      {item.status}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {/* product info */}
                  <div className="flex items-center justify-between group-hover/img:text-white">
                    <span className="text-sm md:text-base">{item.title}</span>
                    <span className="text-gray-600 group-hover/img:text-white">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button className="mt-2 p-3 px-6 bg-yellow-300 hover:bg-yellow-400 transition-all float-right text-xl rounded-full">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
