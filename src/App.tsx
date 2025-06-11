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

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  

  const deleteTask = (taskId: string) => {
    // const filteredTasks = tasks.filter((task) => {
    //   return task.id !== taskId;
    // });
    // setTasks(filteredTasks);
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((t) => (t.id === todolistId ? { ...t, filter } : t))
    );
  };

  const createTask = (title: string) => {
    // const newTask = { id: v1(), title, isDone: false };
    // const newTasks = [newTask, ...tasks];
    // setTasks(newTasks);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    // const newState = tasks.map((task) =>
    //   task.id == taskId ? { ...task, isDone } : task
    // );
    // setTasks(newState);
  };

  type todolistType = {
    id: string;
    title: string;
    filter: FilterValues;
  };

  return (
    <div className="app">
      {todolists.map((tl) => {

  let filteredTasks = tasks[tl.id];
  if (tl.filter === "active") {
    filteredTasks = tasks[tl.id].filter(task => !task.isDone);
  }
  if (tl.filter === "completed") {
    filteredTasks = tasks[tl.id].filter((task) => task.isDone);
  }

        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
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
