'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const ROLE_LABELS: Record<string, string> = {
  director: 'Director',
  manager: 'Manager',
  sales_manager: 'Sales Mgr',
  accountant: 'Accountant',
  receptionist: 'Reception',
  technician: 'Technician',
  customer: 'Customer',
};

export function RoleBarChart({ data }: { data: { role: string; count: number }[] }) {
  const chartData = data.map((d) => ({
    name: ROLE_LABELS[d.role] ?? d.role,
    count: d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          cursor={{ fill: '#f3f4f6' }}
        />
        <Bar dataKey="count" name="Users" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={entry.name} fill={i % 2 === 0 ? '#009FCE' : '#00477A'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
