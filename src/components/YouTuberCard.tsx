import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YouTuberData, formatNumber, formatCurrency } from "@/data/youtubers";
import { GrowthChart } from "./GrowthChart";
import { IncomeChart } from "./IncomeChart";

interface YouTuberCardProps {
  data: YouTuberData;
}

export function YouTuberCard({ data }: YouTuberCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");
  const [activeTab, setActiveTab] = useState<"growth" | "income">("growth");

  const currentGrowthData = data.growthData.find(d => d.period === selectedPeriod);
  const totalMonthlyIncome = Object.values(data.monthlyIncome).reduce((sum, income) => sum + income, 0);

  const periods = ["10Y", "5Y", "1Y", "1M", "1D"];

  return (
    <Card className="bg-gradient-card border-border hover-lift p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img 
          src={data.avatar} 
          alt={data.name}
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold">{data.name}</h3>
            {data.verified && <span className="text-primary">✓</span>}
          </div>
          <Badge variant="secondary" className="mt-1">{data.category}</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{formatNumber(data.subscribers)}</div>
          <div className="text-sm text-muted-foreground">Subscribers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{formatNumber(data.views)}</div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{formatNumber(data.videos)}</div>
          <div className="text-sm text-muted-foreground">Videos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{formatCurrency(totalMonthlyIncome)}</div>
          <div className="text-sm text-muted-foreground">Monthly Income</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "growth" ? "default" : "secondary"}
          onClick={() => setActiveTab("growth")}
          className="flex-1"
        >
          Growth Analytics
        </Button>
        <Button
          variant={activeTab === "income" ? "default" : "secondary"}
          onClick={() => setActiveTab("income")}
          className="flex-1"
        >
          Income Breakdown
        </Button>
      </div>

      {activeTab === "growth" && (
        <>
          {/* Period Selection */}
          <div className="flex space-x-2 justify-center">
            {periods.map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Growth Chart */}
          {currentGrowthData && (
            <GrowthChart data={currentGrowthData} />
          )}
        </>
      )}

      {activeTab === "income" && (
        <IncomeChart data={data.monthlyIncome} />
      )}
    </Card>
  );
}