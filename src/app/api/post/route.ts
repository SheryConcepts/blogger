import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma.client";
import { formatYupErrors } from "@/utils/formatYupErrors";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { postSchema } from "@/yupSchemas/blogPostSchema";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You are not logged in." },
        { status: 401 }
      );
    }

    const formBody = await req.json();

    await postSchema.validate(formBody, {
      abortEarly: false,
    });

    const urlTaken = await prisma.post.findMany({
      where: { slug: formBody.slug },
    });

    console.log({ posts: urlTaken, count: urlTaken.length });

    if (urlTaken.length > 0) {
      formBody.slug = `${formBody.slug}-${crypto.randomUUID()}`;
    }

    const blog = await prisma.blog.findFirst({
      where: { userId: session.user.id },
    });

    if (!blog) return;
    const { title, content, status, slug, featured_image } = formBody;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        status,
        slug,
        featured_image,
        blogId: blog?.id,
        blogSlug: blog?.slug,
        userId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json(formatYupErrors(error), { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You are not logged in." },
        { status: 401 }
      );
    }
    const formBody = await req.json();

    await postSchema.validate(formBody, {
      abortEarly: false,
    });

    const { slug, id: postId, ...postData } = formBody;

    const blog = await prisma.blog.findFirst({
      where: { userId: session.user.id },
    });

    if (!blog) throw new Error("You don't have a blog.");

    const urlTaken = await prisma.post.findFirst({
      where: {
        slug: slug,
        blogId: blog.id,
        NOT: {
          id: postId,
        },
      },
    });

    if (urlTaken) {
      return NextResponse.json(
        { error: "Post slug is taken." },
        { status: 400 }
      );
    } else {
      postData.slug = slug;
    }

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    console.log(formBody);
    if (!post) throw new Error("Post does not exist.");

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: postData,
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.log(error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json(formatYupErrors(error), { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You are not logged in." },
        { status: 401 }
      );
    }

    const { id }: { id: string } = await req.json();

    if (!id.trim()) throw Error("Invalid Id.");

    const post = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ error: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
