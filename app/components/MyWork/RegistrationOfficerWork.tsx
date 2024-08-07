// components/RegistrationOfficerHome.tsx
import { SelectTable } from "../Home/components/select-table";
import { PageTitle } from "../PageTitle";
import { Label } from "@/components/ui/label";

export const RegistrationOfficerWork = () => {
  return (
    <div className="overflow-auto h-screen rounded-lg">
      <div className="mb-5">
        <PageTitle Title="Teacher Registration" />
      </div>
      <div className="w-full">
        <div className="rounded-lg">
          <div className="flex space-x-2">
            <div className="p-2 space-y-2 w-64 items-center flex-1 justify-center border border-gray-200 rounded bg-gray-50">
              <Label>My Work</Label>
              <SelectTable userRole="registration_officer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}