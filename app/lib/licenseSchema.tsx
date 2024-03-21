import {z} from 'zod'

const applicantInfo = z.object({
    forenames: z.string().optional(),
    surname: z.string().optional(),
    registration_no: z.string().optional(),
    status: z.string().optional(),
    practice_category: z.string().optional(),
    sub_category: z.string().optional(),
    // add more fields here...
})

const offenceConvictions = z.object({
    student_related_offence: z.string().optional(),
    drug_related_offence: z.string().optional(),
    // add more fields here...
})

export const formSchema = z.object({
    application_info: applicantInfo,
    offence_convictions: offenceConvictions
})