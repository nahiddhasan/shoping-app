import Image from "next/image";
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hero`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};
const Hero = async () => {
  const data = await getData();
  return (
    <div className=" w-full my-12 flex items-center">
      {/* main Container  */}
      <div className="px-4 lg:px-8 w-[1400px] mx-auto flex items-center justify-center ">
        <div
          style={{ backgroundImage: `url(${data[0]?.bg})` }}
          className="w-full p-10 bg-[#f2f2f2]  bg-center bg-cover bg-no-repeat rounded-2xl flex items-center justify-center "
        >
          {/* main container */}
          <div className="flex flex-col items-center justify-center">
            {/* image-container */}
            <div className="relative w-[250px] h-[300px] lg:w-[400px] lg:h-[350px]">
              <Image
                className="object-contain"
                src={data[0]?.productImage}
                fill
                alt="hero_img"
              />
            </div>
            {/* info-contaniner  */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center flex-col leading-snug">
                <span className="text-sm font-bold tracking-widest uppercase">
                  Introducing
                </span>
                <h1 className="text-[32px] md:text-[48px] lg:text-[68px] text-center">
                  {data[0].title}
                </h1>
                <span className="text-sm">{data[0]?.desc}</span>
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
