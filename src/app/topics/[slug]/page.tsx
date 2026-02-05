import PostCreateForm from "@/components/common/posts/postCreateForm";

interface TopicShowProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TopicShow({ params }: TopicShowProps) {
  const { slug } = await params;
  
  // console.log(slug);

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">{slug}</h1>
            </div>
            <div>
                <PostCreateForm slug={slug} />
            </div>
        </div>
    );
}
 