'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function RevenueChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
        <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis
          tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value) => [`UGX ${Number(value ?? 0).toLocaleString('en-UG')}`, 'Revenue']}
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          cursor={{ fill: '#f1f5f9' }}
        />
        <Bar dataKey="total" name="Revenue" fill="#009FCE" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
