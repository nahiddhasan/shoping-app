"use client";
import styles from "@/app/style";
import Loader from "@/components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateOrder = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [status, setStatus] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: ["updateOrder"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`).then(
        (res) => res.json()
      ),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ status }) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["updateOrder"] });
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ status });
    toast.success("Update succesfull!");
    router.push(`/dashboard/orders`);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-6 ">
      <h1 className="text-4xl mb-6">Update Order</h1>
      <div className="flex flex-col gap-2">
        <span>OrderID: {data.id}</span>
        <span>Order Date: {data.createdAt.toString().slice(0, 10)}</span>
        <span>Order Value: ${data.price}</span>
        <span>User Email: {data.userEmail}</span>
      </div>
      <div className="my-4 flex flex-col gap-2">
        {data.products.map((product, index) => (
          <div
            key={index}
            className="w-[70%] flex gap- justify-between dark:bg-menu bg-slate-200 pr-2 rounded-lg"
          >
            <div className="flex-1 relative flex items-center justify-center rounded-2xl overflow-hidden">
              <Image src={product.img} fill alt="" className="object-contain" />
            </div>

            <div className="flex-[3] flex flex-col justify-between p-1 ">
              <span>{product.name}</span>
              <span className="text-sm">Color: {product.color}</span>
              <span className="text-sm">Size:{product.size}</span>
            </div>
            <div className="flex-[2] flex items-center justify-between md:gap-4 gap-1">
              <span className="text-sm">{product.quantity}</span>
              <span>${product.price * product.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span>Status: {data.status}</span>
        <div>
          <input
            type="text"
            placeholder="update status"
            className={`${styles.addProductInput} w-max`}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="ml-2 px-3 py-1 text-white bg-green-400 rounded-full cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
