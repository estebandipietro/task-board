export interface BoardType {
    backlog: Task[];
    todo: Task[];
    doing: Task[];
    done: Task[];
}

export interface Task {
    id: string;
    content: string;
}