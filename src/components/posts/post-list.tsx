import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/path";

interface PostListProps {
    fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
    const posts = await fetchData();
    
    if (posts.length === 0) {
        return (
            <div className="text-center p-10 border rounded bg-gray-50">
                <h2 className="text-xl font-semibold">No topics found</h2>
                <p className="text-gray-500">
                    Try searching for something else!
                </p>
            </div>
        );
    }

    const renderedPosts = posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
            throw new Error("Need a slug to link to a post");
        }

        return (
            <div key={post.id} className="border rounded p-2">
                <Link href={paths.postShow(topicSlug, post.id)}>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <div className="flex flex-row gap-8">
                        <p className="text-xs text-gray-400">
                            By {post.user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>
                </Link>
            </div>
        );
    });

    return <div className="space-y-2">{renderedPosts}</div>;
}
