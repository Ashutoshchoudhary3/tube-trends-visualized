import { HeroStats } from "@/components/HeroStats";
import { YouTuberCard } from "@/components/YouTuberCard";
import { youtuberData } from "@/data/youtubers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroStats />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Top YouTube <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the analytics of the world's most successful YouTubers. 
            Explore their growth patterns, revenue streams, and performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {youtuberData.map((creator, index) => (
            <div 
              key={creator.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <YouTuberCard data={creator} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-card border border-border rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">About This Dashboard</h3>
            <p className="text-muted-foreground leading-relaxed">
              This analytics dashboard showcases comprehensive data about top YouTube creators, 
              including subscriber growth over multiple timeframes (10 years to daily), 
              revenue breakdowns from various sources, and detailed performance metrics. 
              All data is presented with interactive charts and real-time animations to 
              provide insights into the YouTube creator economy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
