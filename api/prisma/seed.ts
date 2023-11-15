import { PrismaClient, Prisma } from "@prisma/client";
import seedData from "./seed-data.json";
enum Role {
  ADMIN = "admin",
  USER = "user",
}
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const { product, productCategory, user } = seedData;

  for (const category of productCategory) {
    const { name, path } = category;
    await prisma.product_Category.create({
      data: {
        name,
        path,
      },
    });
  }

  for (const item of product) {
    const { name, description, price, category_id, image_url } = item;
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        category_id,
        image_url,
      },
    });
  }

  for (const item of user) {
    const { email, password, name } = item;
    await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: Role.ADMIN,
      },
    });
  }
  console.log(`Seeding finished.`);
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
