import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // Ensure this is correctly exported
import { redirect } from "next/navigation";
export default async function Home() {

  const session = await getServerSession(authOptions);

  if (session) {

    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      <main>
        <LoginForm />
      </main>
    </>
  );
}
