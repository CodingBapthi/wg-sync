import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

const DateSchema = z.date();
const TitleSchema = z.string().min(1).max(100).describe("Event Title");
const DescriptionSchema = z.string().max(500).describe("Event Description");
const ReminderSchema = z
  .boolean()
  .describe(
    "Boolean Value if this Event is just a Calendar Event or also an reminder",
  );

export const calendarRouter = createTRPCRouter({
  getCalendarEvents: protectedProcedure
    .meta({ description: "Get Calendar Events by flat and date" })
    .input(
      z.object({
        flatId: z.string().cuid().describe("Flat Id"),
        startDate: DateSchema.describe(
          "Start Date from where we are looking for Events",
        ),
        endDate: DateSchema.describe(
          "End Date for the range we are looking for Events",
        ),
      }),
    )
    .query(async ({ input }) => {
      const { flatId, startDate, endDate } = input;

      const calendarEvents = await prisma.calendarEvent.findMany({
        where: {
          flatId,
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
        },
      });

      return calendarEvents;
    }),
  createCalendarEvent: protectedProcedure
    .meta({
      description: "Create Calendar Event",
    })
    .input(
      z.object({
        flatId: z.string().cuid(),
        title: TitleSchema,
        startDate: DateSchema.min(new Date(Date.now()), {
          message: "You can not add Events in the Past",
        }).describe(
          "Start Date from where we are looking for Events. You can not create an Event in the Past.",
        ),
        endDate: DateSchema.describe("Date when the Event Ends"),
        description: DescriptionSchema,
        reminder: ReminderSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.session.user;

      const createdEvent = await prisma.calendarEvent.create({
        data: {
          ...input,
          authorId: userId,
        },
      });

      return createdEvent;
    }),
  deleteCalendarEvent: protectedProcedure
    .meta({ description: "Delete an Event" })
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id: eventId } = input;

      const deletedEvent = await ctx.prisma.calendarEvent.delete({
        where: {
          id: eventId,
        },
      });

      return deletedEvent;
    }),
  updateCalendarEvent: protectedProcedure
    .meta({ description: "Update an Event" })
    .input(
      z.object({
        id: z.string().cuid().describe("Event ID"),
        title: TitleSchema,
        startDate: DateSchema.min(new Date(Date.now()), {
          message: "You can not add Events in the Past",
        }).describe(
          "Start Date from where we are looking for Events. You can not create an Event in the Past.",
        ),
        endDate: DateSchema.describe("Date when the Event Ends"),
        description: DescriptionSchema.optional(),
        reminder: ReminderSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedCalendarEvent = await ctx.prisma.calendarEvent.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return updatedCalendarEvent;
    }),
});
