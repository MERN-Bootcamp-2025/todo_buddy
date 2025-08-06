export interface IUser {
  uuid: number;
  full_name: string;
  email: string;
  phone_no: string;
  hashed_password: string;
  dob: Date;
  gender: string; 
  insurance_provider: string;
  policy_no: string;
  jwt_token: string;
  description: string;
  role: string;
  medical_specialty : string;
  license_no: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  full_name: string;
  email: string;
  phone_no: string;
  hashed_password: string;
  dob: Date;
  gender: string; 
  insurance_provider: string;
  policy_no: string;
  jwt_token: string;
  description: string;
  role: string;
  medical_specialty : string;
  license_no: string;
}

export interface IUpdateUser {
  full_name?: string;
  email?: string;
  phone_no?: string;
  hashed_password?: string;
  dob?: Date;
  gender?: string; 
  insurance_provider?: string;
  policy_no?: string;
  jwt_token?: string;
  description?: string;
  role?: string;
  medical_specialty ?: string;
  license_no?: string;
} 

