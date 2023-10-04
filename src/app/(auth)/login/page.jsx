"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const session = useSession();

  const router = useRouter();
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="h-[300px] w-[500px] ring-1 bg-slate-800 flex items-center justify-center rounded-lg shadow-lg">
        <h1
          className=" p-2 px4 ring-1 text-white ring-orange-400 rounded-md cursor-pointer"
          onClick={() => signIn("google")}
        >
          Login with google
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
