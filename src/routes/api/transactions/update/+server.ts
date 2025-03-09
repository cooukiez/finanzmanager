// src/routes/api/transactions/update/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { updateTransaction } from "$lib/server/prisma/account";

export const PATCH: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { transactionId, amount, type } = data;

    // Validate the incoming data
    if (!transactionId) {
      return json({ error: "Transaction ID is required" }, { status: 400 });
    }

    if (!amount) {
      return json({ error: "Transaction amount is required" }, { status: 400 });
    }

    if (!type) {
      return json({ error: "Transaction type is required" }, { status: 400 });
    }

    // Update transaction in database
    const updatedTransaction = updateTransaction(transactionId, amount, type);

    // Return the updated transaction
    return json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);

    return json(
      { error: "Failed to update transaction", details: error },
      { status: 500 }
    );
  }
};