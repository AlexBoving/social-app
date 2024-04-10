import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new massage linked to a chat group.
export const sendMessage = mutation({
  args: {
    content: v.string(),
    chat_id: v.id("chats"),
    user: v.string(),
    file: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});

// This query returns all the messages in a chat group.
export const getMessages = query({
  args: { chat_id: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chat_id"), args.chat_id))
      .collect();

    return Promise.all(
      messages.map(async (message) => {
        if (message.file) {
          const url = await ctx.storage.getUrl(message.file as Id<"_storage">);
          if (url) return { ...message, file: url };
        }
        return message;
      })
    );
  },
});
