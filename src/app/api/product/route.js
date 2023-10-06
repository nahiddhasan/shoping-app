import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";


export const POST =async(NextRequest)=> {
    const session = await getAuthSession();

    if(session.user.role === "ADMIN"){

        try {
            const body = await NextRequest.json();
            const product = await prisma.Product.create({
                data:body,
            })
            return new NextResponse(JSON.stringify(product,{status:201}))
        } catch (error) {
          return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"message": "You are not alowed to do that"},{status:500}))
    }
}

export const GET = async(req)=> {
const session = await getAuthSession()
    
    try {

        if(session.user.role === "ADMIN"){
            const products = await prisma.Product.findMany();
            
            return new NextResponse(JSON.stringify(products,{status:200}))
        }
            
        const products = await prisma.Product.findMany({
            take:6,
            where:{
                    ...({ isFeatured: true }),
                },
            orderBy: {
                    createdAt: 'desc',
                },
            })
            
            return new NextResponse(JSON.stringify(products,{status:200}))
        
        
       
    } catch (error) {
      return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:501}))
    }
}