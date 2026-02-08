"use client";

import { Input } from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        // console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("term", term);
        } else {
            params.delete("term");
        }

        replace(`${pathname}?${params.toString()}`);

        // return <div>{term}</div>;
    }
    return (
        <Input
            placeholder="search topic..."
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("term")?.toString()}
        />
    );
}
