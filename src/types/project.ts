export type TaskStatus = 'ongoing' | 'due' | 'complete';

export interface Task {
  id: string;
  startDate: number;
  endDate: number;
}

export interface Project {
  id: string;
  label: string;
  status: TaskStatus;
  tasks: Task[];
}
