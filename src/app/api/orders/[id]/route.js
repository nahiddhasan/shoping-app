import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET =async(nextRequest,{params})=>{

    const {id} = params;
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

//update order
export const PUT = async (nextRequest,{params})=>{
  const session = await getAuthSession();
  const {id } = params;
  const body = await nextRequest.json();
  if(session.user.role === "ADMIN"){
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
}


//remove unpaid order
export const DELETE = async (nextRequest,{params})=>{
  const {id } = params;
  const session = await getAuthSession();
  const unPaidOrder = await prisma.Order.findUnique(
    {
      where:{
        id:id,
        status:"Not paid",
      }
    }
  )

  
  if(session.user.email === unPaidOrder.userEmail){
    try {
      if(unPaidOrder){
        await prisma.Order.delete({
          where: { id: id },
        })
    
        return new NextResponse(
          JSON.stringify({messege:"Order has been deleted"},{status:200})
       )
      }{
        return new NextResponse(
          JSON.stringify({messege:"Only unpaid order can be removed"})
       )
      }
     
     } catch (error) {
      console.log(error)
      return new NextResponse(
          JSON.stringify({messege:"Something went Wrong"},{status:500})
       )
     }
  }else{
    return new NextResponse(
      JSON.stringify({messege:"you can remove only your order"})
   )
  }


}