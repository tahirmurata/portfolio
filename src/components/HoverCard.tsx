import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react";
import {
    HoverCard as BaseHoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import banner from "@/assets/banner.jpg";

interface Props {
    serviceName: string;
    serviceURL: string;
    serviceDate: Date;
}

export function HoverCard({ serviceName, serviceURL, serviceDate }: Props) {
    return (
        <BaseHoverCard>
            <HoverCardTrigger asChild>
                <a href={serviceURL} className="hover:underline">
                    {serviceName}
                </a>
            </HoverCardTrigger>
            <HoverCardContent side="right">
                <div className="flex flex-row items-center gap-x-4">
                    <Avatar>
                        <AvatarImage src={banner.src} />
                        <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between">
                        <a className="font-semibold text-sm hover:underline" href={serviceURL}>
                            @{serviceURL.split("/")[3]}
                        </a>
                        {/* <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p> */}
                        <div className="flex items-center pt-2">
                            <CalendarDays className="opacity-70 mr-2 w-4 h-4" />{" "}
                            <span className="text-muted-foreground text-xs">
                                {/* Joined December 2021 */}
                                Joined {serviceDate.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </BaseHoverCard>
    )
}