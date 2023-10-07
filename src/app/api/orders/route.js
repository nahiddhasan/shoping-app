import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";

//Createing new order
export const POST = async (NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await NextRequest.json();
      const order = await prisma.Order.create({
        data: body,
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ messege: "you are not logged in" }),
      { status: 500 }
    );
  }
};

//Fetching Orders
export const GET = async (req) => {
  const session = await getAuthSession();
  if (session) {
    try {
      if (session.user.role === "ADMIN") {
        const orders = await prisma.Order.findMany();

        return new NextResponse(JSON.stringify(orders, { status: 200 }));
      }

      const order = await prisma.Order.findMany({
        where: {
          userEmail: session.user.email,
        },
      });
      return new NextResponse(JSON.stringify(order, { status: 200 }));
    } catch (error) {
      return new NextResponse(
        JSON.stringify(
          { message: `something went wrong in prisma${error}` },
          { status: 501 }
        )
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Please Singin to see orders" })
    );
  }
};
