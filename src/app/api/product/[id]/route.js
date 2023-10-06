import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//get single product
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


//update product
export const PUT = async (nextRequest,{params})=>{
  const session = await getAuthSession();
  const {id } = params;
  const body = await nextRequest.json();
  if(session.user.role === "ADMIN"){
    try {
      await prisma.Product.update({
         where:{
             id:id,
         },
         data: body,
      })
   
      return new NextResponse(
         JSON.stringify({messege:"Product has been updated"},{status:200})
      )
    } catch (error) {
     console.log(error)
     return new NextResponse(
         JSON.stringify({messege:"Something went Wrong"},{status:500})
      )
    }
  }else{
    return new NextResponse(JSON.stringify({"message": "You are not alowed to do that"},{status:500}))
  }
}


