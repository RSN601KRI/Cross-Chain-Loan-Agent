
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
};

const AgentInteractionPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: 'I am your Cross-Chain Loan Agent powered by ASI1-mini. I can help you find the best loan options across different blockchain networks. Ask me about loan rates, collateral requirements, or specific protocols.',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate agent response after delay
    setTimeout(() => {
      const responses = [
        "I've analyzed several lending protocols across chains. Based on your request, Aave on Ethereum offers the best rates for your needs with flexible collateral options.",
        "Let me search for low-collateral ETH loans... The best option right now is Compound on Ethereum with 130% collateral ratio and 3.2% APR. Would you like more details?",
        "Looking at stablecoin options, the most competitive rates are on Arbitrum, with GMX offering 4.1% APR and lowest gas fees compared to Ethereum alternatives.",
        "Based on my analysis, Polygon has the most cost-effective loan options for small borrowers due to lower gas fees and similar interest rates to Ethereum."
      ];
      
      const agentMessage = {
        id: Date.now().toString(),
        role: 'agent' as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <Card className="w-full glass-card flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="relative">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" alt="ASI:One" />
              <AvatarFallback className="bg-purple-DEFAULT text-xs">AI</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          ASI:One Loan Agent
        </CardTitle>
        <CardDescription>
          Powered by ASI1-mini LLM
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-2 max-w-[80%]",
                  message.role === 'user' ? "ml-auto" : ""
                )}
              >
                {message.role === 'agent' && (
                  <Avatar className="h-6 w-6 mt-1">
                    <AvatarImage src="/placeholder.svg" alt="ASI:One" />
                    <AvatarFallback className="bg-purple-DEFAULT text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    message.role === 'user'
                      ? "bg-purple-DEFAULT text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <Avatar className="h-6 w-6 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="ASI:One" />
                  <AvatarFallback className="bg-purple-DEFAULT text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="mt-4 flex gap-2">
          <Textarea
            className="min-h-[60px]"
            placeholder="Ask about loan options..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="shrink-0 self-end"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentInteractionPanel;
