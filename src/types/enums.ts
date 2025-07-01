export enum UserRole {
  User = 'user', // 
  Admin = 'admin', // admin will have create organization permission and can manage all organization
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

export enum QuestionPaperType {
  QP = 'QP',
  QPA = 'QPA',
  QPM = 'QPM',
  AFR = 'AFR',
  AMO = 'AMO',
  AMP = 'AMP',
  MS = 'MS',
}

export enum EvaluationType {
  QPA = "QPA",
  QPA_MS = "QPA_MS",

  QP_AFR = "QP_AFR",
  QP_AFR_MS = "QP_AFR_MS",

  QPM = "QPM",
  QPM_MS = "QPM_MS",

  QP_AMO = "QP_AMO",
  QP_AMO_MS = "QP_AMO_MS",
  
  QP_AMP = "QP_AMP",
  QP_AMP_MS = "QP_AMP_MS",
}