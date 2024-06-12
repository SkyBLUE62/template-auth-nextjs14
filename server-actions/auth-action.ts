"use server";

import { action } from "@/lib/safe-action";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "@/prisma/db/prisma";
import { signInSchema } from "@/lib/zod";

export const registerUser = action(signInSchema, async ({ email, password }) => {
  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!checkUser) {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: await bcryptjs.hash(password, 10),
        },
      });
      if (newUser) {
        return {
          success: true,
          error: null,
          status: 200,
        };
      } else {
        return {
          success: false,
          error: "Something went wrong",
          status: 500,
        };
      }
    } else {
      return {
        success: false,
        error: "User already exists",
        status: 400,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
      status: 500,
    };
  }
});
