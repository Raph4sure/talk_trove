import Link from "next/link";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import HeaderAuth from "./headerAuth";
import SearchInput from "./searchInput";
import { Suspense } from "react";

export default function Header() {
    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    );
}
