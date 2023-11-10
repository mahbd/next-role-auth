"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientMember = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin/?callbackUrl=/client-member");
    },
  });
  if (!session) return redirect("/api/auth/signin/?callbackUrl=/client-member");
  // @ts-ignore
  const role = session.user?.role;
  return (
    <div>
      <h1>Member Client Server Session</h1>
      <p>{session.user?.email}</p>
      <p>{role}</p>
    </div>
  );
};

export default ClientMember;
