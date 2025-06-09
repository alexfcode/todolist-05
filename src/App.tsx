import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  // const [filter, setFilter] = useState<FilterValues>("all");

  const [todolist, setTodolist] = useState<todolistType[]>([
    { id: v1(), title: "What to learn", filter: "all" },
    { id: v1(), title: "What to buy", filter: "active" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const changeFilter = (filter: FilterValues) => {
    //setFilter(filter);
  };

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map((task) =>
      task.id == taskId ? { ...task, isDone } : task
    );
    setTasks(newState);
  };

  type todolistType = {
    id: string;
    title: string;
    filter: FilterValues;
  };

  return (
    
    <div className="app">
      {todolist.map((tl) => {

        // let filteredTasks = tasks;
        // if (tl.filter === "active") {
        //   filteredTasks = tasks.filter((task) => !task.isDone);
        // }
        // if (tl.filter === "completed") {
        //   filteredTasks = tasks.filter((task) => task.isDone);
        // }

        return (
          <TodolistItem
            key={tl.id}
            title={tl.title}
            tasks={tasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
};
