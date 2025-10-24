'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Check, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import type { QuizAnswers, ExperienceLevel, PromotionChannel, AudienceSize, ProductInterest } from '@/types/affiliate';

const TOTAL_STEPS = 5;

// Channel icons/emojis
const channelIcons: Record<PromotionChannel, string> = {
  instagram: '📸',
  facebook: '👥',
  tiktok: '🎵',
  youtube: '▶️',
  blog: '✍️',
  email: '📧',
  telegram: '✈️',
  other: '🌐',
};

// Channel labels
const channelLabels: Record<PromotionChannel, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  blog: 'Blog/Website',
  email: 'Email списък',
  telegram: 'Telegram',
  other: 'Други канали',
};

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Quiz answers
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const [channels, setChannels] = useState<PromotionChannel[]>([]);
  const [audienceSize, setAudienceSize] = useState<AudienceSize>('small');
  const [products, setProducts] = useState<ProductInterest[]>([]);
  const [motivation, setMotivation] = useState('');

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleChannelToggle = (channel: PromotionChannel) => {
    setChannels(prev =>
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleProductToggle = (product: ProductInterest) => {
    setProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return fullName.trim() && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      case 2:
        return true; // Experience always has default value
      case 3:
        return channels.length > 0;
      case 4:
        return true; // Audience size always has default value
      case 5:
        return products.length > 0 && motivation.trim().length >= 20;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const quizData: QuizAnswers = {
        experience,
        channels,
        audienceSize,
        products,
        motivation,
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone: phone || null,
          quiz_data: quizData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - redirect to thank you page
        toast.success('Заявката е изпратена успешно!');
        router.push('/register/success');
      } else {
        toast.error(data.error || 'Грешка при подаване на заявката');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Грешка при подаване на заявката. Моля опитай отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <Home className="h-4 w-4 mr-2" />
          Обратно към началната страница
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Присъедини се към Testograph</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Отговори на 5 кратки въпроса и стани партньор
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Стъпка {currentStep} от {TOTAL_STEPS}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Quiz Steps */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Твоите данни'}
              {currentStep === 2 && 'Опит в афилиейт маркетинг'}
              {currentStep === 3 && 'Канали за промоция'}
              {currentStep === 4 && 'Размер на аудиторията'}
              {currentStep === 5 && 'Интереси и мотивация'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Нека започнем с основната информация'}
              {currentStep === 2 && 'Какъв е твоят опит с афилиейт програми?'}
              {currentStep === 3 && 'Къде ще промотираш продуктите?'}
              {currentStep === 4 && 'Колко голяма е твоята аудитория?'}
              {currentStep === 5 && 'Кои продукти те интересуват и защо?'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Име и фамилия *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivan@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон (опционално)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+359 888 123 456"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Experience */}
            {currentStep === 2 && (
              <RadioGroup value={experience} onValueChange={(v) => setExperience(v as ExperienceLevel)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="flex-1 cursor-pointer">
                      <div className="font-semibold">👔 Професионален афилиейт</div>
                      <div className="text-sm text-muted-foreground">
                        Имам опит с multiple афилиейт програми
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="hobby" id="hobby" />
                    <Label htmlFor="hobby" className="flex-1 cursor-pointer">
                      <div className="font-semibold">🎯 Правя го като хоби</div>
                      <div className="text-sm text-muted-foreground">
                        Имам малко опит, експериментирам
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                      <div className="font-semibold">🌱 Започвам сега</div>
                      <div className="text-sm text-muted-foreground">
                        Нямам опит, искам да науча
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {/* Step 3: Channels */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Избери всички канали, които ще използваш (поне един)
                </p>
                {(['instagram', 'facebook', 'tiktok', 'youtube', 'blog', 'email', 'telegram', 'other'] as PromotionChannel[]).map(channel => {
                  const isSelected = channels.includes(channel);
                  return (
                    <div
                      key={channel}
                      onClick={() => handleChannelToggle(channel)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                        </div>
                        <span className="text-2xl">{channelIcons[channel]}</span>
                        <span className="font-medium flex-1">{channelLabels[channel]}</span>
                        {isSelected && (
                          <Badge variant="default" className="text-xs">Избрано</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 4: Audience Size */}
            {currentStep === 4 && (
              <RadioGroup value={audienceSize} onValueChange={(v) => setAudienceSize(v as AudienceSize)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="flex-1 cursor-pointer">
                      <div className="font-semibold">🌱 0-1,000</div>
                      <div className="text-sm text-muted-foreground">Малка аудитория</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="flex-1 cursor-pointer">
                      <div className="font-semibold">📈 1,000-10,000</div>
                      <div className="text-sm text-muted-foreground">Средна аудитория</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large" className="flex-1 cursor-pointer">
                      <div className="font-semibold">🚀 10,000+</div>
                      <div className="text-sm text-muted-foreground">Голяма аудитория</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {/* Step 5: Products & Motivation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Интересуващи продукти (избери поне един)</Label>
                  <div className="space-y-3">
                    {(['testoup', 'bundles', 'all'] as ProductInterest[]).map(product => {
                      const isSelected = products.includes(product);
                      const productInfo = {
                        testoup: { emoji: '💪', label: 'TestoUP', desc: 'Флагман продукт за тестостерон' },
                        bundles: { emoji: '📦', label: 'Product Bundles', desc: 'Комбинирани оферти' },
                        all: { emoji: '🌟', label: 'Всички продукти', desc: 'Целият каталог' },
                      }[product];

                      return (
                        <div
                          key={product}
                          onClick={() => handleProductToggle(product)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-primary/10 border-primary shadow-sm'
                              : 'border-border hover:border-primary/50 hover:bg-accent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground'
                            }`}>
                              {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <span className="text-2xl">{productInfo.emoji}</span>
                            <div className="flex-1">
                              <div className="font-medium">{productInfo.label}</div>
                              <div className="text-xs text-muted-foreground">{productInfo.desc}</div>
                            </div>
                            {isSelected && (
                              <Badge variant="default" className="text-xs">Избрано</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="motivation">
                    Защо искаш да станеш Testograph афилиейт? *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Разкажи ни повече за мотивацията си... (минимум 20 символа)"
                    rows={5}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {motivation.length} / минимум 20 символа
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1 || isSubmitting}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed() || isSubmitting}
                >
                  Напред
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Изпращане...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Подай заявка
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Вече имаш акаунт?{' '}
          <a href="/login" className="text-primary hover:underline">
            Влез тук
          </a>
        </p>
      </div>
    </div>
  );
}
