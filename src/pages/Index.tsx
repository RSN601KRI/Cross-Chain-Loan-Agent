
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import LoanQueryForm from "@/components/LoanQueryForm";
import LoanResultsDisplay from "@/components/LoanResultsDisplay";
import NetworkStatsBar from "@/components/NetworkStatsBar";
import AgentInteractionPanel from "@/components/AgentInteractionPanel";
import { mockLoanOffers, mockAgentResponse } from "@/data/mockLoanData";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(mockLoanOffers.slice(0, 0));
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const handleQuerySubmit = (queryText: string) => {
    setIsLoading(true);
    setQuery(queryText);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockLoanOffers);
      setShowResults(true);
      setIsLoading(false);
      toast({
        title: "Loan options found",
        description: "We've found 6 loan options across different networks",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-4 md:px-6 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          <NetworkStatsBar />
          
          <Tabs 
            defaultValue="search" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-6">
              <TabsTrigger value="search">Search Query</TabsTrigger>
              <TabsTrigger value="chat">Chat with Agent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <LoanQueryForm 
                    onSubmit={handleQuerySubmit} 
                    isLoading={isLoading} 
                  />
                </div>
                <div className="lg:col-span-3">
                  {showResults ? (
                    <LoanResultsDisplay 
                      query={query} 
                      results={results}
                      summary={mockAgentResponse.summary} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-8 rounded-lg bg-gradient-radial">
                        <div className="w-16 h-16 mx-auto mb-4">
                          <div className="w-full h-full rounded-full border-4 border-t-purple-DEFAULT border-r-transparent border-b-purple-DEFAULT border-l-transparent animate-spin"></div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">AI Loan Agent Ready</h3>
                        <p className="text-muted-foreground">
                          Ask about loan options across different blockchain networks
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="h-[700px]">
              <AgentInteractionPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>Powered by ASI:One and Fetch.ai | Cross-Chain Loan Agent © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
