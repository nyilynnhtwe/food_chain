import { PrismaClient } from '@prisma/client'
import data from './seedData/districts.json'
const prisma = new PrismaClient()
async function main() {
    const districts = data.province.districts;;
    for (const district of districts) {
        await prisma.district.create({
            data: {
                name: district.name,
            }
        })
        console.log(`District ${district.name} created`); 
    }
    console.log('Districts created')

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })