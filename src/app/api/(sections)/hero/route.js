import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async()=> {

    try {
        const hero = await prisma.Hero.findMany();
        
        return new NextResponse(JSON.stringify(hero,{status:200}))
    } catch (error) {
      return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:501}))
    }
}


export const PUT =async(NextRequest)=> {
  const session = await getAuthSession()
  
  if(session.user.role ==="ADMIN"){
    try {
      const body = await NextRequest.json();
      
      const hero = await prisma.Hero.update({
          where:{
              id:"clmtdm14i0000rul49p097xxr",
          },
          data:body,
      })
      return new NextResponse(JSON.stringify(hero,{status:201}))
  } catch (error) {
    return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
  }
  }else{
    return new NextResponse(JSON.stringify({"message": "You are not Admin"},{status:500}))

  }
}
