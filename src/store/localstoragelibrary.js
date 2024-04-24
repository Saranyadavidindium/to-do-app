export function setLocalStorageTask(tasks) {
  localStorage.setItem("task", JSON.stringify(tasks));
}

export function setLocalStoragePrimaryKey(primaryKey) {
  localStorage.setItem("primaryKey", primaryKey);
}

export function setLocalStorageFilters(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
}

export function getLocalStorageFilters() {
  const data = localStorage.getItem("filters");
  if (data) return JSON.parse(data);
  else return {};
}

export function getLocalStoragePrimaryKey() {
  const data = localStorage.getItem("primaryKey");
  if (data) return data;
  else return 1;
}

export function getLocalStorageTask() {
  // if (typeof window !== "undefined") {
  const data = localStorage.getItem("task");
  if (data) return JSON.parse(data);
  else return [];
}
export function getLocalStorageFilteredTasks() {
  const data = localStorage.getItem("filteredTask");
  if (data) {
    const value = JSON.parse(data);
    console.log(value);
    const result = value.filter(
      (ele) => ele.user === getLocalStorageLoggedInUser()
    );
    return result;
  } else return [];
}

export default function getLocalStorageUsers() {
  const response = localStorage.getItem("users");
  if (response) return JSON.parse(response);
  else return [];
}

// export function getLocalStorageUserID() {
//   const data = localStorage.getItem("primaryKeyUser");
//   if (data) return JSON.parse(data);
//   else return 1;
// }

export function getLocalStorageLoggedInUser() {
  const data = localStorage.getItem("loggedInUser");
  if (data) return JSON.parse(data);
  else return "";
}
