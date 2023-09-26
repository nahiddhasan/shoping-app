import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    

    authorized({ req, token }) {
      
      const path = req.nextUrl.pathname;

      const isAdmin = token?.role === "ADMIN"

      const isPublicPath = path === "/login";
      const protectedPath = path.startsWith("/dashboard");

      if (isPublicPath) {
        return true;
      }
    
      if (protectedPath && isAdmin) {
       
        return true;
      }
      return false

    },
   
  },
})

export const config = { matcher: ["/dashboard/:path*","/login"] }




