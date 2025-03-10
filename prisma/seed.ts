import { createUser, prisma } from "../src/lib/server/prisma/user";

// Automatisch, Beispiel und Admin Accounts erstellen(Default users)
async function main() {
  await createUser("Admin", "admin@finanzmanager.de", "admin", "123456");
  await createUser("User", "user@finanzmanager.de", "user", "123456");
  await createUser("Example", "example@finanzmanager.de", "user", "123456");

  console.log("Default users created successfully.");
}

main()
  .catch((e) => {
    console.error("Error in seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
