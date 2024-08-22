"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileIcon() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after the component mounts
    setIsClient(true);
  }, []);

  // Prevent rendering until the component is mounted
  if (!isClient) {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex gap-5">
        <Image
          alt="User image"
          src={session.user.image}
          width={40}
          height={40}
          className="rounded-full"
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn("github")}>Sign In</button>;
}
