export interface Task {
  id: string | null;
  title: string;
  description: string;
  status: string;
  updatedAt?: string;
}

export interface Error {
  message: string;
  status: number;
}