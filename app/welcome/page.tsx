import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Email } from "./components/email-login";
import { OneGovID } from "./components/one-gov";
import Logo from '@/public/trsl logo.jpg';
import MainIcon from '@/public/main-icon.png';
import { version } from "../lib/store";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { CreateInvestigation } from "../components/MyWork/components/createInvestigation";

export default function Welcome() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-sky-400 to-sky-600">
      <header className="flex md:justify-start justify-center md:py-10 py-5">
        <div className="md:rounded-r-lg rounded-b-lg bg-white p-5 md:w-72 w-48">
          <Image
            src={Logo}
            width={350}
            height={350}
            priority
            alt="Botepco logo"
          />
        </div>
      </header>

      <section className="flex-grow flex flex-col justify-center items-center md:items-start md:ml-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to</h1>
        
        <div className="md:hidden mb-4">
          <Image
            src={MainIcon}
            width={176}
            height={176}
            priority
            alt="Main icon"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <h2 className="text-5xl font-bold text-white">
            <span className="font-light">T</span>RLS
          </h2>
          <h2 className="text-5xl font-bold text-white ml-2">e-Services Portal</h2>
        </div>
      </section>

      <footer className="mt-auto">
        <div className="flex justify-center md:justify-end space-x-4 md:space-x-10 md:pr-10 mb-5">
          <LoginDialog />
          <RegisterDialog />
        </div>

        <div className="flex flex-col items-center mb-4">
          <Button variant="secondary" className="mb-2" asChild>
            <Link href="/development" target="_blank" rel="noopener noreferrer">
              Get In Touch
            </Link>
          </Button>
          <p className="text-sm text-white">©2024 TRLS Portal {version}</p>
        </div>
      </footer>
    </main>
  );
}

function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-10 py-4">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Complete the form below to access your account.
          </DialogDescription>
          <Separator/>
          <Label>
            Choose Login Option
          </Label>
        </DialogHeader>
        <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="email">1GOV ID</TabsTrigger>
                <TabsTrigger value="onegov">Email</TabsTrigger>
            </TabsList>
            <Separator/>
            <TabsContent value="email">
                <Email/>
            </TabsContent>
            <TabsContent value="onegov">
                <OneGovID/>
            </TabsContent>
        </Tabs> 
      </DialogContent>
    </Dialog>
  );
}

function RegisterDialog() {
  return (
    <Button asChild>
      <Link href="https://1gov.gov.bw/welcome" target="_blank" rel="noopener noreferrer">
        Register
      </Link>
    </Button>
  );
}
