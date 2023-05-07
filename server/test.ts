import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// async function main() {
//   const client = await prisma.client.create({
//     data: {
//       name: 'Ngoc Lam',
//       socker_id: '1234',
//       message: 'Hello 2',
//     },
//   })
//   console.log(client)
// }

// async function main() {
//     const users = await prisma.client.findMany()
//     console.log(users)
// }

// async function main() {
//     const client = await prisma.client.delete({
//         where: {
//             id: 2,
//         },
//     })
//     console.log(client);
// }

async function main() {
    
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