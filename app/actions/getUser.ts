import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {   // so that the new users are at the top 
        createdAt: 'desc',
      },
      where: {
        NOT: {   // not including the user email 
          email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;