import { InvestigationStatuses } from "./types";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://10.0.25.164:8080/trls-80';
export const invUrl = process.env.NEXT_PUBLIC_INV_URL ?? 'http://10.0.25.164:8084/trls-84';
export const cpdUrl = 'http://10.0.25.164:8086/trls-86';
export const appealUrl = 'http://10.0.25.164:8087/trls-87';
export const licUrl = process.env.NEXT_PUBLIC_LIC_URL ?? 'http://66.179.253.57:8081/api';
export const authUrl = process.env.NEXT_PUBLIC_AUTH_URL ?? 'https://gateway-cus-acc.gov.bw/auth/login/sms';
export const emailauthUrl = process.env.NEXT_PUBLIC_EMAIL_AUTH_URL ?? 'https://gateway-cus-acc.gov.bw/auth/login';
export const iamURL = process.env.NEXT_PUBLIC_IAM_URL ?? 'https://gateway-cus-acc.gov.bw';
export const otpUrl = process.env.NEXT_PUBLIC_OTP_URL ?? 'https://dev-gateway.example.com/auth/login/sms';
export const DeTokenizeUrl = process.env.NEXT_PUBLIC_DETOKENIZE_URL ?? 'https://gateway-cus-acc.gov.bw/auth/validate-token?token=';
export const validateUrl = process.env.NEXT_PUBLIC_VALIDATE_URL ?? 'https://gateway-cus-acc.gov.bw/auth/validate/otp';
export const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://reg-ui-acc.gov.bw:8080/download/MESD_006_08_001/';
export const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY ?? 'dev_secret';
export const version = process.env.NEXT_PUBLIC_VERSION ?? 'v2.20.99';

export interface StatusTransition {
    [key: string]: {
        prev_status: string | null;
        inv_status: string | null;
        bar_status: string | null;
        recommend: string | null,
        endorse: string | null,
        rej_status: string | null;
        next_status: string | null;
        reject_label: string | null;
        approve_label: string | null;
        recommend_label: string | null;
        endorse_label: string | null;
        allocate?: boolean | false,
        submit?: boolean | false,
    };
}

export interface CaseLifeCycleStatus {
    [key: string]: {
        next_statuses: InvestigationStatuses[],
        persona: string[],
        isLast: boolean,
        status_label?:string,
    }
}

export const investigationStatuses: InvestigationStatuses[] = [
    {label: 'Submit for Review', value: 'Under-Review', access:["investigations_officer"]},
    {label: 'Incoming', value: 'Incoming', access:[]},
    {label: 'Registered', value: 'Registered', access:[]},
    {label: 'Submit for Assessment', value: 'Assessment', access:["senior_investigations_officer"]},
    {label: 'External Investigation', value: 'Recommend-for-External-Investigation', access:["investigations_manager"]},
    {label: 'Internal Investigation', value: 'Ongoing-Investigation', access:["investigations_manager"]},
    {label: 'Complete Investigation', value: 'Complete-Investigation', access:["investigations_manager","senior_investigations_officer",'investigations_officer']},
    {label: 'Recommend for closure', value: 'Recommend-for-Closure', access:["investigations_manager"]}
]

export const ComplaintStatus: CaseLifeCycleStatus = {
    'default': {
        next_statuses: [],
        persona: [],
        isLast: false
    },
    'incoming': {
        next_statuses: [{label: 'Submit for Review', value: 'Under-Review', access:["investigations_officer"]}],
        persona: ['investigations_officer'],
        isLast: false,
        status_label: 'Submit for review'
    },
    'under-review': {
        next_statuses: [{label: 'Submit for Assessment', value: 'Assessment', access:["senior_investigations_officer"]}],
        persona: ['senior_investigations_officer'],
        isLast: false,
        status_label: 'Submit for assessment'
    },
    'assessment': {
        next_statuses: [{label: 'External Investigation', value: 'Recommend-for-External-Investigation', access:["investigations_manager"]},{label: 'Internal Investigation', value: 'Ongoing-Investigation', access:["investigations_manager"]},{label: 'Recommend for closure', value: 'Recommend-for-Closure', access:["investigations_manager"]}],
        persona: ['investigations_manager'],
        isLast: false,
        status_label: 'Allocate to'
    },
    'ongoing-investigation': {
        next_statuses: [{label:'Complete investigation', value: 'Complete-Investigation',access:['investigations_manager','senior_investigations_officer','investigations_officer']}],
        persona: ['investigations_manager','senior_investigations_officer','investigations_officer'],
        isLast: false
    },
    'recommend-for-closure': {
        next_statuses: [],
        persona: [],
        isLast: true
    },
    'recommend-for-external-investigation': {
        next_statuses: [],
        persona: [],
        isLast: true
    }
}

