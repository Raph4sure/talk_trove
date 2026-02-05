import type { Post } from "../generated/client";
import { db } from "@/db";

// * automatic genearion of types

export type PostWithData = Awaited<
    ReturnType<typeof fetchPostsByTopicSlug>
>[number];

export function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}

// ? manual generation of types

// export type PostWithDataa = Post & {
//     topic: { slug: string };
//     user: { name: string | null };
//     _count: { comments: number };
// };

// export function fetchPostsByTopicSlug(slug: string): Promise<PostWithDataa[]> {
//     return db.post.findMany({
//         where: { topic: { slug } },
//         include: {
//             topic: { select: { slug: true } },
//             user: { select: { name: true } },
//             _count: { select: { comments: true } },
//         },
//     });
// }
