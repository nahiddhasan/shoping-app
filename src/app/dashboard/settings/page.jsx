"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div>
      <h1>Settings</h1>
      <p className="cursor-pointer" onClick={handleSignOut}>
        LogOut
      </p>
    </div>
  );
};

export default Settings;
