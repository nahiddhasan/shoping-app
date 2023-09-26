import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async(NextRequest,{params})=> {
const {id} = params;

    try {
        const product = await prisma.Product.findUnique({
            where: {
              id: id,
            },
          });
        
        return new NextResponse(JSON.stringify(product,{status:200}))
    } catch (error) {
      return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:501}))
    }
}


