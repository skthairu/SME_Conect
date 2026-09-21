import { useState } from "react";
import { HeartPulse, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

const QUESTIONS = [
  // Financial Management (Q1, Q2)
  {
    category: "Financial Management",
    question: "How do you separate your personal money from business money?",
    options: [
      { text: "It's all in the same M-Pesa/Bank account", points: 0 },
      { text: "I try to keep mental track, but use one account", points: 5 },
      { text: "I have a separate till/bank account strictly for business", points: 10 }
    ]
  },
  {
    category: "Financial Management",
    question: "Do you know exactly how much profit you made last month?",
    options: [
      { text: "No idea, I just look at cash in hand", points: 0 },
      { text: "I have a rough estimate", points: 5 },
      { text: "Yes, I calculate revenue minus all costs monthly", points: 10 }
    ]
  },
  // Record Keeping (Q3, Q4)
  {
    category: "Record Keeping",
    question: "How do you track your daily sales and expenses?",
    options: [
      { text: "I don't track them daily", points: 0 },
      { text: "I write them down in a notebook", points: 5 },
      { text: "I use a digital app/spreadsheet to record everything", points: 10 }
    ]
  },
  {
    category: "Record Keeping",
    question: "How do you manage customer debts (madeni)?",
    options: [
      { text: "I trust I will remember them", points: 0 },
      { text: "I have a book for debts", points: 5 },
      { text: "I have a strict credit policy and track debts digitally", points: 10 }
    ]
  },
  // Marketing & Customers (Q5, Q6)
  {
    category: "Marketing",
    question: "How do new customers find out about your business?",
    options: [
      { text: "Just people passing by (walk-ins)", points: 0 },
      { text: "Word of mouth / Referrals", points: 5 },
      { text: "I actively market (social media, flyers, promotions)", points: 10 }
    ]
  },
  {
    category: "Marketing",
    question: "Do you keep a record of your regular customers' contacts?",
    options: [
      { text: "No, I just recognize their faces", points: 0 },
      { text: "Some of them are in my phonebook", points: 5 },
      { text: "Yes, I have a database/list and reach out to them", points: 10 }
    ]
  },
  // Digital Presence (Q7, Q8)
  {
    category: "Digital Presence",
    question: "Can customers buy from you or see your products online?",
    options: [
      { text: "No, physical only", points: 0 },
      { text: "I post on WhatsApp status sometimes", points: 5 },
      { text: "Yes, I use social media/e-commerce platforms actively", points: 10 }
    ]
  },
  {
    category: "Digital Presence",
    question: "How do you accept payments?",
    options: [
      { text: "Cash only", points: 0 },
      { text: "Cash and personal M-Pesa", points: 5 },
      { text: "Cash, Till/Paybill, and Bank transfers", points: 10 }
    ]
  },
  // Market Access & Compliance (Q9, Q10)
  {
    category: "Market Access",
    question: "Are your business licenses and permits up to date?",
    options: [
      { text: "No, I operate informally", points: 0 },
      { text: "Some are, some are pending", points: 5 },
      { text: "Yes, fully compliant with county and national laws", points: 10 }
    ]
  },
  {
    category: "Market Access",
    question: "How do you source your inventory/supplies?",
    options: [
      { text: "I buy from whatever middleman is available", points: 0 },
      { text: "I have one or two regular suppliers", points: 5 },
      { text: "I compare multiple suppliers for the best margins", points: 10 }
    ]
  }
];

export default function BusinessHealth() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = start screen
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const calculateResults = () => {
    let total = 0;
    const categories: Record<string, { earned: number, max: number }> = {};
    
    answers.forEach((ansIndex, qIndex) => {
      const q = QUESTIONS[qIndex];
      const pts = q.options[ansIndex]?.points || 0;
      total += pts;
      
      if (!categories[q.category]) {
        categories[q.category] = { earned: 0, max: 0 };
      }
      categories[q.category].earned += pts;
      categories[q.category].max += 10;
    });

    return { total, maxTotal: QUESTIONS.length * 10, categories };
  };

  if (isComplete) {
    const { total, maxTotal, categories } = calculateResults();
    const percentage = Math.round((total / maxTotal) * 100);
    
    let status = "Needs Attention";
    let statusColor = "text-destructive";
    let statusBg = "bg-destructive/10";
    let icon = AlertTriangle;
    
    if (percentage >= 80) {
      status = "Healthy & Growing";
      statusColor = "text-emerald-600";
      statusBg = "bg-emerald-100";
      icon = TrendingUp;
    } else if (percentage >= 50) {
      status = "Stable (Room to Grow)";
      statusColor = "text-amber-600";
      statusBg = "bg-amber-100";
      icon = Activity;
    }

    const Icon = icon;

    return (
      <div className="min-h-screen bg-muted/20 py-12">
        <div className="app-shell max-w-3xl">
          <Card className="border-border shadow-xl overflow-hidden" data-testid="health-results-card">
            <div className={`p-8 md:p-12 text-center ${statusBg}`}>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Icon className={`w-10 h-10 ${statusColor}`} />
              </div>
              <h1 className="text-3xl font-black mb-2">Overall Score: {percentage}%</h1>
              <Badge className={`px-4 py-1.5 text-sm font-bold border-0 bg-white ${statusColor}`} data-testid="health-status-badge">
                {status}
              </Badge>
            </div>
            
            <CardContent className="p-6 md:p-10">
              <h3 className="text-lg font-bold mb-6 border-b pb-2">Category Breakdown</h3>
              <div className="space-y-6">
                {Object.entries(categories).map(([cat, data]) => {
                  const catPercent = Math.round((data.earned / data.max) * 100);
                  return (
                    <div key={cat} data-testid={`health-category-${cat.toLowerCase()}`}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-semibold text-sm">{cat}</span>
                        <span className="text-sm font-bold">{catPercent}%</span>
                      </div>
                      <Progress value={catPercent} className="h-2" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h4 className="font-bold text-primary mb-2">Next Steps</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your score, BNAK offers specific programmes to help you improve your weak areas.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild data-testid="button-health-money-centre">
                    <Link href="/money-centre">Use Money Centre Tools</Link>
                  </Button>
                  <Button asChild variant="outline" data-testid="button-health-services">
                    <Link href="/services">View BNAK Training</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <div className="bg-foreground text-background py-8 flag-border-bottom shrink-0">
        <div className="app-shell flex items-center gap-3">
          <div className="bg-rose-500/20 p-2 rounded-lg">
            <HeartPulse className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Business Health Check</h1>
            <p className="text-sm text-white/60">A 2-minute diagnostic for your biashara.</p>
          </div>
        </div>
      </div>

      <div className="app-shell flex-1 flex flex-col py-8 md:py-12 max-w-3xl w-full mx-auto">
        {currentStep === -1 ? (
          <Card className="border-border shadow-md" data-testid="health-start-screen">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600 mb-2">
                <Activity className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black">How healthy is your business?</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Take this confidential 10-question assessment to uncover blind spots in your finances, marketing, and record keeping.
              </p>
              <div className="pt-4">
                <Button size="lg" onClick={() => setCurrentStep(0)} className="text-lg px-8 py-6 rounded-xl font-bold shadow-lg" data-testid="button-health-start">
                  Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-1 flex flex-col" data-testid={`health-question-${currentStep}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <span className="text-sm font-bold text-primary">
                {QUESTIONS[currentStep].category}
              </span>
            </div>
            
            <Progress value={((currentStep) / QUESTIONS.length) * 100} className="h-2 mb-8" />

            <Card className="border-border shadow-sm flex-1">
              <CardContent className="p-6 md:p-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-8 leading-snug">
                  {QUESTIONS[currentStep].question}
                </h3>
                
                <div className="space-y-3 flex-1">
                  {QUESTIONS[currentStep].options.map((opt, idx) => {
                    const isSelected = answers[currentStep] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/30 bg-card hover:bg-muted/30"
                        }`}
                        data-testid={`button-health-option-${idx}`}
                      >
                        <span className={`text-sm md:text-base font-medium ${isSelected ? "text-primary font-bold" : "text-foreground"}`}>
                          {opt.text}
                        </span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 ml-4" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} data-testid="button-health-prev">
                    <ChevronLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={answers[currentStep] === -1}
                    className="font-bold"
                    data-testid="button-health-next"
                  >
                    {currentStep === QUESTIONS.length - 1 ? "View Results" : "Next"} 
                    {currentStep !== QUESTIONS.length - 1 && <ChevronRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}