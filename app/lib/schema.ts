import {z} from 'zod';

const Region = ["gaborone", "francistown", "palapye"] as const;
const District = ["chobe", "ghanzi", "ngamiland", "kgatleng", "kweneng", "south-east"] as const;
const Place = ["gaborone","francistown","maun","palapye","mahalapye","serowe","orapa","gantsi","jwaneng"] as const; 

const disabilities = [
  "Visual Impairment",
  "Hearing Impairment",
  "Mobility Impairment",
  "Cognitive Impairment",
  "Neurodevelopmental Disorders",
  "Chronic Illnesses",
  "Psychiatric Disabilities",
  "Learning Disabilities",
  "Speech Impairment",
  "Intellectual Disability",
  "Deafblindness",
  "Epilepsy",
  "Musculoskeletal Disorders",
  "Multiple Sclerosis",
  "Cerebral Palsy"
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']

export const teacherPreliminaryInfoSchema = z.object({
  /**
   * Preliminary Info schema.*/
  work_status: z.string().optional(),
  practice_category: z.string().optional(),
  sub_cateogry: z.string().optional(),

  //work_status: z.enum(["student/teacher", "unemployed", "serving", "retired", "educational consultant"]).optional(),
  //practice_category: z.enum(["pre-primary", "primary", "junior secondary", "secondary","N/A"]).optional(),
  //sub_category: z.enum(["teacher-aide", "tutor", "special education", "educational support services", "education administrator"]).optional(),
  citizen_status: z.string().optional(),
})

export const studentStudyProgrammes = z.object({
  name: z.string().optional(),
  completion_year: z.string().optional(),
  level: z.string().optional(),
  duration: z.coerce.number().optional(),
  mode_of_study: z.string().optional(),
  specialization: z.string().optional()
}).optional()

export const offenceConvictions = z.object({
  /**
   * Capture offence convictions object
  */
  student_related_offence: z.string().optional(),
  student_related_offence_details: z.string().optional(),
  drug_related_offence: z.string().optional(),
  drug_related_offence_details: z.string().optional(),
  license_flag: z.string().optional(),
  misconduct_flag: z.string().optional(),
  //offence_type: z.string().optional(),
  //conviction_status: z.string().optional(),
  //sentence_outcome: z.string().optional(),
  //date_of_conviction: z.date().optional(),
  //type_of_drug_offence: z.string().optional(),
  //drug_conviction_status: z.string().optional(),
  //substance_involved: z.string().optional(),
  //court_jurisdiction: z.string().optional(),
  //date_of_drug_conviction: z.date().optional(),
  //jurisdiction_drugs: z.string().optional(),
  license_flag_details: typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
  misconduct_flag_details:  typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
})

export const teacherRegistrations = z.object({
  /**
   * Capture teacher registration, it should be a disability object.
  */
  registration_type: z.string().optional(),
  reg_status: z.string().optional(),
  reg_number: z.string().optional(),
})

export const declarations = z.object({
  agreement: z.boolean().optional(),
  signature: z.string().optional(),
})

/**
 * Check doc for Zod enums: https://zod.dev/?id=zod-enums
 * use 'as const' to define your enum values as tuple of strings.
*/

export const employmentDetails = z.object({
    /**
     * Employment Details schema.*/
    experience_years: z.coerce.number().optional(),
    current_institution: z.string().optional(),
    //institution_type: z.enum(["private", "public"]).optional(),
    institution_type: z.string().optional(),
    region: z.string().optional(),
    district: z.string().optional(),
    city_or_town: z.string().optional(),
})

export const attachments = z.object({
  national_id_copy:  typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
  //.refine((files) => files.length === 1, {message: "File is required."})
  //.refine((files) => files[0].size <= MAX_FILE_SIZE, {message: "Max file size is 5MB"})
  //.refine(
    //(files) => ACCEPTED_FILE_TYPES.includes(files[0].type),
    //{ message: ".pdf, .doc, and .docx files are accepted"}
  //),
  qualification_copy: typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
  //.refine((files) => files.length === 1, {message: "File is required."})
  //.refine((files) => files[0].size <= MAX_FILE_SIZE, {message: "Max file size is 5MB"})
  //.refine(
   // (files) => ACCEPTED_FILE_TYPES.includes(files[0].type),
    //{ message: ".pdf, .doc, and .docx files are accepted"}
  //),
  proof_of_payment: typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
  //.refine((files) => files.length === 1, {message: "File is required."})
  //.refine((files) => files[0].size <= MAX_FILE_SIZE, {message: "Max file size is 5MB"})
  //.refine(
    //(files) => ACCEPTED_FILE_TYPES.includes(files[0].type),
    //{ message: ".pdf, .doc, and .docx files are accepted"}
  //),
})

export const studentPreliminaryInfos = z.object( {

  institution_name: z.string().optional(),
  institution_type: z.string().optional(),
  citizenry: z.string().optional(),
  study_area: z.string().optional(),
})

export const institutionRecommendations = z.object({
  recommended: z.string().optional(),
  attachment: typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
})

enum SubjectType {
  MATHS = "mathematics",
  PHYSICS = "physics",
  CHEMISTRY = "chemistry",
  SETSWANA = "setswana",
  BIOLOGY = "biology",
  SOCIAL_STUDIES = "social studies",
  PHYSICAL_EDUCATION = "physical education",
  // ... Add more subjects here
}

export const qualificationSchema = z.object({
  level: z.string().optional().default(""),
  qualification: z.string().optional().default(""),
  institution: z.string().optional().default(""),
  qualification_year: z.string().optional().default(""),
  teaching_subjects: z.string().optional().default(""),
  attachments:  typeof window === "undefined" ? z.any():
  z
  .any()
  .optional(),
  minor_subjects: z.array(z.string().default('')).optional(),
  major_subjects: z.array(z.string().default('')).optional(),
  //minor_subjects: z.array(z.enum(Object.values(SubjectType) as SubjectType[])).optional(),  
  //major_subjects: z.array(z.enum(Object.values(SubjectType) as SubjectType[])).optional(), 
})

const bioDatasSchema = z.object({
  national_id: z.string(),
  surname: z.string(),
  forenames: z.string(),
  dob: z.string(), // Assuming date format is string
  pob: z.string(),
  gender: z.string(),
  nationality: z.string(),
  postal_address: z.string(),
  physical_address: z.string(),
  email: z.string().email(), // Ensure email format is valid
  mobile: z.string(), // Assuming mobile number is string
  marital_status: z.string(),
  next_of_kin_name: z.string(),
  next_of_kin_relation: z.string(),
  next_of_kin_contact: z.string(),
  //disability: z.enum(["yes","no"]).optional(),
  disability: z.string().optional(),
  disability_description: z.string().optional(),
});

export const formSchema = z.object({
    /**
     * Application for teacher/stundent registration schema.
     * Desc: Nested objects, meets backend specification
     * */
    teacher_preliminary_infos: teacherPreliminaryInfoSchema,
    employment_details: employmentDetails,
    teacher_registrations: teacherRegistrations,
    offence_convictions: offenceConvictions,
    attachments: attachments,
    bio_datas: bioDatasSchema,
    student_study_programmes: studentStudyProgrammes,
    student_preliminary_infos: studentPreliminaryInfos,
    institution_recommendations: institutionRecommendations,
    declarations: declarations, // Culprit, fix and document
    edu_pro_qualifications: z.array(qualificationSchema).optional(),
})

export const FormDataSchema = z.object({

  // teacher registration
  registration_type: z.string().min(1,'Registration type is required').optional(),
  disability: z.string().min(0,'Disability check is required').optional(),
  disability_description: z.string().min(0,'Field is required').optional(),

  // bio datas

  // declarations
  agreement: z.string().min(0, 'Agreement is required').optional(),
  signature: z.string().min(0,'Signature is required').optional(),

  // attachments

  // Qualifications
  level: z.string().min(0,'Field is required').optional(),
  qualification: z.string().min(0,'Field is required').optional(),
  institution: z.string().min(0, 'Institution name is required').optional(),
  qualification_year: z.string().min(0,'Field is required').optional(),
  teaching_subjects: z.string().min(0,'Field is required').optional(),

  // Employment details
  experience_years: z.string().min(0,'Employment status is required').optional(),
  current_institution: z.string().min(1,'Institution is required').optional(),
  institution_type: z.string().min(1,'Field is required').optional(),
  region: z.string().min(1,'Field is required').optional(),
  district: z.string().min(1,'Field is required').optional(),
  city_or_town: z.string().min(1,'Field is required').optional(),

  // Institution recommendation
  recommended:z.string().min(0,'Field is required').optional(),
  comment: z.string().min(0,'Field is required').optional(),
  name:z.string().min(1,'Field is required').optional(),

  // Offence convictions
  student_related_offence: z.string().min(1,'Field is required').optional(),
  student_related_offence_details: z.string().min(0,'Field is required').optional(),
  drug_related_offence: z.string().min(1,'Field is required').optional(),
  drug_related_offence_details: z.string().min(0,'Field is required').optional(),
  license_flag: z.string().min(1,'Field is required').optional(),
  license_flag_details: z.string().min(0,'Field is required').optional(),
  misconduct_flag: z.string().min(1,'Field is required'),
  misconduct_flag_details:z.string().min(0,'Field is required').optional(),

  // Student Preliminary Infos
  institution_name:z.string().min(1,'Field is required').optional(),
  citizenry: z.string().min(1,'Citizenship is required').optional(),
  study_area: z.string().min(1,'Field is required').optional(),

  
  disability_check: z.string().min(1,'Field is required').optional(),
  minor_conviction: z.string().min(0,'Field is required').optional(),
  drugs_conviction: z.string().min(0,'Field is required').optional(),
  area_of_practice: z.string().min(0,'Field is required').optional(),
  registration_category: z.string().min(1,'Field is required').optional(),
  
  // Student Study Programmes
  completion_year: z.string().min(0,'Field is required').optional(),
  duration: z.string().min(0,'Field is required').optional(),
  mode_of_study: z.string().min(0,'Field is required').optional(),
  specialization: z.string().min(0,'Field is required').optional(),
  
  status: z.string().min(1,'Status is required').optional(),

  // Teacher preliminary info
  citizen_status:z.string().min(0,'Citizenship is required').optional(),
  work_status: z.string().min(1,'Work Status is required').optional(),
  practice_category:z.string().min(1,'Practice category is required').optional(),
  sub_cateogry:z.string().min(1,'Sub-category is required').optional(),
})

export const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "UTC"
};