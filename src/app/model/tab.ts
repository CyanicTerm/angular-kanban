import { ITask } from "./task";

export interface ITab {
    name: string,
    toDo: ITask[],
    inProgress: ITask[],
    done: ITask[]
}