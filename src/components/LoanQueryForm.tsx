
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

type LoanQueryFormProps = {
  onSubmit: (query: string) => void;
  isLoading: boolean;
};

const LoanQueryForm = ({ onSubmit, isLoading }: LoanQueryFormProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  const exampleQueries = [
    "What's the best ETH loan with low collateral?",
    "Find me stablecoin loans below 5% APR",
    "Compare Ethereum vs Polygon loan options",
    "Show loans with flexible repayment terms",
  ];

  return (
    <Card className="w-full glass-card">
      <CardHeader>
        <CardTitle className="text-xl text-purple-DEFAULT flex items-center gap-2">
          <Server className="h-5 w-5" />
          <span>Loan Query Agent</span>
        </CardTitle>
        <CardDescription>
          Ask about loan options across different blockchain networks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Ask a question like: What's the best ETH loan with low collateral?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 h-auto"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Searching for offers...' : 'Find Loan Options'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setQuery(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoanQueryForm;
