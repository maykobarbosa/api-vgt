import { PrismaClient} from "@prisma/client";


import { Faker, de, de_CH } from '@faker-js/faker';

const faker = new Faker({
  locale: [de_CH, de],
});
async function seedDatabase() {
  const prismaClient = new PrismaClient()
  try {
    // Defina o número de registros que você deseja criar
    const numRecords = 3000;

    // Gere e insira os dados aleatórios na tabela
    for (let i = 0; i < numRecords; i++) {
      await prismaClient.people.create({
        data: {
          avatar: faker.internet.avatar(),
          name: faker.internet.userName(),
          contact: faker.internet.email(),
          description: faker.internet.domainName(),
          office: faker.internet.domainWord(),
          email: faker.internet.email(),
        },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}

seedDatabase();
