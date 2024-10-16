export type AuthenticateResult =
  | { status: 'success' }
  | { status: 'failed'; message: string };

export type UserRole = 'MANAGER' | 'REGISTRATION_OFFICER' | 'SNR_REGISTRATION_OFFICER' | 'DIRECTOR' | 'REGISTRAR' | 'LICENSE_OFFICER' | 'SNR_LICENSE_OFFICER' | 'LICENSE_MANAGER'|'INVESTIGATIONS_OFFICER'| 'INVESTIGATIONS_MANAGER'| 'SENIOR_INVESTIGATIONS_OFFICER' | 'ADMIN';


export interface AuthResponse {
  message: string;
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string | null;
  session_state: string;
  scope: string;
  error: string | null;
  error_description: string | null;
  error_uri: string | null;
  code: number | null;
}

export interface ComplaintPayload {
  
}

export interface DecodedToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  email_verified: boolean;
  gender: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  client_id: string;
  username: string;
  active: boolean;
}

export interface Session {
  auth: AuthResponse;
  user?: DecodedToken;
  expires?: string
}

export interface AccessGroup {
  persona: string[],
  current: string;
  username: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface OTPPayload {
  username: string;
  otp: string;
}

export interface Registration {
  national_id: string;
  reg_number: string;
  reg_status: string;
  registration_type: string;
  created_at: string;
  updated_at: string;
}

export interface Complaint {
  crime_location: string;
  nature_of_crime: string;
  date: string;
  time: string;
  status: string;
  bif_number: string;
  case_number: string;
  fir_number: string;
  outcome: string;
}