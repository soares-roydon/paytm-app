import { prisma } from "@repo/db/prismaConfig";
export default async function Signin() {

  const users = await prisma.user.findUnique({
    where: {
        email: "walter@gmail.com"
    }
  });

    return <>
        <div>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <div>Sign in</div>
        </div>
        <div className="bg-amber-500">{users?.name}</div>
    </>
}