interface StatusConfig {
    requiredPermission: Permission;
    nextStatus?: string[];
    status_label: string;
    message?: string;
    allowedRoles: Role[];
}

interface FlowAction {
    requiredPermission: Permission;
    nextStatus?: string[];
    status_label: string;
    message?: string;
    allowedRoles: Role[];
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
    'incoming': {
        requiredPermission: 'update:complaints-incoming',
        nextStatus: ['UNDER-REVIEW'],
        status_label: 'Submit for Review',
        allowedRoles: ['investigations_officer']
    },
    'under-review': {
        requiredPermission: 'update:complaints-review',
        nextStatus: ['ASSESSMENT'],
        status_label: 'Submit for Assessment',
        allowedRoles: ['senior_investigations_officer']
    },
    'assessment': {
        requiredPermission: 'allocate:complaints-assessment',
        nextStatus: ['ONGOING-INVESTIGATION','RECOMMEND-FOR-CLOSURE','RECOMMEND-FOR-EXTERNAL-INVESTIGATION'],
        status_label: 'Allocate',
        allowedRoles: ['investigations_manager']
    },
    'ongoing-investigation': {
        requiredPermission: 'update:complaints-ongoing-investigation',
        nextStatus: ['INVESTIGATION-COMPLETE'],
        status_label: 'Complete Investigation',
        allowedRoles: ['investigations_manager','senior_investigations_officer','investigations_officer']
    },
    'investigation-complete': {
        requiredPermission: 'update:complaints-investigation-complete',
        nextStatus: ['RECOMMEND-FOR-DISCIPLINARY','RECOMMEND-FOR-INVESTIGATION','RECOMMEND-FOR-CLOSURE'],
        status_label: 'Recommend',
        allowedRoles: ['investigations_manager']
    },
    'ongoing-disciplinary': {
        requiredPermission: 'update:complaints-ongoing-disciplinary',
        nextStatus: ['CASE-CLOSED'],
        status_label: 'Complete Disciplinary',
        allowedRoles: ['disciplinary_committee']
    },
    'recommend-for-closure': {
        requiredPermission: 'update:complaints-ongoing-disciplinary',
        nextStatus: ['CASE-CLOSED'],
        status_label: 'Close Case',
        allowedRoles: ['investigations_director']
    },
    'recommend-for-external-investigation': {
        requiredPermission: 'update:complaints-ongoing-disciplinary',
        nextStatus: ['EXTERNAL-INVESTIGATION'],
        status_label: 'Submit for External Investigation',
        allowedRoles: ['investigations_director']
    },
    'recommend-for-investigation': {
        requiredPermission: 'update:complaints-ongoing-disciplinary',
        nextStatus: ['ONGOING-INVESTIGATION'],
        status_label: 'Submit for RE-Investigation',
        allowedRoles: ['investigations_director']
    },
} as const;

const CPD_FLOW: Record<string, FlowAction> = {
    'incoming': {
        requiredPermission: 'update:cpd-incoming',
        nextStatus: ['PENDING-SCREENING'],
        message: 'This action will...',
        status_label: 'Submit for Screening',
        allowedRoles: ['teacher_development_officer']
    },
    'pending-screening': {
        requiredPermission: 'update:cpd-pending-screening',
        nextStatus: ['PENDING-VERIFICATION'],
        status_label: 'Submit for Verification',
        allowedRoles: ['senior_development_officer']
    },
    'pending-verification': {
        requiredPermission: 'update:cpd-pending-verification',
        nextStatus: ['RECOMMEND-FOR-APPROVAL'],
        status_label: 'Submit for Approval',
        allowedRoles: ['senior_development_officer']
    },
    'recommend-for-approval': {
        requiredPermission: 'update:cpd-recommed-for-approval',
        nextStatus: ['APPROVAL'],
        status_label: 'Approve',
        allowedRoles: ['teacher_development_manager']
    }
} as const;

