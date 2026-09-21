import { useState, useRef, useEffect } from "react";
import { useAskBnakAi } from "@workspace/api-client-react";
import type { BnakAiQuestionLanguage, BnakAiAnswer } from "@workspace/api-client-react";
import { Bot, Send, User, AlertCircle, ShieldAlert, BadgeCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const SAMPLE_PROMPTS = [
  "How do I register a business name in Kenya?",
  "Nifanyeje kupata leseni ya biashara?",
  "What taxes do I need to pay for a small retail shop?",
  "Je, naweza kupata mkopo wa biashara wapi?"
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  data?: BnakAiAnswer;
  isError?: boolean;
};

export default function AskBnak() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Jambo! I am the BNAK AI Business Assistant. Ask me questions about starting, managing, or growing a business in Kenya. I can help in English or Kiswahili."
    }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<BnakAiQuestionLanguage>("English");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const askMutation = useAskBnakAi();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, askMutation.isPending]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || askMutation.isPending) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    askMutation.mutate(
      { data: { question: currentInput, language } },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: "assistant", content: data.answer, data }
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: "assistant", content: "Sorry, I'm having trouble connecting to the BNAK knowledge base right now. Please try again in a moment.", isError: true }
          ]);
        }
      }
    );
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    // Optionally focus the input or auto-submit
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <div className="bg-foreground text-background py-8 flag-border-bottom relative overflow-hidden shrink-0">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <div className="app-shell relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <Badge className="bg-primary text-white border-0 font-bold" data-testid="badge-ask-bnak">Ask BNAK AI</Badge>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Business Assistant</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/60 font-medium">Language / Lugha:</span>
            <Select value={language} onValueChange={(v) => setLanguage(v as BnakAiQuestionLanguage)}>
              <SelectTrigger className="w-[140px] bg-background/10 border-white/20 text-white" data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Kiswahili">Kiswahili</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="app-shell flex-1 flex flex-col max-w-4xl w-full mx-auto py-6">
        
        {/* Trust Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3 mb-6 shrink-0">
          <ShieldAlert className="w-5 h-5 text-primary mt-0.5" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">Important:</strong> This assistant provides guidance based on public SME knowledge. It does not perform live web verification or replace official government advice. Always verify crucial details with KRA, eCitizen, or a certified professional.
          </p>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col border-border shadow-sm overflow-hidden min-h-[500px]" data-testid="chat-container">
          <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`} data-testid={`message-${msg.role}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-white" : "bg-secondary/10 text-secondary"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    <div className={`px-4 py-3 rounded-2xl ${msg.role === "user" ? "bg-primary text-white rounded-tr-sm" : msg.isError ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-sm" : "bg-muted rounded-tl-sm"}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    
                    {/* Rich Response Handling */}
                    {msg.data && (
                      <div className="flex flex-col gap-2 w-full mt-1">
                        {/* Guidance Tag */}
                        {msg.data.guidanceType === 'verified-information' && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full self-start">
                            <BadgeCheck className="w-3.5 h-3.5" /> Verified Guidance
                          </div>
                        )}
                        {msg.data.guidanceType === 'confirm-with-institution' && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full self-start">
                            <AlertCircle className="w-3.5 h-3.5" /> Confirm with Institution
                          </div>
                        )}
                        {msg.data.guidanceType === 'general-guidance' && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 border border-border px-2.5 py-1 rounded-full self-start">
                            <Bot className="w-3.5 h-3.5" /> General Guidance
                          </div>
                        )}

                        {/* Confirmation Note */}
                        {msg.data.confirmationNote && (
                          <p className="text-[11px] text-muted-foreground italic border-l-2 border-primary/30 pl-2 py-0.5">
                            {msg.data.confirmationNote}
                          </p>
                        )}
                        
                        {/* Actions */}
                        {msg.data.suggestedActions && msg.data.suggestedActions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {msg.data.suggestedActions.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => handlePromptClick(action)}
                                className="text-xs bg-background border hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-colors text-left"
                                data-testid={`button-suggested-action-${i}`}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {askMutation.isPending && (
                <div className="flex gap-4 flex-row">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-background border-t border-border shrink-0">
            {messages.length <= 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handlePromptClick(p)}
                    className="text-xs bg-muted hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 text-muted-foreground font-medium px-3 py-1.5 rounded-full transition-colors"
                    data-testid={`button-sample-prompt-${i}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === "English" ? "Ask a business question..." : "Uliza swali la biashara..."}
                disabled={askMutation.isPending}
                className="flex-1 rounded-xl bg-muted/50 border-border focus-visible:ring-primary/20"
                data-testid="input-chat-message"
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || askMutation.isPending} 
                className="rounded-xl w-12 px-0 shrink-0"
                data-testid="button-chat-submit"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
