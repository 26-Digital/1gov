'use client'
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, ClipboardList, Settings, LayoutDashboard, ClipboardSignature } from 'lucide-react';

interface SideBarItem { 
    path: string;
    icon: React.ReactElement;
    title: string;
    roles: string[];
}

interface SidebarProps {
    currentPersona: string;
    activeLinkColor?: string;
    inactiveLinkColor?: string;
}

const sidebarItems: SideBarItem[] = [
    { 
        path: '/development', 
        icon: <Home size={24} color="#FFFFFF" />, 
        title: 'Home', 
        roles: ['*'] 
    },
    { 
        path: '/development/components', 
        icon: <LayoutDashboard size={24} color="#FFFFFF" />, 
        title: 'UI Components', 
        roles: [
            'ADMIN'
        ] 
    },
    { 
        path: '/development/viewers', 
        icon: <LayoutDashboard size={24} color="#FFFFFF" />, 
        title: 'Record Viewer', 
        roles: [
            'ADMIN'
        ] 
    },
    { 
        path: '/development/accesscontrol', 
        icon: <LayoutDashboard size={24} color="#FFFFFF" />, 
        title: 'Settings', 
        roles: [
            'ADMIN'
        ] 
    },
];

const MenuItems: React.FC<SidebarProps> = ({ currentPersona }) => {
    const currentPath = usePathname();

    const hasAccess = (itemRoles: string[]) => {
        return itemRoles.includes('*') || itemRoles.includes(currentPersona.toUpperCase());
    }

    const isActivePath = (path: string) => {
        // Handle exact matches for home
        if (path === '/development') {
            return currentPath === path;
        }
        // For other paths, check if the current path starts with the item path
        return currentPath.startsWith(path);
    }

    return (
        <nav className="h-full">
            <ul className="space-y-2 font-medium">
                {sidebarItems.map((item, index) => (
                    hasAccess(item.roles) && (
                        <li key={index} className="flex space-x-2">
                            {/* <div className={`${
                                isActivePath(item.path) 
                                    ? 'bg-sky-200 w-2 md:h-18 lg:h-12 my-1 rounded-lg'
                                    : ''
                            }`}></div> */}
                            <Link
                                href={item.path}
                                className={`
                                    flex items-start w-full px-2 py-2 rounded-md
                                    justify-start space-x-2 transition-colors 
                                    duration-200 ease-in-out
                                    ${isActivePath(item.path) 
                                        ? 'bg-slate-700 text-white' 
                                        : 'text-slate-200 hover:bg-slate-700/50 hover:text-white'
                                    }
                                `}
                            >
                                {React.cloneElement(item.icon, { 
                                    color: isActivePath(item.path) ? "#ffffff" : "#cbd5e1",
                                    className: "shrink-0"  // Prevent icon from shrinking
                                })}
                                <div className="flex justify-center">
                                    <span className={`
                                        text-xs lg:text-base lg:font-semibold
                                        ${isActivePath(item.path) 
                                            ? 'text-white' 
                                            : 'text-slate-200'
                                        }
                                    `}>
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    )
                ))}
            </ul>      
        </nav>
    );
}

export default MenuItems;