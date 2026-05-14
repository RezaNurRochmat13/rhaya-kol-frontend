import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { EngagementLog } from '../types/dashboard';

interface Props {
  logs: EngagementLog[];
}

export const EngagementChart = ({ logs }: Props) => {
  // Format data agar sesuai format Recharts
  const data = logs.map(log => ({
    date: new Date(log.capturedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    Likes: log.likes,
    Comments: log.comments,
    Shares: log.shares,
  }));

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">Engagement Trend (Last 7 Days)</h3>
      <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ paddingBottom: '8px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
          />
          <Legend iconType="circle" />
          <Line type="monotone" dataKey="Likes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Comments" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Shares" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};
