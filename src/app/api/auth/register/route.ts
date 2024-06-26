import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma.client";
import { formatYupErrors } from "@/utils/formatYupErrors";
import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";
import { sendMail } from "@/utils/sendMail";

const userRegistrationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
});

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Validate input
    await userRegistrationSchema.validate(requestBody, {
      abortEarly: false,
    });

    // Input is valid so, we check if email is registered already
    const { email, password } = requestBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { email: "User already exists with that email." },
        {
          status: 400,
        }
      );
    }

    // Add user to database
    const newUser = await prisma.user.create({
      data: {
        email,
        hashedPassword: await bcryptjs.hash(password, 10),
        active: false,
      },
    });

    if (!newUser) throw new Error("Could not create a user");

    const token = await prisma.verificationToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: newUser.id,
      },
    });

    try {
      await sendMail(newUser, token);
    } catch (e) {
      console.log(e, "sendMail error>>>>>>>>>");
      throw new Error("Error while sending mail");
    }
    // Send mail to user

    return NextResponse.json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(formatYupErrors(error), { status: 400 });
    }
    console.log(error, ">>>");
    return NextResponse.json(error, { status: 500 });
  }
}
