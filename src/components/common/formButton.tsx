"use client";

import { Button } from "@heroui/button";
import { useFormStatus } from "react-dom";

interface FormButtonType {
    children: React.ReactNode;
    isLoading?: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonType) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={isLoading || pending}>
            {children}
        </Button>
    );
}
