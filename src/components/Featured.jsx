import Link from "next/link";
import SingleProductItem from "./SingleProductItem";

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
              <SingleProductItem key={item.id} item={item} />
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
