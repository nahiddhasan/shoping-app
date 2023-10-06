"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Products = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return "loading...";
  }

  const products = data;
  return (
    <>
      <div className="p-4">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left ">
              <th>Product Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Is Featured</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className={`text-sm lg:text-base dark:bg-menu bg-slate-200 `}
              >
                <td className="p-2">{product.id}</td>
                <td className="p-2">
                  <Image
                    src={product.images[0]}
                    width={60}
                    height={35}
                    alt="product"
                  />
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product.status}</td>
                <td className="p-2">{product.isFeatured ? "Yes" : "No"}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <FaEdit className="text-lg text-green-500" />
                    </Link>
                    <Link href={"/"}>
                      <MdDelete className="text-lg text-rose-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
