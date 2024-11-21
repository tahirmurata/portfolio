import {
    Accordion as BaseAccordion,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";
import type { InferEntrySchema, Render } from "astro:content";

type Post = {
    id: string;
    slug: string;
    body: string;
    collection: string;
    data: InferEntrySchema<"blog">;
    render(): Render[".md"];
    selected: boolean;
}

interface Props {
    path: string;
    data: Post[];
}

export function Accordion({ path, data }: Props) {
    return (
        <BaseAccordion className="w-full" type="single"
            {...(data.findIndex(item => item.selected) !== -1 && {
                defaultValue: `item-${data.findIndex(item => item.selected)}`
            })}
        >
            {data.map((item, i) => {
                return (
                    <div
                        className="border-b"
                        ref={item.selected ? (ref) => {
                            if (ref) ref.scrollIntoView({ behavior: 'smooth' });
                        } : undefined}
                        key={`item-${i.toFixed()}`}
                        onClick={(_) => {
                            window.location.href = `/${path}/${item.data.slug.toLowerCase()}/`;
                        }}
                    >
                        <div className="flex">
                            <button
                                className="flex flex-1 items-center sm:px-2 justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 group"
                            >
                                <span className="group-hover:underline">
                                    {item.data.title}
                                </span>
                                {item.data.tags && item.data.tags.length > 0 && (
                                    <div className="flex space-x-2">
                                        {item.data.tags.sort().map((tag, index) => (
                                            <Badge className="hover:no-underline" key={index} variant="outline">{tag}</Badge>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                );
            })}
        </BaseAccordion>
    );
}