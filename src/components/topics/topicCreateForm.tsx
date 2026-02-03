"use client";

import { useFormState } from "react-dom";

import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import * as actions from "@/actions";
import FormButton from "../common/formButton";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {},
    });

    return (
        <Popover placement="left" showArrow={true} backdrop="opaque">
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input
                            name="name"
                            label="Name"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.name}
                            classNames={{
                                errorMessage: "whitespace-pre-line", // ! This targets the error message wrapper
                            }}
                            errorMessage={formState.errors.name?.join(",\n ")}
                        />
                        <Textarea 
                            name="description"
                            label="Describe your topic"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(
                                ",\n "
                            )}
                        />

                        {formState.errors._form ? (
                            <div className="rounded-xl p-2 bg-red-400 border border-red-700">{formState.errors._form?.join(", ")}</div>
                        ) : null}
                        {/* <Button type="submit">Submit</Button> */}
                        <FormButton>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
