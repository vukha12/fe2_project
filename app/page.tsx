import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  console.log(session);

  return (
    <div className="flex items-center justify-center h-screen ">
      {session ? <h1 className="text-6xl">{session.user.name}</h1> : null}
    </div>
  );
}
