import {
    Accordion as BaseAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"

interface Props {
    path: string;
    data: {
        title: string;
        description: string;
        selected?: boolean;
        links?: { name: string, url: string }[];
    }[];
}

export function Accordion({ path, data }: Props) {
    return (
        <BaseAccordion className="w-full" type="single"
            defaultValue={data.findIndex(item => item.selected) !== -1 ? `item-${data.findIndex(item => item.selected)}` : undefined}
            collapsible
        >
            {data.map((item, i) => {
                return (
                    <AccordionItem
                        ref={item.selected ? (ref) => {
                            if (ref) ref.scrollIntoView({ behavior: 'smooth' });
                        } : undefined}
                        key={`item-${i.toFixed()}`}
                        value={`item-${i.toFixed()}`}
                        onClick={(_) => {
                            const currentPath = window.location.pathname.toLowerCase();
                            const itemPath = `/${path}/${item.title.toLowerCase()}`;
                            if (currentPath === itemPath) {
                                window.history.replaceState("", "", `/${path}`);
                            } else {
                                window.history.replaceState("", "", itemPath);
                            }
                        }}
                    >
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <p className="text-muted-foreground text-pretty">
                                {item.description}
                            </p>
                            <div className="ml-auto max-w-fit">
                                {item.links && item.links.map((link, i) => (
                                    <Button key={i} variant="link" onClick={(e) => {
                                        e.preventDefault();
                                        window.open(link.url);
                                    }}>{link.name}</Button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </BaseAccordion>
    );
}