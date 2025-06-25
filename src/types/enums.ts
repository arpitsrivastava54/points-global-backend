export enum UserRole {
  Member = 'Member', // 
  Admin = 'Admin', // admin will have create organization permission and can manage all organization
}

export enum OrgUserRole {
  Member = 'Member',
  Owner = 'Owner',
}

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum PlanType {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium',
}

export enum PlanDuration {
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export const PlanMap = {
  [PlanType.Basic]: { tokens: 10, price: 100 },
  [PlanType.Standard]: { tokens: 50, price: 500 },
  [PlanType.Premium]: { tokens: 100, price: 900 },
} as const;

export enum EvaluationStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Evaluated = 'Evaluated',
  Failed = 'Failed',
}