const APPEAL_FLOW: Record<string, FlowAction> = {
    'incoming-appeal': {
        requiredPermission: 'update:appeal-incoming',
        nextStatus: ['PENDING-SCREENING'],
        message: 'This action will...',
        status_label: 'Submit for Screening',
        allowedRoles: ['appeals_officer']
    },
    'pending-screening': {
        requiredPermission: 'update:appeal-pending-screening',
        nextStatus: ['PENDING-ASSESSMENT'],
        status_label: 'Submit for Verification',
        allowedRoles: ['appeals_officer']
    },
    'pending-assessment': {
        requiredPermission: 'update:appeal-pending-assessment',
        nextStatus: ['PENDING-APPROVAL'],
        status_label: 'Submit for Approval',
        allowedRoles: ['senior_appeals_officer']
    },
    'pending-approval': {
        requiredPermission: 'update:appeal-pending-approval',
        nextStatus: ['RECOMMEND-FOR-APPROVAL','RECOMMEND-FOR-REJECTION','RECOMMEND-FOR-INVESTIGATION'],
        status_label: 'Recommend',
        allowedRoles: ['appeals_director']
    },
    'recommend-for-approval': {
        requiredPermission: 'update:appeal-recommed-for-approval',
        nextStatus: ['APPROVAL'],
        status_label: 'Approve',
        allowedRoles: ['appeals_director']
    },
    'recommend-for-rejection': {
        requiredPermission: 'update:appeal-recommed-for-rejection',
        nextStatus: ['REJECTION'],
        status_label: 'Rejection',
        allowedRoles: ['appeals_director']
    },
    'recommend-for-investigation': {
        requiredPermission: 'update:appeal-recommed-for-investigation',
        nextStatus: ['INVESTIGATION'],
        status_label: 'Investigation',
        allowedRoles: ['appeals_director']
    }
} as const;

export function getStatusConfig(status: string): StatusConfig | undefined {
    return STATUS_CONFIG[status];
}

export function getCPDFlowAction(status: string): FlowAction | undefined {
    return CPD_FLOW[status];
} 

export function getApealFlowAction(status: string): FlowAction | undefined {
    return APPEAL_FLOW[status];
} 

export function canUserAccessStatusFull(user: Role, status: string) {
    const config = getStatusConfig(status.toLowerCase());
    if (!config) return false;
    return {
        hasPermission: hasPermission(user, config.requiredPermission),
        nextStatus: config.nextStatus,
        status_label: config.status_label,
        isAllowedRole: config.allowedRoles.includes(user)
    };
}

export function getFlowActionUserDetails(user: Role, status: string, flow: string) {
    let flowaction;
    if(flow==='investigation'){
        flowaction = getStatusConfig(status.toLowerCase());
    }else if(flow==='cpd'){
        flowaction = getCPDFlowAction(status.toLowerCase());
    }else if(flow==='registration'){

    }else if(flow==='appeals'){
        flowaction = getApealFlowAction(status.toLowerCase());
    }else if(flow==='license'){

    }
    
    if (!flowaction) return false;
    return {
        hasPermission: hasPermission(user, flowaction.requiredPermission),
        nextStatus: flowaction.nextStatus,
        message: flowaction.message,
        status_label: flowaction.status_label,
        isAllowedRole: flowaction.allowedRoles.includes(user)
    };
}

