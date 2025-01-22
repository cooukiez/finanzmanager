import { PrismaClient } from '@prisma/client'
import {createUser} from "$lib/server/prisma";
import {fail, json} from "@sveltejs/kit";
const prisma = new PrismaClient()

interface RouteParams {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

async function main() {
    try {
        await createUser("hallo", "hallo@web.de", "asasfafs","Admin");
        return json({ success: true });
    } catch (err) {
        console.error(err);
        throw fail(500, { message: 'Failed to delete user' });
    }
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