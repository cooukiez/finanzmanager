import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function get() {
    try {
        const users = await prisma.user.findMany()
        return {
            status: 'success',
            data: {users}
        }
    }
    catch (error) {
        return {error}
    }
}

/*main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })*/