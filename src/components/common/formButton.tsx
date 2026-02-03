'use client'

import { Button } from "@heroui/button";
import { useFormStatus } from "react-dom";

interface FormButtonType{
    children: React.ReactNode;
}

export default function FormButton({children}: FormButtonType) {
    const { pending } = useFormStatus();
    
  return (
      <Button type="submit" isLoading={pending}>
          {children}
  </Button>
  )
}
