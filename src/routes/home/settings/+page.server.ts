import { checkExistingUsername, checkExistingEmail, prisma, updateUserPassword, updateUserSettings } from "$lib/server/prisma/user";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { Argon2id } from "oslo/password";

import { getUser } from "$lib/server/prisma/user";

export const load: PageServerLoad = async (event) => {
  let userId
  try {
    if (event.locals.user) {
      userId = await getUser(event.locals.user.id);
    }
  }
  catch (err) {
    console.error(err);
    throw fail(500, { message: "Failed fetch user" });
  }

  return {
    userId: userId,
  };
};

export const actions = {
  update_info: async ({ request, locals }) => {
    const user = locals.user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user) {
      return fail(401, { message: "Unauthorized" });
    }

    const {newname, newemail} = Object.fromEntries(
      await request.formData()
    ) as {
      newname: string;
      newemail: string;
    };
    if (!emailRegex.test(newemail)) {
      console.log("invalid email");
      return fail(401, { message: "Invalid email" });
    }

    if (newname != user.name) {
      if (await checkExistingUsername(newname)) {
        console.log("user already exists");
        return fail(400, {
          error:true,
          message: "Username already exists"
        });
      }
    }

    if (newemail != user.email) {
      if (await checkExistingEmail(newemail)) {
        console.log("Email already exists");
        return fail(400, {
          error: true,
          message: "Email already exists"
        });
      }
    }

    try {
      await updateUserSettings(user.id, newname, newemail);
      console.log("updated user", user);
      return { success: true };
    } catch (error) {
      return fail(500, { message: "Failed to update user" });
    }
  },
  update_pass: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) {
      return fail(401, { message: "Unauthorized" });
    }

    const {newpassword, currentpassword} = Object.fromEntries(
      await request.formData()
    ) as {
      newpassword: string;
      currentpassword: string;
    };

    const hashedPassword = await new Argon2id().hash(newpassword);

    const account = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!account) {
      return fail(500, { message: "No user found." });
    }

    const validPassword = await new Argon2id().verify(
      account.password,
      currentpassword,
    );

    if (!validPassword) {
      return fail(400, {
      });
    }
    try {
      await updateUserPassword(user.id, hashedPassword);
      return { success: true, hashedPassword };
    } catch (error) {
      return fail(500, { message: "Failed to update user" });
    }
  },

} satisfies Actions;