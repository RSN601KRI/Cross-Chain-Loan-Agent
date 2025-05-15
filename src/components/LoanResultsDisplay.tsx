
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoanComparisonCard, { LoanOffer } from "./LoanComparisonCard";

type LoanResultsDisplayProps = {
  query: string;
  results: LoanOffer[];
  summary?: string;
};

const LoanResultsDisplay = ({ query, results, summary }: LoanResultsDisplayProps) => {
  return (
    <Card className="w-full glass-card">
      <CardHeader>
        <CardTitle className="text-xl">Loan Options</CardTitle>
        <CardDescription className="line-clamp-2">
          Results for: "{query}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        {summary && (
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm">{summary}</p>
          </div>
        )}
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((offer, index) => (
              <LoanComparisonCard 
                key={offer.id} 
                offer={offer} 
                isRecommended={index === 0} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LoanResultsDisplay;
