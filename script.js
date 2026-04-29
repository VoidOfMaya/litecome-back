import { prisma } from "./lib/prisma.js";

async function main() {
  // Create a new user with a post
  const channel = await prisma.channel.create({
    data:{
        name: 'Global',
        type: 'GROUP'
    }
  })
  console.log("Created Global channel:", channel);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });