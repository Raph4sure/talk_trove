"use client";

import { useFormState } from "react-dom";

import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Input, Textarea } from "@heroui/input";
import * as actions from "@/actions";
import FormButton from "../formButton";

export default function PostCreateForm() {
    const [formState, action] = useFormState(actions.createPost, {
        errors: {},
    });

    return (
        <Popover showArrow={true} placement="left">
            <PopoverTrigger>
                <Button color="primary">Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input
                            name="title"
                            label="Title"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.title}
                            classNames={{
                                errorMessage: "whitespace-pre-line", // ! This targets the error message wrapper
                            }}
                            errorMessage={formState.errors.title?.join(",\n ")}
                        />
                        <Textarea
                            name="content"
                            label="Content"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(
                                ",\n "
                            )}
                        />

                        {formState.errors._form ? (
                            <div className="rounded-xl p-2 bg-red-400 border border-red-700">
                                {formState.errors._form?.join(", ")}
                            </div>
                        ) : null}

                        <FormButton>Create Post</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
