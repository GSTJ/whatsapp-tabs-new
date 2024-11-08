import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getRouter = createTRPCRouter({
  messages: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.db.message.findMany();
  }),

  sendMessage: publicProcedure
    .input(
      z.object({
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({ data: input });
    }),
});
