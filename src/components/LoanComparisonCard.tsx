
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type LoanOffer = {
  id: string;
  network: {
    name: string;
    color: string;
  };
  protocol: string;
  apr: number;
  minCollateral: number;
  maxAmount: string;
  term: string;
  liquidationThreshold: number;
  riskLevel: "Low" | "Medium" | "High";
  highlights: string[];
};

type LoanComparisonCardProps = {
  offer: LoanOffer;
  isRecommended?: boolean;
};

const LoanComparisonCard = ({ offer, isRecommended = false }: LoanComparisonCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md",
      isRecommended ? "border-2 border-purple-DEFAULT" : "glass-card"
    )}>
      <div className={cn(
        "h-1.5", 
        isRecommended ? "bg-purple-DEFAULT" : `bg-${offer.network.color}`
      )} />
      
      <CardHeader className="relative pb-2">
        {isRecommended && (
          <div className="absolute -top-3 right-3">
            <Badge variant="default" className="bg-purple-DEFAULT">
              <ShieldCheck className="h-3 w-3 mr-1" /> Recommended
            </Badge>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${offer.network.color}`}></span>
            <CardTitle className="text-lg">{offer.protocol}</CardTitle>
          </div>
          <Badge variant="outline">{offer.network.name}</Badge>
        </div>
        <CardDescription>{offer.term} term</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">APR</p>
            <p className="text-2xl font-bold">{offer.apr}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Amount</p>
            <p className="text-2xl font-bold">{offer.maxAmount}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Collateral Requirement</span>
            <span>{offer.minCollateral}%</span>
          </div>
          <Progress value={offer.minCollateral} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Highlights</p>
          <div className="flex flex-wrap gap-1.5">
            {offer.highlights.map((highlight, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Risk:</span>
                <span className={`w-2.5 h-2.5 rounded-full ${getRiskColor(offer.riskLevel)}`}></span>
                <span className="text-sm">{offer.riskLevel}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Liquidation Threshold: {offer.liquidationThreshold}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="default" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default LoanComparisonCard;
