'use client'
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator";
import { FaExchangeAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logout } from "@/app/auth/auth";

interface SidebarProps {
    //sidebarItems: SideBarItem[];
    //currentPath: string;
    userRole: string;
    activeLinkColor?: string;
    inactiveLinkColor?: string;
}

const NavUtils: React.FC<SidebarProps> = ({ userRole}) =>{
    const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent the default link behavior
    
        try {
          await logout(); // Call the logout function
          // Optionally, you can perform any additional actions after logout
          // such as redirecting to the login page or clearing local state
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle any errors that occurred during logout
        }
      };
    return(
        <>
            {/* <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full bg-none hover:bg-sky-500 px=0">
                <div className="flex lg:justify-start justify-center md:w-full">
                    <div className=""><FaExchangeAlt style={{ fontSize: '1.5rem', color: '#FFFFFF' }}/></div> 
                    <div><span className="flex-1 hidden lg:block ms-3 text-left rtl:text-right lg:text-base text-white font-medium whitespace-nowrap">Switch Portal</span></div>
                </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" side='right' align="start">
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="width">Customer</Label>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="maxWidth" className="col-span-2">Registration Officer</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <div className=""><Label htmlFor="height" className="">Snr. Registration Officer</Label></div>
                            <div className=""><span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span></div>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2">Manager</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2">Director</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2">Register</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2">Admin</Label>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover> */}
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full bg-none hover:bg-sky-500 px=0">
                <div className="flex lg:justify-start justify-center md:w-full items-center">
                    {/*<div className=""><FaRegistered style={{ fontSize: '1.5rem', color: '#FFFFFF' }}/></div>*/}
                <Avatar className="h-6 w-6">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{userRole ? userRole[0] : ''}</AvatarFallback>
                    </Avatar>
                    <div><span className="flex-1 hidden lg:block ms-3 text-left rtl:text-right lg:text-base text-white font-medium whitespace-nowrap">{userRole ? userRole : 'Access Revoked'}</span></div>
                </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" side='right' align="start">
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="maxWidth" className="col-span-2 font-normal">Profile</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center w-full justify-between">
                            <div className=""><Label htmlFor="height" className="font-normal">Preferences</Label></div>
                        </div>
                            <Separator />
                                <div className="flex items-center w-full justify-between">
                                    <Label htmlFor="maxHeight" className="col-span-2 font-normal">Switch Portal</Label>
                                </div>
                            <Separator />
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2 font-normal">About this app</Label>
                        </div>
                        <Separator />
                        <Link
                        href='/'
                        onClick={handleLogout}
                        >
                        <div className="flex items-center w-full justify-between">
                            <Label htmlFor="maxHeight" className="col-span-2 font-normal">Logout</Label>
                        </div>
                        </Link>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </>
    )
}
export default NavUtils;