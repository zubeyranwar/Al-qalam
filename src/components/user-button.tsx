import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";

export default function UserButton({
                                       session
                                   }: {
    session: any
}) {
    const router = useRouter()
    const {logout} = useAuth()
    const myLoader = () => {
        return session?.user?.image;
    }
    console.log("user image", session?.user?.image)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <Image
                    loader={myLoader}
                    src={session?.user?.image}
                    alt="profile picture"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/documents")}>
                    Documents
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout}>
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
