"use client";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <Loader />;
  }

  const orders = data;
  return (
    <>
      <div className="p-4">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left ">
              <th className="hidden md:block">Order Id</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden md:block">Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr
                key={order.id}
                className={`text-sm lg:text-base ${
                  order.status === "Not paid"
                    ? "bg-red-100 text-black"
                    : "dark:bg-menu bg-slate-200"
                } `}
              >
                <td className="hidden md:block p-2 ]">{order.id}</td>
                <td className="p-2 ">
                  {order.createdAt.toString().slice(0, 10)}
                </td>
                <td className="p-2">{order.price}</td>
                <td className="hidden md:block p-2">
                  {order.products?.map((product) => (
                    <span key={product.id}>{product.name},</span>
                  ))}
                </td>
                <td className="p-2  ">{order.status}</td>
                <td className="p-2  ">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/orders/${order.id}`}>
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

export default Orders;
