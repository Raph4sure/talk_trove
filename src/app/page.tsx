import TopicCreateForm from "@/components/topics/topicCreateForm";
import TopicList from "@/components/topics/topicList";
import { Divider } from "@heroui/divider";

export default async function Home() {

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">Top Post</h1>
            </div>
            <div className="border-0 shadow-2xl py-3 px-2 flex flex-col">
                <TopicCreateForm />
                <Divider className="my-4" />
                <h3 className="text-center -mt-4 pb-5">Topics</h3>
                <TopicList />
            </div>
        </div>
    );
}
