import { getSession } from "@/app/auth/auth";
import { AccessDenied } from "@/app/components/AccessDenied";
import { AdminHome } from "@/app/components/Home/AdminHome";
import { DirectorHome } from "@/app/components/Home/DirectorHome";
import { LicenseManagerHome } from "@/app/components/Home/LicenseManagerHome";
import { LicenseOfficerHome } from "@/app/components/Home/LicenseOfficerHome";
import { ManagerHome } from "@/app/components/Home/ManagerHome";
import { RegistrarHome } from "@/app/components/Home/RegistrarHome";
import { RegistrationOfficerHome } from "@/app/components/Home/RegistrationOfficerHome";
import { SnrLicenseOfficerHome } from "@/app/components/Home/SnrLicenseOfficerHome";
import { SnrRegistrationOfficerHome } from "@/app/components/Home/SnrRegistrationOfficerHome";
import { TeacherHome } from "@/app/components/Home/TeacherHome";
import { redirect } from "next/navigation";


export default async function Home(){
    const session = await getSession();
    const userRole = session?.user?.roles[0]
    if(!session?.user?.access){
        redirect('/welcome')
    }
    if(userRole?.includes('teacher') || userRole?.startsWith('teacher')){
        return <TeacherHome/>
    } else if(userRole === 'registration_officer'){
        return <RegistrationOfficerHome/>
    } else if(userRole === 'snr_registration_officer'){
        return <SnrRegistrationOfficerHome/>
    } else if(userRole === 'manager'){
        return <ManagerHome/>
    } else if(userRole === 'director'){
        return <DirectorHome/>
    } else if(userRole === 'registrar'){
        return <RegistrarHome/>
    }else if(userRole === 'license_officer'){
        return <LicenseOfficerHome/>
    } else if(userRole === 'snr_license_officer'){
        return <SnrLicenseOfficerHome/>
    } else if(userRole === 'license_manager'){
        return <LicenseManagerHome/>
    } else if(userRole === "admin"){
        return <AdminHome/>
    } else {
        return <AccessDenied/>
    }
}