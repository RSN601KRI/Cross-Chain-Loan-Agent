
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Database, Link, Wallet } from "lucide-react";
import { cn } from '@/lib/utils';

const Header = () => {
  const [activeNetwork, setActiveNetwork] = useState('All Networks');
  
  const networks = [
    { name: 'All Networks', color: 'bg-purple-500' },
    { name: 'Ethereum', color: 'bg-defi-ethereum' },
    { name: 'Polygon', color: 'bg-defi-polygon' },
    { name: 'Arbitrum', color: 'bg-defi-arbitrum' },
    { name: 'Optimism', color: 'bg-defi-optimism' },
    { name: 'Avalanche', color: 'bg-defi-avalanche' },
  ];

  return (
    <header className="w-full py-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 glass-effect">
      <div className="flex items-center gap-2">
        <Link className="h-6 w-6 text-purple-DEFAULT animate-pulse-glow" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-DEFAULT to-purple-dark">
          Cross-Chain Loan Agent
        </h1>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          {networks.map((network) => (
            <Button
              key={network.name}
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full text-sm",
                activeNetwork === network.name && "bg-muted"
              )}
              onClick={() => setActiveNetwork(network.name)}
            >
              <span className={cn("w-2 h-2 rounded-full mr-2", network.color)}></span>
              {network.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-1">
            <Database className="h-4 w-4" />
            <span>Connect Data</span>
          </Button>
          <Button variant="default" size="sm" className="gap-1">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
