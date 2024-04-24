import { createContext } from "react";
import { useState, useEffect, useReducer } from "react";
import getLocalStorageUsers, {
  getLocalStorageFilteredTasks,
  getLocalStoragePrimaryKey,
  setLocalStorageFilters,
  setLocalStoragePrimaryKey,
  getLocalStorageFilters,
  getLocalStorageTask,
  setLocalStorageTask,
  getLocalStorageUserID,
  getLocalStorageLoggedInUser,
} from "./localstoragelibrary";

export const TaskContext = createContext({
  task: [],
  completed: 0,
  pending: 0,
  filteredTask: [],
  addTask: () => {},
  updateTask: () => {},
  countOfTasks: () => {},
  deleteTask: () => {},
  filterItems: () => {},
  deleteTaskGroup: () => {},
});

export default function TaskContextProdiver({ children }) {
  const [taskList, setTaskList] = useState({
    filteredTask: getLocalStorageFilteredTasks(),
    task: [],
    completed: 0,
    pending: 0,
    user: getLocalStorageLoggedInUser(),
  });
  useEffect(() => {
    const value = getLocalStoragePrimaryKey();
    const data = getLocalStorageFilteredTasks();
    const users = getLocalStorageUsers();
    localStorage.setItem("filters", JSON.stringify({}));
    localStorage.setItem("filteredTask", JSON.stringify(data));
    localStorage.setItem("primaryKey", value);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("task", JSON.stringify(getLocalStorageTask()));
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(getLocalStorageLoggedInUser())
    );
    countOfTasks();
  }, []);

  function setUser(user) {
    setLocalStorageFilters({});
    setTaskList((pre) => {
      return {
        ...pre,
        user: user,
      };
    });
  }

  function logOutUser() {
    localStorage.setItem("loggedInUser", "");
    setTaskList((pre) => {
      return {
        ...pre,
        user: "",
      };
    });
  }

  function addTask(text) {
    console.log(text);
    const tasks = getLocalStorageTask();
    const user = getLocalStorageLoggedInUser();
    const taskId = Number(getLocalStoragePrimaryKey()) + 1;
    const newTask = {
      taskId,
      user: user,
      ...text,
    };
    let updateTask = [];
    if (tasks) {
      updateTask = [...tasks, newTask];
    } else {
      updateTask = [newTask];
    }

    setTaskList((pre) => {
      return {
        ...pre,
        task: updateTask,
      };
    });
    setLocalStorageTask(updateTask);
    setLocalStoragePrimaryKey(taskId);
    filterItems();
  }

  function updateTask(data, id) {
    console.log("update" + id);
    let task = getLocalStorageTask();
    const value = task.filter((ele) => ele.taskId != id);
    const newValue = {
      taskId: id,
      ...data,
    };
    setLocalStorageTask([...value, newValue]);
    setTaskList((ele) => {
      return {
        ...ele,
        task: [...value, newValue],
      };
    });
    filterItems();
  }

  function countOfTasks() {
    const user = getLocalStorageLoggedInUser();
    const total = taskList.task.filter(
      (ele) => !ele.deleted && ele.user === user
    );
    const completed = taskList.task.filter(
      (ele) => ele.status === "Completed" && !ele.deleted && ele.user === user
    );
    setTaskList((ele) => {
      return {
        ...ele,
        completed: completed.length,
        pending: total.length - completed.length,
      };
    });
  }

  function deleteTask(id) {
    const allTasks = getLocalStorageTask();
    const index = allTasks.findIndex((task) => task.taskId === id);
    const task = allTasks[index];
    const data = {
      ...task,
      deleted: true,
    };
    allTasks[index] = data;
    setLocalStorageTask(allTasks);
    setTaskList((ele) => {
      const tasks = [...ele.task];
      const value = tasks.filter((work) => work.taskId != id);
      return {
        ...ele,
        task: value,
      };
    });
    console.log(taskList.task);
    filterItems();
  }

  function getTaskById(id) {
    const data = localStorage.getItem("task");
    const task = JSON.parse(data);
    const index = task.findIndex((ele) => ele.taskId == id);
    const existingTask = task[index];
    return existingTask;
  }

  function handleFindDeleted() {
    const task = getLocalStorageTask();
    let temp = task.filter((ele) => ele.deleted);
    localStorage.setItem("filteredTask", JSON.stringify(temp));
    setTaskList((prevState) => {
      return {
        ...prevState,
        filteredTask: temp,
      };
    });
    console.log(taskList.filteredTask);
    console.log(temp);
  }

  const filterItems = () => {
    const task = getLocalStorageTask();
    // const filt = getLocalStorageFilters();
    const user = getLocalStorageLoggedInUser();
    // console.log(filt);
    // if (filt.length > 0) {
    let temp = task.filter(
      (ele) => {
        if (user !== ele.user) return false; // Filter out tasks not belonging to the user
        if (ele.deleted) return false;
        // if (filt.Category && ele.category !== filt.Category) return false; // Filter out tasks with different category

        // if (filt.Priority && ele.priority !== filt.Priority) return false; // Filter out tasks with different priority

        // if (filt.Status && ele.status !== filt.Status) return false; // Filter out tasks with different status

        return true; // Include tasks that passed all filters
      } // Any one condition is true
    );
    console.log("Filterdsdadas sad", temp);
    // const uniqueTasks = [...new Set(temp.flat())];
    localStorage.setItem("filteredTask", JSON.stringify(temp));
    setTaskList((prevState) => {
      return {
        ...prevState,
        filteredTask: temp,
      };
    });
    // } else {
    //   const result = task.filter((ele) => ele.user === user);
    //   localStorage.setItem("filteredTask", JSON.stringify(result));
    //   setTaskList((prevState) => {
    //     return {
    //       ...prevState,
    //       filteredTask: result,
    //     };
    //   });
    // }
  };

  function getTaskById(id) {
    const data = localStorage.getItem("task");
    const task = JSON.parse(data);
    const index = task.findIndex((ele) => ele.taskId == id);
    const existingTask = task[index];
    return existingTask;
  }

  function deleteTaskGroup(taskGroup) {
    const allTasks = getLocalStorageTask();
    const taskIds = taskGroup.map((ele) => ele.taskId);
    let index, task, data;
    for (let id = 0; id < taskGroup.length; id++) {
      index = allTasks.findIndex((task) => task.taskId === taskIds[id]);
      task = allTasks[index];
      data = {
        ...task,
        deleted: true,
      };
      allTasks[index] = data;
    }

    setLocalStorageTask(allTasks);
    setTaskList((ele) => {
      return {
        ...ele,
        task: allTasks,
      };
    });
    console.log(taskList.task);
    filterItems();
  }

  const ctxtValue = {
    task: getLocalStorageTask(),
    filteredTask: taskList.filteredTask,
    user: taskList.user,
    completed: taskList.completed,
    pending: taskList.pending,
    addTask: addTask,
    updateTask,
    countOfTasks,
    deleteTask,
    filterItems,
    getTaskById,
    setUser,
    logOutUser,
    handleFindDeleted,
    deleteTaskGroup,
  };

  return (
    <TaskContext.Provider value={ctxtValue}>{children}</TaskContext.Provider>
  );
}
