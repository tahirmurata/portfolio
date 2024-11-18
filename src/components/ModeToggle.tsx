import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card } from "./ui/card"

export function ModeToggle() {
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark")
        setIsDark(isDarkMode)
    }, [])

    React.useEffect(() => {
        document.documentElement.classList[isDark ? "add" : "remove"]("dark")
    }, [isDark])

    return (
        <Card
            className="md:col-start-2 lg:col-start-3 md:row-start-9 lg:row-start-5"
        >
            <div
                className="flex flex-col justify-center items-center gap-4 p-6 md:p-0 h-full"
            >
                <div className="flex items-center space-x-3">
                    <Sun className="w-6 h-6" />
                    <Switch
                        checked={isDark}
                        onCheckedChange={setIsDark}
                        aria-label="Toggle theme"
                    />
                    <Moon className="w-6 h-6" />
                </div>
            </div>
        </Card>
    )
}
