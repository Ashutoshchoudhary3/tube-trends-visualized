import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/data/youtubers';

interface IncomeData {
  youtube: number;
  sponsorships: number;
  merchandise: number;
  other: number;
}

interface IncomeChartProps {
  data: IncomeData;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--info))',
  'hsl(var(--success))',
  'hsl(var(--warning))'
];

export function IncomeChart({ data }: IncomeChartProps) {
  const pieData = [
    { name: 'YouTube Ad Revenue', value: data.youtube, color: COLORS[0] },
    { name: 'Sponsorships', value: data.sponsorships, color: COLORS[1] },
    { name: 'Merchandise', value: data.merchandise, color: COLORS[2] },
    { name: 'Other Sources', value: data.other, color: COLORS[3] }
  ];

  const barData = pieData.map(item => ({
    name: item.name.replace(' Revenue', '').replace(' Sources', ''),
    value: item.value
  }));

  const totalIncome = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-6">
      {/* Total Income Display */}
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">Monthly Income Breakdown</h4>
        <div className="text-3xl font-bold gradient-text">{formatCurrency(totalIncome)}</div>
        <p className="text-muted-foreground">Total Monthly Revenue</p>
      </div>

      {/* Pie Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Monthly Income']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Monthly Income']}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income Sources List */}
      <div className="grid grid-cols-2 gap-4">
        {pieData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="font-medium">{formatCurrency(item.value)}</div>
              <div className="text-sm text-muted-foreground">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}