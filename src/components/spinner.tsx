import {cva, VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"
import {Loader} from "lucide-react";

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "w-4 h-4",
                sm: "w-2 h-2",
                lg: "w-6 h-6",
            },
        },
        defaultVariants: {
            size: "default"
        }
    },
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
}

export default function Spinner({
                                    size
                                }: SpinnerProps) {
    return <Loader className={cn(spinnerVariants({size}))}/>
}
