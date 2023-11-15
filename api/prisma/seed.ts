import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
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
    const hashedPassword = bcrypt.hashSync(password, 8);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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