export type Role = keyof typeof ROLES
type Permission = (typeof ROLES)[Role][number]
const ROLES = {
    default:[
        "create:complaints",
        "create:tipoffs",

        "view:tipoffs",

        "view:complaints-ongoing-investigation",
        "view:complaints-incoming",
        "view:complaints-review",
        "view:complaints-assessment",
        'view:complaints-recommend-for-closure',
        'view:complaints-closed',
        "view:complaints-ongoing-investigation",
        'view:complaints-recommend-for-investigation',
        "view:complaints-investigation-complete",
        'view:complaints-recommend-for-disciplinary',
        "view:complaints-ongoing-disciplinary",
        'view:complaints-recommend-for-external-investigation',
        'view:complaints-external-investigation',
        "view:cpd-pending-screening",
        "view:cpd-incoming",
        "view:cpd-pending-verification",
        "view:recommed-for-approval",
        "view:search-registration",

        "allocate:complaints-assessment",

        "update:complaints-ongoing-investigation",
        "update:complaints-incoming",
        "update:complaints-review",
        "update:complaints-assessment",
        'update:complaints-recommend-for-closure',
        'update:complaints-closed',
        "update:complaints-ongoing-investigation",
        'update:complaints-recommend-for-investigation',
        "update:complaints-investigation-complete",
        'update:complaints-recommend-for-disciplinary',
        "update:complaints-ongoing-disciplinary",
        'update:complaints-recommend-for-external-investigation',
        'update:complaints-external-investigation',
        "update:cpd-pending-screening",
        "update:cpd-incoming",
        "update:cpd-pending-verification",
        "update:recommed-for-approval",

        // Appeals view permissions
        "view:appeal-incoming",
        "view:appeal-pending-screening",
        "view:appeal-pending-assessment",
        "view:appeal-pending-approval",
        "view:appeal-recommed-for-approval",
        "view:appeal-recommed-for-rejection",
        "view:appeal-recommed-for-investigation",

        // Appeals update permissions
        "update:appeal-incoming",
        "update:appeal-pending-screening",
        "update:appeal-pending-assessment",
        "update:appeal-pending-approval",
        "update:appeal-recommed-for-approval",
        "update:appeal-recommed-for-rejection",
        "update:appeal-recommed-for-investigation",
    ],
    investigations_officer: [
        "create:complaints",
        "create:tipoffs",

        "view:tipoffs",
        "view:complaints-incoming",
        "view:complaints-ongoing-investigation",

        "update:complaints-incoming",
        "update:complaints-ongoing-investigation",
    ],
    senior_investigations_officer: [
        "create:complaints",
        "create:tipoffs",

        "view:tipoffs",
        "view:complaints-review",
        "view:complaints-ongoing-investigation",

        "update:complaints-review",
        "update:complaints-ongoing-investigation",
    ],
    investigations_manager: [
        "create:complaints",

        "view:complaints-assessment",
        "view:complaints-ongoing-investigation",
        "view:complaints-investigation-complete",
        "view:cpd-incoming",
        "allocate:complaints-assessment",

        "update:complaints-ongoing-investigation",
        "update:complaints-ongoing-investigation",

        "update:complaints-investigation-complete",
    ],
    investigations_director: [
        'view:complaints-recommend-for-investigation',
        'view:complaints-recommend-for-disciplinary',
        "view:complaints-investigation-complete",
        'view:complaints-recommend-for-closure',
        
        "update:complaints-investigation-complete",
        'update:complaints-recommend-for-investigation',
        "update:complaints-ongoing-disciplinary",
        'update:complaints-recommend-for-closure',
    ],
    disciplinary_committee: [
        "view:complaints-ongoing-disciplinary",
    ],
    manager: [

    ],
    teacher_development_officer:[
        "view:cpd-incoming",
        "update:cpd-pending-screening",
        "update:cpd-incoming"
    ],
    senior_development_officer:[
        "view:cpd-pending-verification",
        "view:cpd-pending-screening",
        "update:cpd-pending-verification",
        "update:cpd-pending-screening"
    ],
    teacher_development_manager: [
        "view:cpd-recommed-for-approval",
        "update:cpd-recommed-for-approval"
    ],
    appeals_officer: [
        "view:appeal-incoming",
        "view:appeal-pending-screening",
        "update:appeal-incoming",
        "update:appeal-pending-screening",
    ],
    senior_appeals_officer: [
        "view:appeal-pending-assessment",
        "update:appeal-pending-assessment",
    ],
    appeals_manager: [
        "view:appeal-pending-approval",
        "update:appeal-pending-approval",
    ],
    appeals_director: [
        "view:appeal-recommed-for-approval",
        "view:appeal-recommed-for-rejection",
        "view:appeal-recommed-for-investigation",
        "update:appeal-recommed-for-approval",
        "update:appeal-recommed-for-rejection",
        "update:appeal-recommed-for-investigation",
    ]
} as const

export const CPDROLES = [
    "TEACHER_DEVELOPMENT_OFFICER","TEACHER_DEVELOPMENT_MANAGER","SENIOR_DEVELOPMENT_OFFICER"
]

export function hasPermission(user: Role, permission: Permission){
    return (ROLES[user] as readonly Permission[]).includes(permission)
}

