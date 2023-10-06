"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const session = useSession();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`).then((res) =>
        res.json()
      ),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  if (isLoading) {
    return "loading...";
  }
  if (session.status === "unauthenticated") {
    return (
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">Sign in to see your orders!</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    mutation.mutate(id);
    toast.success("Order has been deleted succesfully");
  };
  const orders = data;
  return (
    <>
      <div className="p-4 lg:px-20 xl:px40">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left ">
              <th className="hidden md:block">Order Id</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden md:block">Products</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="text-sm lg:text-base bg-red-50 ">
                <td className="hidden md:block p-2]">{order.id}</td>
                <td className="p-2 ">
                  {order.createdAt.toString().slice(0, 10)}
                </td>
                <td className="p-2">{order.price}</td>
                <td className="hidden md:block p-2">
                  {order.products?.map((product) => (
                    <span key={product.id}>{product.name},</span>
                  ))}
                </td>
                <td className="p-2  ">
                  <div className="flex items-center gap-2">
                    <span>{order.status}</span>
                    {order.status === "Not paid" && (
                      <>
                        <Link
                          href={`/payment/${order.id}`}
                          className="text-sm text-white bg-green-400 rounded-full px-2 cursor-pointer"
                        >
                          Pay Now
                        </Link>
                        <MdDelete
                          onClick={() => handleDelete(order.id)}
                          className="text-lg text-rose-500 cursor-pointer"
                        />
                      </>
                    )}
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

export default OrdersPage;
