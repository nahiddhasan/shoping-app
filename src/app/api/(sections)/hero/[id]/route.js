// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";


// export const POST =async(NextRequest, params)=> {
//     const {id} =params;
//     try {
//         const body = await NextRequest.json();
//         const hero = await prisma.Hero.update({
//             where:{
//                 id:id,
//             },
//             data:body
//         })
//         return new NextResponse(JSON.stringify(product,{status:201}))
//     } catch (error) {
//       return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
//     }
// }

