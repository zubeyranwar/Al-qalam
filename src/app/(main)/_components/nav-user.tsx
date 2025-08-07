import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {ChevronsUpDown} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/navigation";

export default function NavUser() {
    const router = useRouter()
    const {session, logout} = useAuth()

    const handleLogout = async () => {
        await logout()
        router.push("/");
    }

    return (
        <div className="hover:bg-secondary py-2 px-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src={session?.user?.image || "/placeholder.png"}
                            alt="profile picture"
                            width={24}
                            height={24}
                            className="rounded-full object-contain"
                        />

                        <h4 className="text-sm font-medium">{session?.user?.name}</h4>
                        <ChevronsUpDown className="size-4"/>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    alignOffset={11}
                    className="w-80"
                    forceMount
                >
                    <DropdownMenuLabel>
                        <h6 className="text-muted-foreground">{session?.user?.email}</h6>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>
                        <div className="flex items-center gap-2">
                            <Image
                                src={session?.user?.image || ""}
                                alt="profile picture"
                                width={30}
                                height={30}
                                className="rounded-full object-contain"
                            />

                            <h4 className="font-normal">{session?.user?.name}</h4>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout} className="text-muted-foreground">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
