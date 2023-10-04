import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET =async(nextRequest,{params})=>{

    const {id} = params
    try {
        const order = await prisma.Order.findUnique({
            where:{
                id:id
            }
        })
        return new NextResponse(JSON.stringify(order, { status: 200 }));

    } catch (error) {
      return new NextResponse(JSON.stringify(
        { message: `something went wrong ${error}` },
        { status: 501 }
      
      ));
        
    }
}


export const PUT = async (nextRequest,{params})=>{
  const {id } = params;
  const body = await nextRequest.json();
 try {
   await prisma.Order.update({
      where:{
          id:id,
      },
      data: body,
   })

   return new NextResponse(
      JSON.stringify({messege:"Order has been updated"},{status:200})
   )
 } catch (error) {
  console.log(error)
  return new NextResponse(
      JSON.stringify({messege:"Something went Wrong"},{status:500})
   )
 }
}