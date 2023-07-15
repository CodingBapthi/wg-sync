import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const flatsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .meta({ description: "Gets all Flats where the User is a Member" })
    .query(async ({ ctx }) => {
      const { id: userId } = ctx.session.user;

      const flats = await ctx.prisma.flat.findMany({
        where: {
          OR: [{ ownerId: userId }, { members: { some: { id: userId } } }],
        },
      });

      return flats;
    }),
  getOne: protectedProcedure
    .meta({ description: "Returns a specific Flat" })
    .input(
      z.object({
        flatId: z.string().cuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { flatId } = input;

      const flat = await ctx.prisma.flat.findUnique({
        where: {
          id: flatId,
        },
      });

      return flat;
    }),
  createFlat: protectedProcedure
    .meta({ description: "Creates a Flat" })
    .input(
      z.object({
        flatName: z.string().describe("Name the New Flat will have"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { flatName } = input;
      const { id: userId } = ctx.session.user;

      const createFlat = await ctx.prisma.flat.create({
        data: {
          flatName,
          ownerId: userId,
        },
      });

      return createFlat;
    }),
  updateFlat: protectedProcedure
    .meta({ description: "Updates a Flat" })
    .input(
      z.object({
        id: z.string().cuid(),
        flatName: z.string().optional(),
        ownerId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id: flatId, ...updateData } = input;
      const { id: userId } = ctx.session.user;

      const flat = await prisma.flat.findUnique({
        where: { id: flatId },
        include: { owner: true },
      });

      if (!flat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flat not found",
        });
      }

      if (flat.ownerId !== userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not the Owner",
        });
      }
      const updatedFlat = await ctx.prisma.flat.update({
        where: {
          id: flatId,
        },
        data: updateData,
      });

      if (!updatedFlat) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Flat not found",
        });
      }

      return updatedFlat;
    }),
  addUserToFlat: protectedProcedure
    .meta({ description: "Adds a Flat Member" })
    .input(
      z.object({
        flatId: z.string().cuid(),
        newMemberUserId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { flatId, newMemberUserId } = input;
      const { id: userId } = ctx.session.user;

      const flat = await prisma.flat.findUnique({
        where: { id: flatId },
        include: { owner: true },
      });

      if (!flat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flat not found",
        });
      }

      if (flat.ownerId !== userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not the Owner",
        });
      }

      const newMember = await ctx.prisma.flatMember.create({
        data: {
          flatId,
          memberId: newMemberUserId,
        },
      });

      if (!newMember) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not add User to Flat",
        });
      }

      return newMember;
    }),
  removeUserFromFlat: protectedProcedure
    .meta({ description: "Removes a Flat Member" })
    .input(z.object({ flatId: z.string(), memberId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { flatId, memberId } = input;
      const { id: userId } = ctx.session.user;

      const flat = await prisma.flat.findUnique({
        where: { id: flatId },
        include: { owner: true },
      });

      if (!flat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flat not found",
        });
      }

      if (flat.ownerId !== userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not the Owner",
        });
      }

      const deletedMember = await ctx.prisma.flatMember.delete({
        where: {
          flatId_memberId: {
            flatId,
            memberId,
          },
        },
      });

      if (!deletedMember) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not Remove Flat Member",
        });
      }

      return deletedMember;
    }),
});
