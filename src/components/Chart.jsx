import React from "react";
import { useContext } from "react";
import { TaskContext } from "../store/taskcontext";
import classes from "./chart.module.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const Chart = () => {
  const { filteredTask } = useContext(TaskContext);
  console.log(filteredTask);
  const completed = filteredTask.filter((ele) => ele.status == 1);
  const progress = filteredTask.filter((ele) => ele.status == 2);
  const toStart = filteredTask.length - (completed.length + progress.length);
  const data = [
    { name: "Completed", value: completed.length },
    { name: "In Progress", value: progress.length },
    { name: "Yet To Start", value: toStart },
  ];
  const completedLow = filteredTask.filter(
    (ele) => ele.priority == 1 && ele.status == 1
  );
  const completedMedium = filteredTask.filter(
    (ele) => ele.priority == 2 && ele.status == 1
  );
  const completedHigh =
    completed.length - completedLow.length - completedMedium.length;
  const progressLow = filteredTask.filter(
    (ele) => ele.priority == 1 && ele.status == 2
  );
  const progressMedium = filteredTask.filter(
    (ele) => ele.priority == 2 && ele.status == 2
  );
  const progressHigh =
    progress.length - progressLow.length - progressMedium.length;
  const startLow = filteredTask.filter(
    (ele) => ele.priority == 1 && ele.status == 3
  );
  const startMedium = filteredTask.filter(
    (ele) => ele.priority == 2 && ele.status == 3
  );
  const startHigh = toStart - startLow.length - startMedium.length;

  const dataChart = [
    {
      name: "Completed",
      low: completedLow.length,
      medium: completedMedium.length,
      high: completedHigh,
    },
    {
      name: "In Progress",
      low: progressLow.length,
      medium: progressMedium.length,
      high: progressHigh,
    },
    {
      name: "Yet To Start",
      low: startLow.length,
      medium: startMedium.length,
      high: startHigh,
    },
  ];
  console.log(dataChart);
  return (
    <div style={{ textAlign: "center" }}>
      <div className={classes.outer}>
        {/* <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            isAnimationActive={false}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart> */}
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#7d5fc9c1" background={{ fill: "#eee" }} />
        </BarChart>
        <AreaChart
          width={730}
          height={250}
          data={dataChart}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7d5fc9c1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7d5fc9c1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7d5fc9c1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7d5fc9c1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="low"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="medium"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="high"
            stroke="#ec5300"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default Chart;
