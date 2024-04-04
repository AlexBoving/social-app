import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation inserts a new user into the database.
export const createUser = mutation({
  args: {
    username: v.string(),
    date_of_birth: v.string(),
    phone_number: v.string(),
    description: v.string(),
    file: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    await ctx.db.insert("user", { ...args, user_id: tokenIdentifier });
  },
});

// This query returns our profile information.
export const getMyUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("user_id"), tokenIdentifier))
      .unique();

    // If the user has a file, we need to get the file from the database.
    if (user?.file) {
      const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
      if (url) {
        return { ...user, file: url };
      }
    }
    return user;
  },
});
