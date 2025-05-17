import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Users",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Product",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Monthly Sale",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "New Users",
    A: 99,
    B: 100,
    fullMark: 150,
  },
];

function DashRadar() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default DashRadar;
