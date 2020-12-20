export interface ITask {
  id?: number;
  title: string;
  description: string;
  finished: boolean;
  createdAt?: string;
  updatedAt?: string;
}
