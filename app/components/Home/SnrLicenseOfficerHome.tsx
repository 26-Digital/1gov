import { Work } from "../MyWork/work";
import { PageTitle } from "../PageTitle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { regSchema} from "./data/schema";
import { z } from "zod"
import { getAll, getRegApplications } from "@/app/lib/actions";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectTable } from "./components/select-table";

// Simulate a database read for tasks.
async function getTasks() {
    const data = await getAll()  
    return z.array(regSchema).parse(data)
  }

export const SnrLicenseOfficerHome = async () => {
    const tasks = await getRegApplications('Pending-Review','20')
    return(
        <>
        <div className="overflow-auto h-screen rounded-lg">
            <div className="mb-5">
                <PageTitle Title="License Registration"/>
            </div>
            <div className="w-full">
                <div className="rounded-lg">
                    <div className="flex space-x-2">
                        <div className="p-2 space-y-2 w-64 items-center flex-1 justify-center border border-gray-200 rounded bg-gray-50">
                            <Label>My Work</Label>
                            <SelectTable userRole={"snr_license_officer"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}