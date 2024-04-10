import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new chat.
export const createChat = mutation({
  args: {
    user_1: v.id("user"),
    user_2: v.id("user"),
    last_comment: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chats", args);
  },
});

// This mutation deletes a group by it's object id.
export const deleteChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.chatId);
  },
});

// This query returns chat groups related to your profile.
export const get = query({
  args: { user: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    let chats = await ctx.db
      .query("chats")
      .filter((q) =>
        q.or(
          q.eq(q.field("user_1"), args.user),
          q.eq(q.field("user_2"), args.user)
        )
      )
      .order("desc")
      .collect();

    return chats;
  },
});

// This query returns the chat group by it's object id.
export const getChatById = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});
