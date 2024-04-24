import React from "react";
import MaterialTable from "material-table";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskContext } from "../store/taskcontext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomDatePicker from "./CustomDatePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  MuiThemeProvider,
  createMuiTheme,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import classes from "./CustomTable.module.css";
import { ThemeProvider, createTheme } from "@mui/material";

const CustomTable = () => {
  const { filteredTask, addTask, updateTask, deleteTask, deleteTaskGroup } =
    useContext(TaskContext);
  const defaultMaterialTheme = createMuiTheme({
    palette: {
      type: "light",
    },
  });
  const column = [
    { title: "Task Name", field: "task" },
    {
      title: "Date",
      field: "date",
      // dateSetting: { locale: "en-US" },
      dateSetting: { locale: "ko-KR" },
      // type: "date",
      // filterComponen: (props) => <CustomDatePicker {...props} />,
    },
    {
      title: "Priority",
      field: "priority",
      lookup: { 1: "Low", 2: "Medium", 3: "High" },
    },
    {
      title: "Status",
      field: "status",
      lookup: { 1: "Completed", 2: "In Progress", 3: "Yet To Start" },
    },
  ];
  const [open, setOpen] = React.useState(false);
  var msg = "Action Success!";
  const handleClick = (msgs) => {
    msg = msgs;
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className={classes.outer}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={column}
          data={filteredTask}
          title="Task List"
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                addTask(newRow);
                handleClick("Task Added!");
                setTimeout(() => resolve(), 500);
              }),
            onRowUpdate: (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                updateTask(newRow, oldRow.taskId);
                handleClick("Task Updated!");
                setTimeout(() => resolve(), 500);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                deleteTask(selectedRow.taskId);
                setTimeout(() => resolve(), 1000);
                handleClick("Task Deleted!");
              }),
          }}
          options={{
            addRowPosition: "first",
            actionsColumnIndex: -1,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Task-List",
            selection: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            // rowStyle: (data, index) =>
            //   index % 2 === 0 ? { background: "#f5f5f5" } : null,
            paging: true,
            headerStyle: { backgroundColor: "#7d5fc9c1" },
            pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
            pageSize: 5,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "bottom",
            // filtering: true,
          }}
          actions={[
            {
              icon: () => <DeleteIcon />,
              tooltip: "Click me",
              onClick: (e, data) =>
                new Promise((resolve, reject) => {
                  deleteTaskGroup(data);
                  handleClick("Tasks Deleted!");
                  setTimeout(() => resolve(), 1000);
                }),

              // isFreeAction:true
            },
          ]}
        />
      </ThemeProvider>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
      ;
    </div>
  );
};

export default CustomTable;
