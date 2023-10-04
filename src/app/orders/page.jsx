import { getAuthSession } from "@/utils/auth";
import { headers } from "next/headers";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    method: "GET",
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const OrdersPage = async () => {
  const orders = await getData();
  const session = await getAuthSession();
  if (!session) {
    return (
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">Sign in to see your orders!</p>
      </div>
    );
  }
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
                <td className="hidden md:block py-4 px-2 w-[100px]">
                  {order.id}
                </td>
                <td className="py-4 px-2 ">
                  {order.createdAt.toString().slice(0, 10)}
                </td>
                <td className="py-4 px-2">{order.price}</td>
                <td className="hidden md:block py-4 px-2">
                  {order.products?.map((product) => (
                    <span key={product.id}>{product.name},</span>
                  ))}
                </td>
                <td className="py-4 px-2  ">
                  <div className="flex items-center gap-2">
                    <span>{order.status}</span>
                    {order.status === "Not paid" && (
                      <Link
                        href={`/payment/${order.id}`}
                        className="text-sm text-white bg-green-400 rounded-full px-2 cursor-pointer"
                      >
                        Pay Now
                      </Link>
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
