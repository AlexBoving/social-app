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

// This query return all the users except the current user.
export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const users = await ctx.db
      .query("user")
      .filter((q) => q.neq(q.field("user_id"), tokenIdentifier))
      .collect();

    // if the user has a file, get the URL from the storage.
    return Promise.all(
      users.map(async (user) => {
        if (user.file) {
          const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
          if (url) {
            return { ...user, file: url };
          }
        }
        return user;
      })
    );
  },
});

// This query returns multiple users by their IDs.
export const getUserByIds = query({
  args: { userIds: v.optional(v.array(v.id("user"))) },
  handler: async (ctx, args) => {
    if (args.userIds) {
      return Promise.all(
        args.userIds.map(async (userId) => {
          const user = await ctx.db.get(userId);
          return {
            username: user?.username as string,
            _id: userId,
          };
        })
      );
    } else {
      return [];
    }
  },
});

// This query returns a user by their ID.
export const getUserById = query({
  args: { userId: v.id("user") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (user?.file) {
      const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
      if (url) {
        return { ...user, file: url };
      }
    }
    return user;
  },
});
