import { getDepartmentPerformance } from '../actions';
import { Award, TrendingUp, ShoppingCart } from 'lucide-react';

export default async function ReportsPage() {
  const perf = await getDepartmentPerformance();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Department Performance</h2>
        <p className="text-sm text-gray-500 mt-1">Read-only operational metrics</p>
      </div>

      {/* Top row: conversion rate + orders per month table */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Conversion rate */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#009FCE]/10 p-2.5 rounded-lg">
              <TrendingUp size={20} className="text-[#009FCE]" />
            </div>
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Conversion Rate</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">{perf.conversionRate}%</p>
          <p className="text-xs text-gray-500 mt-1">
            {perf.converted} approved/converted of {perf.totalQuotations} total quotations
          </p>
        </div>

        {/* Orders per month (last 6) */}
        <div className="sm:col-span-2 bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-2.5 rounded-lg">
              <ShoppingCart size={20} className="text-indigo-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Orders per Month</p>
          </div>
          {perf.ordersPerMonth.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No order data yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Month</th>
                    <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {perf.ordersPerMonth.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="py-2 pr-4 text-gray-700">{row.month}</td>
                      <td className="py-2 text-right font-semibold text-gray-900">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Technician completion table */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-5 border-b flex items-center gap-3">
          <div className="bg-teal-100 p-2.5 rounded-lg">
            <Award size={20} className="text-teal-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Technician Completions</h3>
            <p className="text-xs text-gray-500">Jobs completed or verified per technician</p>
          </div>
        </div>

        {perf.technicianPerformance.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No completed jobs yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Technician</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Completed Jobs</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {perf.technicianPerformance
                  .sort((a, b) => b.completedJobs - a.completedJobs)
                  .map((row) => (
                    <tr key={row.technicianId} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{row.name}</td>
                      <td className="px-6 py-3 text-sm font-bold text-right text-[#009FCE]">{row.completedJobs}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
