import Navbar from '@/components/home/header/Navbar';
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser(); // this is the Clerk user object, it has id, emailAddresses, fullName, etc.
  // console.log("current user  = " , user);

  if (!user) {
    return <div>{children}</div>; // or we can redirect("/sign-in")
  }


  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });
  // console.log("logged in user = " , loggedInUser);

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: user.fullName as string,
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress, 
        imageUrl: user.imageUrl, 
      },
    });
  }

  return(
    <div>
      {/* <Navbar/> */}
      {children}
    </div>
  )
};

export default layout;
