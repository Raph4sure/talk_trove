import type { Post } from "../generated/client";
import { db } from "@/db";

// * automatic genearion of types

export type PostWithData = Awaited<
    ReturnType<typeof fetchPostsByTopicSlug>
>[number];

export function fetchPostBySearchTerm(term: string): Promise<PostWithData[]> {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } },
        },
        where: {
            OR: term ? [
                { title: { contains: term } },
                { content: { contains: term } },
            ]: undefined
        },
    });
}

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

export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc",
                },
            },
        ],
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } },
        },
        take: 5,
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
