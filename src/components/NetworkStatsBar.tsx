
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const NetworkStatsBar = () => {
  const stats = [
    { network: "Ethereum", apr: "3.2%", tvl: "$45.2B", protocols: 28 },
    { network: "Polygon", apr: "5.8%", tvl: "$12.5B", protocols: 36 },
    { network: "Arbitrum", apr: "4.1%", tvl: "$8.7B", protocols: 22 },
    { network: "Optimism", apr: "3.9%", tvl: "$5.3B", protocols: 18 },
    { network: "Avalanche", apr: "6.2%", tvl: "$7.8B", protocols: 25 },
  ];

  return (
    <Card className="w-full glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {stats.map((stat, index) => (
            <div key={stat.network} className="flex items-center">
              {index > 0 && <Separator orientation="vertical" className="mx-4 h-10" />}
              <div className="flex flex-col items-center px-2">
                <span className="text-sm font-medium">{stat.network}</span>
                <div className="flex gap-4 mt-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">Avg APR</span>
                    <span className="text-sm font-semibold">{stat.apr}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">TVL</span>
                    <span className="text-sm font-semibold">{stat.tvl}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">Protocols</span>
                    <span className="text-sm font-semibold">{stat.protocols}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatsBar;