export const portalNames: { [key: string]: string } = {
    'REGISTRATION_OFFICER': 'Registration Officer Portal',
    'ADMIN': 'Admin Portal',
    'MANAGER': 'Registration Manager Portal',
    'LICENSE_MANAGER': 'License Manager Portal',
    'SNR_REGISTRATION_OFFICER':'Snr. REG Officer Portal',
    'DIRECTOR': 'Director Portal',
    'REGISTRAR': 'Registrar Portal',
    'LICENSE_OFFICER': 'License Officer Portal',
    'SNR_LICENSE_OFFICER':'Snr. LIC Officer Portal',
    'INVESTIGATIONS_OFFICER': 'Investigations Officer Portal',
    'SENIOR_INVESTIGATIONS_OFFICER': 'Senior INV Officer Portal',
    'INVESTIGATIONS_MANAGER': 'Investigations Manager Portal',
    'DISCIPLINARY_COMMITTEE':'Disciplinary Committe Portal',
    'INVESTIGATIONS_DIRECTOR': 'Investigations Director Portal',
    'TEACHER_DEVELOPMENT_OFFICER':'Teacher DEV Officer Portal',
    'TEACHER_DEVELOPMENT_MANAGER':'Teacher DEV Manager Portal',
    'SENIOR_DEVELOPMENT_OFFICER':'Senior DEV Officer Portal',
    'APPEALS_OFFICER':'Appeals Officer Portal',
    'SENIOR_APPEALS_OFFICER':'Senior Appeals Officer Portal',
    'APPEALS_MANAGER':'Appeals Manager Officer Portal',
    'APPEALS_DIRECTOR':'Appeals Director Officer Portal'
};

// legacy code
export interface RoleObjects{
    [key: string]:{
        reg_application: boolean | false,
        lic_application: boolean | false,
        inv_application: boolean | false,
        reg_Next_Status: string | null,
        inv_Next_Status: string | null,
        tipoff_Next_Status: string | null,
        lic_Next_Status: string | null,
        activity_object?: boolean,
        defaultWork: string | ''
    }
}

// legacy code
export const roleObjects: RoleObjects = {
    'registration_officer': {
        reg_application: true,
        lic_application: false,
        inv_application: false,
        reg_Next_Status: 'Pending-Screening',
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: null,
        defaultWork: 'RegistrationApplication'
    },
    'investigations_officer': {
        reg_application: false,
        lic_application: false,
        inv_application: true,
        reg_Next_Status: null,
        inv_Next_Status: 'Incoming',
        tipoff_Next_Status: 'Incoming',
        lic_Next_Status: null,
        activity_object: true,
        defaultWork: 'Investigations'
    },
    'senior_investigations_officer': {
        reg_application: false,
        lic_application: false,
        inv_application: true,
        reg_Next_Status: null,
        inv_Next_Status: 'Under-Review',
        tipoff_Next_Status: 'Under-Review',
        activity_object: true,
        lic_Next_Status: null,
        defaultWork: 'Investigations'
    },
    'investigations_manager': {
        reg_application: false,
        lic_application: false,
        inv_application: true,
        reg_Next_Status: null,
        inv_Next_Status: 'Assessment',
        tipoff_Next_Status: 'Assessment',
        activity_object: true,
        lic_Next_Status: null,
        defaultWork: 'Investigations'
    },
    'license_officer': {
        reg_application: false,
        lic_application: true,
        inv_application: false,
        reg_Next_Status: null,
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: 'Pending-Screening',
        defaultWork: 'licenseApplication'
    },
    'snr_registration_officer': {
        reg_application: true,
        lic_application: false,
        inv_application: false,
        reg_Next_Status: 'Pending-Assessment',
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: null,
        defaultWork: 'RegistrationApplication'
    },
    'snr_license_officer': {
        reg_application: false,
        lic_application: true,
        inv_application: false,
        reg_Next_Status: null,
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status:'Pending-Assessment',
        defaultWork: 'licenseApplication'
    },
    'manager': {
        reg_application: true,
        lic_application: false,
        inv_application: false,
        reg_Next_Status: 'Pending-Manager-Approval',
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: null,
        defaultWork: 'RegistrationApplication'
    },
    'license_manager': {
        reg_application: false,
        lic_application: true,
        inv_application: false,
        reg_Next_Status: null,
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: 'Pending-Manager-Approval',
        defaultWork: 'licenseApplication'
    },
    'director': {
        reg_application: true,
        lic_application: true,
        inv_application: false,
        reg_Next_Status: 'Pending-Endorsement',
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: 'Pending-Endorsement',
        defaultWork: 'RegistrationApplication'
    },
    'registrar': {
        reg_application: true,
        lic_application: true,
        inv_application: false,
        reg_Next_Status: 'Endorsement-Recommendation',
        inv_Next_Status: null,
        tipoff_Next_Status: null,
        lic_Next_Status: 'Endorsement-Recommendation',
        defaultWork: 'RegistrationApplication'
    },
}
// legacy code
export const mgt = [
    'director', 
    'registrar'
]

