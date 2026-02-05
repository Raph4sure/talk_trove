"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic, Post } from "@/db/generated/client";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/path";
import { revalidatePath } from "next/cache";

const CreatePostSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must have minimum of (3) characters" }),
    content: z
        .string()
        .min(10, { message: "content must have minimum of (10) characters" }),
});

interface CreatePostFormState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const result = CreatePostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ["You must be signed in to do this."],
            },
        };
    }

    const topic = await db.topic.findFirst({
        where: { slug },
    });

    if (!topic) {
        return {
            errors: {
                _form: ["Cannot find topic"],
            },
        };
    }

    let post: Post;

    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ["Failed to create post"],
                },
            };
        }
    }


    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}
