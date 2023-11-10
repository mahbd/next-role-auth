import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin/?callbackUrl=/member");
  }
  // @ts-ignore
  const role = session.user?.role;
  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session.user?.email}</p>
      <p>{role}</p>
    </div>
  );
};

export default Member;
