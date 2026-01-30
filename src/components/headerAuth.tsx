"use client";
import { NavbarItem } from "@heroui/navbar";

import * as actions from "@/actions";
import React from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode;
    if (session.status === "loading") {
        authContent = null
    } else if (session.data?.user) {
        authContent = (
            <Popover placement="left" showArrow={true} backdrop="opaque">
                <PopoverTrigger>
                    <Avatar src={session.data.user.image || ""} />
                </PopoverTrigger>
                <PopoverContent >
                    <form action={actions.signOut}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="bordered"
                        >
                            Sign Out
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="bordered"
                        >
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type="submit" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }

    return authContent;
}
