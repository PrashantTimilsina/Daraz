import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total Users",
    user: 590,
    discount: 800,
    sale: 1400,
  },
  {
    name: "New Users",
    user: 868,
    discount: 967,
    sale: 1506,
  },
  {
    name: "Deleted Users",
    user: 1397,
    discount: 1098,
    sale: 989,
  },
];

function DashGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#e0e0e0" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Area dataKey="user" fill="#82ca9d" stroke="#388e3c" />
        <Bar dataKey="sale" barSize={20} fill="#1976d2" />
        <Line dataKey="discount" stroke="#f44336" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default DashGraph;
