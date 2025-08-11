import { Card } from "@/components/ui/card";
import { youtuberData, formatNumber } from "@/data/youtubers";

export function HeroStats() {
  const totalSubscribers = youtuberData.reduce((sum, creator) => sum + creator.subscribers, 0);
  const totalViews = youtuberData.reduce((sum, creator) => sum + creator.views, 0);
  const totalVideos = youtuberData.reduce((sum, creator) => sum + creator.videos, 0);
  const totalMonthlyIncome = youtuberData.reduce((sum, creator) => 
    sum + creator.monthlyIncome.youtube + creator.monthlyIncome.sponsorships + 
    creator.monthlyIncome.merchandise + creator.monthlyIncome.other, 0);

  const stats = [
    { label: "Total Subscribers", value: formatNumber(totalSubscribers), icon: "👥" },
    { label: "Total Views", value: formatNumber(totalViews), icon: "👀" },
    { label: "Total Videos", value: formatNumber(totalVideos), icon: "🎬" },
    { label: "Monthly Revenue", value: `$${formatNumber(totalMonthlyIncome)}`, icon: "💰" }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6">
            YouTube <span className="gradient-text">Analytics</span> Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the data behind the world's most successful YouTube creators. 
            Track their growth, revenue streams, and performance metrics across different time periods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="bg-gradient-card border-border hover-lift p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}