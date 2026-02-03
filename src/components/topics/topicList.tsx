import Link from "next/link";
import { Chip } from "@heroui/chip";
import paths from "@/path";
import { db } from "@/db";
import { Divider } from "@heroui/divider";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedtopics = topics.map((topic) => {
        return (
            <div
                key={topic.id}
                className="flex h-5 items-center space-x-4 text-small"
            >
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning">{topic.slug}</Chip>
                </Link>
                <Divider orientation="vertical" />
            </div>
        );
    });
    return <div className="flex flex-2 flex-wrap gap-2">{renderedtopics}</div>;
}
