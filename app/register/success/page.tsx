'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Mail, Home, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12">
      <div className="container max-w-3xl px-4">
        {/* Success Card */}
        <Card className="text-center border-2 border-green-500/20 shadow-lg">
          <CardHeader className="pb-8">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl md:text-4xl mb-2">
              🎉 Заявката е подадена успешно!
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Благодарим за интереса! Направихте първата стъпка към успешна афилиейт кариера.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pb-8">
            {/* Timeline / Next Steps */}
            <div className="bg-muted/50 rounded-lg p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Какво следва?</h3>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">Готово ✓</Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Заявката е получена</h4>
                    <p className="text-sm text-muted-foreground">
                      Твоята заявка вече е в нашата система и ще бъде прегледана от екипа.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-border mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <Badge variant="outline" className="text-xs">До 24 часа</Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Преглед на заявката</h4>
                    <p className="text-sm text-muted-foreground">
                      Ще получиш email с резултата - одобрение или допълнителни въпроси. Проверявай inbox-а си!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-muted-foreground font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">При одобрение</Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Добре дошъл в екипа! 🎊</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ще получиш твоя уникален <strong>промо код</strong>, достъп до <strong>dashboard</strong> и <strong>60+ маркетинг материала</strong>. Можеш да започнеш да печелиш веднага!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button size="lg" className="w-full text-base">
                  <Home className="h-5 w-5 mr-2" />
                  Разгледай програмата отново
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Help Section */}
            <div className="pt-6 border-t">
              <Mail className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Имаш въпроси в междувременно?<br />
                Пиши ни на{' '}
                <a href="mailto:affiliates@testograph.com" className="text-primary hover:underline font-semibold">
                  affiliates@testograph.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="text-sm">
                <p className="font-semibold mb-1">Pro съвет:</p>
                <p className="text-muted-foreground">
                  Докато чакаш одобрение, подготви си аудиторията! Споменай че скоро ще имаш специална оферта за тях. Това ще увеличи engagement-а когато стартираш.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