// legacy code
export const statusTransitions: StatusTransition = {
    'Default': {
        prev_status: 'Default',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        next_status: 'Default',
        reject_label: null,
        approve_label: null,
        recommend_label: null,
        endorse_label: null
    },
    'registration_officer': {
        prev_status: 'Pending-Customer-Action',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        next_status: 'Pending-Assessment',
        reject_label: 'Return',
        approve_label: 'Pass-Screening',
        recommend_label: null,
        endorse_label: null
    },
    'investigations_officer': {
        prev_status: 'Incoming',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        next_status: 'Under-review',
        reject_label: 'Incoming',
        approve_label: 'Review',
        submit: true,
        allocate: false,
        recommend_label: null,
        endorse_label: null
    },
    'senior_investigations_officer': {
        prev_status: 'Incoming',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        submit: true,
        allocate: false,
        next_status: 'Assessment',
        reject_label: 'Incoming',
        approve_label: 'Assessment',
        recommend_label: null,
        endorse_label: null
    },
    'investigations_manager': {
        prev_status: 'Incoming',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        submit: false,
        allocate: true,
        next_status: null,
        reject_label: 'Incoming',
        approve_label: 'Allocate to',
        recommend_label: null,
        endorse_label: null
    },
    'license_officer': {
        prev_status: 'Pending-Customer-Action',
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: null,
        next_status: 'Pending-Assessment',
        reject_label: 'Return',
        approve_label: 'Pass-Screening',
        recommend_label: null,
        endorse_label: null
    },
    'snr_license_officer': {
        prev_status: null,
        inv_status: 'Pending-Investigation',
        bar_status: 'Barred',
        rej_status: 'Recommended-For-Rejection',
        recommend: null,
        endorse: null,
        next_status: 'Recommended-For-Approval',
        reject_label: 'Recommend For Rejection',
        approve_label: 'Recommend For Approval',
        recommend_label: null,
        endorse_label: null
    },
    'snr_registration_officer': {
        prev_status: null,
        inv_status: 'Pending-Investigation',
        bar_status: 'Barred',
        rej_status: 'Recommended-For-Rejection',
        recommend: null,
        endorse: null,
        next_status: 'Recommended-For-Approval',
        reject_label: 'Recommend For Rejection',
        approve_label: 'Recommend For Approval',
        recommend_label: null,
        endorse_label: null
    },
    'manager': {
        prev_status: 'Pending-Review',
        inv_status: null,
        bar_status: null,
        rej_status: 'Manager-Rejected',
        recommend: null,
        endorse: null,
        next_status: 'Manager-Approved',
        reject_label: 'Reject',
        approve_label: 'Approve',
        recommend_label: null,
        endorse_label: null
    },
    'license_manager': {
        prev_status: 'Pending-Customer-Action',
        inv_status: null,
        bar_status: null,
        rej_status: 'Manager-Rejected',
        recommend: null,
        endorse: null,
        next_status: 'Manager-Approved',
        reject_label: 'Reject',
        approve_label: 'Approve',
        recommend_label: null,
        endorse_label: null
    },
    'director': {
        prev_status: null,
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: 'Endorsement-Recommendation',
        endorse: 'Endorsement-Complete',
        next_status: null,
        reject_label: null,
        approve_label: null,
        recommend_label: 'Recommend',
        endorse_label: 'Endorse'
    },
    'registrar': {
        prev_status: null,
        inv_status: null,
        bar_status: null,
        rej_status: null,
        recommend: null,
        endorse: 'Endorsement-Complete',
        next_status: null,
        reject_label: null,
        approve_label: null,
        recommend_label: 'Recommend',
        endorse_label: 'Endorse'
    },
};

