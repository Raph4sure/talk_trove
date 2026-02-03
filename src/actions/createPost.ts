"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@/db/generated/client";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/path";
import { revalidatePath } from "next/cache";

const CreatePostSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must have minimum of (3) characters" })
        .regex(/^[a-z-]+$/, {
            message: "Must be lowercase letters or dashes without spaces",
        }),
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

export async function createPost(formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    
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
        if (!session || !session.user) {
            return {
                errors: {
                    _form: ["You must be signed in to do this."],
                },
            };
        }


    return { errors: {} };

    //TODO: revalidate the topic show page

}
