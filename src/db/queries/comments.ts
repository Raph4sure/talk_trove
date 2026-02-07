import { cache } from "react";
import type { Comment } from "../generated/client";
import { db } from "@/db";

export type commentWithAuthor = Awaited<
    ReturnType<typeof fetchCommentsByPostId>
>[number];

const fetchCommentsByPostId = cache((postId: string) => {
    return db.comment.findMany({
        where: { postId },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });
});

export default fetchCommentsByPostId;