const citizenOptions = [
    {label: 'Citizen', value: 'citizen'},
    {label: 'Non-citizen', value: 'non_citizen'},
]

const institutionOptions = [
    {label: 'Private', value: 'private'},
    {label: 'Public', value: 'public'},
]

const statusOptions = [
    {label: 'Student-Teacher', value: 'student'},
    {label: 'Unemployed', value: 'unemployed'},
    {label: 'Serving', value: 'serving'},
    {label: 'Retired', value: 'retired'},
]

const areaOfPractice = [
    {label: 'Select...', value: ''},
    {label: 'Pre-primary', value: 'student'},
    {label: 'Primary', value: 'primary'},
    {label: 'Junior Secondary', value: 'junior_secondary'},
    {label: 'Secondary', value: 'secondary'},
]

const regionOptions = [
    {label: 'Select...', value: ''},
    {label: 'Chobe', value: 'Chobe'},
    {label: 'Central', value: 'Central'},
    {label: 'City of Francistown', value: 'City of Francistown'},
    {label: 'Gaborone', value: 'Gaborone'},
    {label: 'Ghanzi', value: 'Ghanzi'},
    {label: 'Jwaneng', value: 'Jwaneng'},
    {label: 'Kgalagadi', value: 'Kgalagadi'},
    {label: 'Kgatleng', value: 'Kgatleng'},
    {label: 'Kweneng', value: 'Kweneng'},
    {label: 'Lobatse', value: 'Lobatse'},
    {label: 'Ngwaketsi', value: 'Ngwaketsi'},
    {label: 'North-East', value: 'North-East'},
    {label: 'North-West', value: 'North-West'},
    {label: 'Selibe Phikwe', value: 'Selibe Phikwe'},
    {label: 'South-East', value: 'South-East'},
    {label: 'Sowa Town', value: 'Sowa Town'},
]

const districtOptions = [
    {label: 'Select...', value: ''},
    {label: 'Chobe District', value: 'Chobe District'},
    {label: 'Ghanzi District', value: 'Ghanzi District'},
    {label: 'Kgalagadi District', value: 'Kgalagadi District'},
    {label: 'Kgatleng District', value: 'Kgatleng District'},
    {label: 'Kweneng District', value: 'Kweneng District'},
    {label: 'North-East District', value: 'North-East District'},
    {label: 'Ngamiland District', value: 'Ngamiland District'},
    {label: 'South-East District', value: 'South-East District'},
    {label: 'Southern District', value: 'Southern District'},
]

const yearsOptions = [
    {value:"2024"},
    {value:"2023"},
    {value:"2022"},
    {value:"2021"},
    {value:"2020"},
    {value:"2019"},
    {value:"2018"},
    {value:"2017"},
    {value:"2016"},
    {value:"2015"},
]
const placeOptions = [
    {label: 'Select...', value: ''},
    {label: 'Gaborone', value: 'Gaborone'},
    {label: 'Maun', value: 'Maun'},
    {label: 'Orapa', value: 'Orapa'},
    {label: 'Gantsi', value: 'Lobatse'},
    {label: 'Letlhakane', value: 'Letlhakane'},
    {label: 'Mopipi', value: 'Mopipi'},
    {label: 'Jwaneng', value: 'Jwaneng'},
    {label: 'Serowe', value: 'Serowe'},
    {label: 'Palapye', value: 'Palapye'},
]

const employmentOptions = [
    {label: 'Employed', value: 'employed'},
    {label: 'Un-Employed', value: 'un-employed'},
]

const disabilityOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
]

const convitionOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
]


const registrationCategory = [
    {label: 'Select...', value: ''},
    {label: 'Teacher Aide', value: 'Teacher Aide'},
    {label: 'Early Childhood Teacher', value: 'Early Childhood Teacher'},
    {label: 'Primary School Teacher', value: 'Primary School Teacher'},
    {label: 'Junior Secondary Teacher', value: 'Junior Secondary Teacher'},
    {label: 'Senior Secondary Teacher', value: 'Senior Secondary Teacher'},
    {label: 'Special Education/Guidance and Counselling Teacher', value: 'Special Education/Guidance and Counselling Teacher'},
    {label: 'Education Administrator', value: 'Education Administrator'},
]

