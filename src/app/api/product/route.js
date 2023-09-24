import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";


export const PUT =async(NextRequest)=> {

    try {
        const body = await NextRequest.json();
        const product = await prisma.Product.create({
            data:body,
        })
        return new NextResponse(JSON.stringify(product,{status:201}))
    } catch (error) {
      return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
    }
}

export const GET = async()=> {

    const session = await getAuthSession();
    
    try {

        if(session?.user?.role === "ADMIN"){
            const products = await prisma.Product.findMany();
            
            return new NextResponse(JSON.stringify(products,{status:200}))
        }
            
        const products = await prisma.Product.findMany({
             where:{
                    ...({ isFeatured: true }),
                }
            });
            
            return new NextResponse(JSON.stringify(products,{status:200}))
        
        
       
    } catch (error) {
      return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:501}))
    }
}