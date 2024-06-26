import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "./components/sidebar-nav"

// import { Separator } from "@/registry/new-york/ui/separator"
// import { SidebarNav } from "@/app/(app)/examples/forms/components/sidebar-nav"

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
}

const sidebarNavItems = [
  {
    title: "User management",
    href: "/trls/settings/",
  },
  {
    title: "Organization",
    href: "/trls/settings/account",
  },
  {
    title: "Authentication",
    href: "/trls/settings/appearance",
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
    <ScrollArea className="h-screen">
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-3 p-5 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your users settings and set organization preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
              {children}
          </div>
        </div>
      </div>
      </ScrollArea>
    </>
  )
}
