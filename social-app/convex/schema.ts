import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    user_id: v.string(),
    username: v.string(),
    date_of_birth: v.string(),
    phone_number: v.string(),
    description: v.string(),
    file: v.optional(v.string()),
  }),
  chats: defineTable({
    user_1: v.id("user"),
    user_2: v.id("user"),
    last_comment: v.optional(v.string()),
    timestamp: v.number(),
  }),
});
