import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/data/youtubers';

interface GrowthData {
  period: string;
  subscribers: number[];
  views: number[];
  income: number[];
  dates: string[];
}

interface GrowthChartProps {
  data: GrowthData;
}

export function GrowthChart({ data }: GrowthChartProps) {
  const chartData = data.dates.map((date, index) => ({
    date,
    subscribers: data.subscribers[index],
    views: data.views[index],
    income: data.income[index]
  }));

  return (
    <div className="space-y-6">
      {/* Subscribers Growth */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-center">Subscriber Growth - {data.period}</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [formatNumber(value), 'Subscribers']}
              />
              <Line 
                type="monotone" 
                dataKey="subscribers" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Views Growth */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-center">View Growth - {data.period}</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [formatNumber(value), 'Views']}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="hsl(var(--info))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--info))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--info))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}