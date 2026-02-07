import type { Comment } from "../generated/client";
import { db } from "@/db";

export type commentWithAuthor = Awaited<
    ReturnType<typeof fetchCommentsByPostId>
>[number];

function fetchCommentsByPostId(postId: string) {
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
}

export default fetchCommentsByPostId;
