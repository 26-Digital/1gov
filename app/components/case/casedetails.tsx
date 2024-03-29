import { Card } from "@/components/ui/card";
import Image from "next/image";

// interface Props {
//     national_id: string;
//     reg_number: string;
//     registration_type: string;
//     reg_status: string;
//     created_at: string;
//     updated_at: string;
// }
interface teacher_preliminary_infos {
    id: string,
    national_id: string;
    citizen_status: string,
    work_status: string,
    practice_category: string,
    sub_category: string,
    created_at: string,
    updated_at: string
}
  
interface declarations {
    agreement: boolean;
    signature: string;
}

interface offence_convictions {
    id: string,
    student_related_offence: string;
    student_related_offence_details: string;
    drug_related_offence: string;
    drug_related_offence_details: string;
    license_flag: string;
    license_flag_details: string;
    misconduct_flag: string;
    misconduct_flag_details: string;
}

interface edu_pro_qualifications{
    level: string,
    qualification: string,
    institution: string,
    qualification_year: string,
    attachments: string,
    minor_subjects: [],
    major_subjects: [],
}

interface bio_datas {
    surname: string;
    forenames: string;
    id: string;
    dob: string; 
    pob: string;
    gender: string;
    nationality: string;
    postalAddress: string;
    physicalAddress: string;
    email: string;
    mobile: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelation: string;
    nextOfKinContact: string;
    disability: string;
    disability_description: string;
}
interface employment_details {
    experienceYears: number;
    currentInstitution: string;
    institutionType: string;
    region: string;
    district: string;
    cityOrTown: string;
}
interface teacher_registrations {
    national_id: string;
    reg_number: string;
    registration_type: string;
    reg_status: string;
    created_at: string;
    updated_at: string;
}
interface attachments{
    national_id: string,
    national_id_copy: string,
    qualification_copy: string,
    proof_of_payment: string,
    created_at: string,
    updated_at: string
}
interface Props {
    teacher_registrations: teacher_registrations,
    teacher_preliminary_infos: teacher_preliminary_infos,
    edu_pro_qualifications: edu_pro_qualifications[],
    bio_datas: bio_datas,
    declarations: declarations,
    offence_convictions: offence_convictions,
    employment: employment_details,
    attachments: attachments
}

const CaseDetails: React.FC<Props> = (data: Props) => {
  return (       
    <>  
        <div className="items-start bg-gray-50 justify-start h-screen w-1/4">
        <Card className="">
            <div className="max-w-sm p-2 w-full bg-sky-400 border rounded-lg border-gray-200 shadow">
                <div className='flex gap-2 items-center'>
                    <div className='rounded-lg bg-sky-100 m-2 p-2'>
                        {/*<svg className="w-7 h-7 text-white mb-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                        </svg>*/}
                                    <Image
                                        src="/botepco.png"
                                        width={40}
                                        height={40}
                                        alt="Picture of the coat of arms"
                                    />
                    </div>
                    <div className='font-sans text-white text-lg'>
                        <a href="#">
                            <p>{data.teacher_preliminary_infos.national_id}</p>
                            <h5 className="mb-2 tracking-tight">{data.teacher_registrations.registration_type}</h5>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className='flex border-b-2 border-dotted border-gray-500 justify-end w-full px-2 py-2'>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-4 py-1 me-2">
                    Actions
                </button>
            </div>
            <div className='m-3 space-y-5 mb-10'>
                <div>
                    <h1 className='text-sm text-gray-500'>Priority</h1>
                    <h5 className='text-3xl font-semibold tracking-tight'>10</h5>
                </div>
                <div className='flex space-x-11'>
                    <h1 className='text-sm text-gray-500'>Status</h1>
                    <div className='px-1 py-0 bg-blue-300 rounded-lg'>
                        <h1 className='text-blue text-xs text-indigo-900'>{data.teacher_registrations.reg_status}</h1>
                    </div>
                </div>
                <div className='flex space-x-9'>
                    <h1 className='text-sm text-gray-500'>Created</h1>
                    <div className=''>
                        <h1 className='text-sm text-sky-600'>{data.bio_datas.forenames} {data.bio_datas.surname}</h1>
                        <h1 className='text-xs font-thin'>{data.teacher_registrations.created_at}</h1>
                    </div>
                </div>
                <div className='flex space-x-9'>
                    <h1 className='text-sm text-gray-500'>Updated</h1>
                    <div className=''>
                        <h1 className='text-sm text-sky-600'>{data.bio_datas.forenames} {data.bio_datas.surname}</h1>
                        <h1 className='text-xs font-thin'>{data.teacher_registrations.updated_at}</h1>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='border-r-4 border-r-blue-700 border-y-2  h-12 items-center py-3 px-2 cursor-pointer'>
                    <span className='text-thin text-ellipsis font-light'>
                        Details
                    </span>
                </div>
                <div className='border-r-4 h-12 items-center border-y-2  py-3 px-2 cursor-pointer'>
                    <span className='text-thin text-ellipsis font-light'>
                        Comments
                    </span>
                </div>
            </div>
            </Card>
        </div>
    </> 
    );
}
export default CaseDetails;