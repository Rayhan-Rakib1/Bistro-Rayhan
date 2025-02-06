import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaUsers } from 'react-icons/fa';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend,  } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const { data: stats = [] } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })

  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');
      return res.data
    }
  })

  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // pi chart 
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const PieChartData = chartData.map(data => {
    return {name: data.category, value: data.quantity}
  })
  console.log('chartData:', chartData);
console.log('PieChartData:', PieChartData.category);


  return (
    <div>
      <div>
        <h1 className='text-2xl'>
          <span>Hi, Welcome </span>
          {
            user?.displayName ? user.displayName : 'back'
          }
        </h1>
      </div>

      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Revenue</div>
          <div class="stat-value">${stats.revenue}</div>
          <div class="stat-desc">From January 1st to February 1st</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Users</div>
          <div class="stat-value text-secondary flex flex-row gap-3 items-center"><FaUsers className='text-3xl'></FaUsers> {stats.users}</div>
          <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Orders</div>
          <div class="stat-value">{stats.orders}</div>
          <div class="stat-desc">↘︎ 90 (14%)</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Menu Items</div>
          <div class="stat-value text-secondary flex flex-row gap-3 items-center"><FaBook className='text-3xl'></FaBook> {stats.menuItems}</div>
          <div class="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* charts  */}
      <div className='flex'>
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="w-1/2">
        <PieChart width={400} height={400}>
          <Pie
            data={PieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {PieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
        </div>
      </div>


    </div>
  );
};

export default AdminHome;