export interface restoration {
    national_id: string | null,
    reg_number: string | null,
    endorsement_status: string | null,
    rejection_reason: string | null,
    service_code: string | null,
    payment_ref: string | null,
    payment_amount: string | null,
    payment_name: string | null,
    reg_status: string | null,
    application_id: string | null,
    license_link: string | null,
    education_bg_checks: string | null,
    flags_no: string | null,
    institution_verification: string | null,
    course_verification: string | null,
    license_status: string | null,
    pending_customer_action: string | null,
    registration_type: string | null,
    created_at: string | null,
    updated_at: string | null,
}

export interface RestorationListResponse {
    message?: string,
    code: number,
    applications?: restoration[]
}