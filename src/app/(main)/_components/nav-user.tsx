import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {ChevronsUpDown, Menu} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";

export default function NavUser() {
    const {session, logout} = useAuth()

    const myLoader = () => {
        return session?.user?.image || "";
    }

    return (
        <div className="hover:bg-secondary py-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            loader={myLoader}
                            src={session?.user?.image || ""}
                            alt="profile picture"
                            width={24}
                            height={24}
                            className="rounded-full object-contain"
                        />

                        <h4 className="text-sm font-medium">{session?.user?.name}</h4>
                        <ChevronsUpDown className="size-4"/>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[280px] space-4">
                    <DropdownMenuLabel>
                        <h6 className="text-muted-foreground">{session?.user?.email}</h6>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>
                        <div className="flex items-center gap-2">
                            <Image
                                loader={myLoader}
                                src={session?.user?.image || ""}
                                alt="profile picture"
                                width={30}
                                height={30}
                                className="rounded-full object-contain"
                            />

                            <h4 className="font-normal">{session?.user?.name} Qelem</h4>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={logout} className="text-muted-foreground">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Menu />
        </div>
    )
}
