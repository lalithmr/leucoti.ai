export interface Lead {
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: any; // FieldValue or Date
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
}