export const users = [
    {
        national_id: "936510813",
        surname: "Serala",
        middlename: "Masego",
        forenames: "Oaitse",
        dob: "1996-02-15",
        pob: "Mahalapye",
        gender: "Male",
        nationality: "Motswana",
        postal_address: "P O Box 7886, Mahalapye",
        physical_address: "Block 10, Gaborone",
        email: "johndoe@gmail.com",
        mobile: "26774217788",
        marital_status: "Single",
        next_of_kin_name: "Sarah Cornor",
        next_of_kin_relation: "Mother",
        next_of_kin_contact: "26776554321"
    },
    {
        national_id: "440418213",
        surname: "Bopaki",
        middlename: "",
        forenames: "Tebalo",
        dob: "1996-02-15",
        pob: "Orapa",
        gender: "Male",
        nationality: "Motswana",
        postal_address: "P O Box 48, Mopipi",
        physical_address: "Block 10, Gaborone",
        email: "btebalo@gmail.com",
        mobile: "26774217788",
        marital_status: "Single",
        next_of_kin_name: "Sarah Cornor",
        next_of_kin_relation: "Mother",
        next_of_kin_contact: "26776554321"
    }
]

export const steps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: 'BIO DATA',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: 'EMPLOYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: 'QUALIFICATIONS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 5',
        name: 'DISABILITY',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 6',
        name: 'OFFENCE',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 7',
        name: 'ATTACHMENTS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 8',
        name: 'DECLARATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 9',
        name: 'PREVIEW'
    },
    {
        id: 'Step 10',
        name: 'COMPLETE'
    },
]
export const teacherLicenseSteps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: 'PROFILE INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: 'EMPLOYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: 'QUALIFICATIONS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 6',
        name: 'OFFENCE',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 7',
        name: 'ATTACHMENTS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 8',
        name: 'DECLARATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 9',
        name: 'PAYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 9',
        name: 'COMMENTS'
    },
    {
        id: 'Step 10',
        name: 'PREVIEW',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    }
]
export const teacherSteps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: 'PROFILE INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: 'EMPLOYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: 'QUALIFICATIONS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 5',
        name: 'DISABILITY',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 6',
        name: 'OFFENCE',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 7',
        name: 'ATTACHMENTS',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 8',
        name: 'DECLARATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 9',
        name: 'PAYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 9',
        name: 'COMMENTS'
    },
    {
        id: 'Step 10',
        name: 'PREVIEW',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    }
]

export const learnerSteps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: 'PERSONAL INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: 'STUDY PROGRAMME',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: 'DECLARATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 5',
        name: 'RECOMMENDATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 6',
        name: 'PAYMENT',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 7',
        name: 'COMMENTS'
    },
    {
        id: 'Step 8',
        name: 'PREVIEW'
    },
]

export const studentSteps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: 'BIO DATA',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: 'STUDY PROGRAMME',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: 'DECLARATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 5',
        name: 'RECOMMENDATION',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 6',
        name: 'PREVIEW'
    },
    {
        id: 'Step 7',
        name: 'COMPLETE'
    },
]

export const hiddenSteps = [
    {
        id: 'Step 1',
        name: 'PRELIMINARY INFO',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 2',
        name: '--------------------',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 3',
        name: '--------------------',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 4',
        name: '--------------------',
        fields: ['Citizenry','Status','Categories of Practice','Sub-categories']
    },
    {
        id: 'Step 5',
        name: '--------------------'
    },
    {
        id: 'Step 6',
        name: '--------------------'
    },
]

export const Region = ["Gaborone", "Francistowm", "Palapye"] as const;
export const District = ["Chobe District", "Ghanzi District", "Ngamiland District", "Kgatleng District", "Kweneng District", "South-East District"] as const;
export const Place = ["Gaborone","Francistown","Maun","Palapye","Mahalapye","Serowe","Orapa","Gantsi","Jwaneng"] as const; 

export const institutions = [
    {
        value: "Letlhakane Senior School",
        region: "Central",
        district: "Central",
        city_or_town: "Letlhakane",
        label: "Letlhakane Senior School"
    },
    {
        value: "Maru-a-pula Senior School",
        region: "South-East",
        district: "South-East District",
        city_or_town: "Gaborone",
        label: "Maru-a-pula Senior School"
    },
    {
        value: "Maun Senior School",
        region: "South-East",
        district: "Ngamiland District",
        city_or_town: "Maun",
        label: "Maun Senior School"
    },
]

