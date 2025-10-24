'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Home } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12">
      <div className="container max-w-2xl px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-3xl">Заявката е подадена успешно!</CardTitle>
            <CardDescription className="text-base mt-2">
              Благодарим ти за интереса към Testograph партньорската програма
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-muted rounded-lg space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Какво следва?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✅ Твоята заявка е получена и ще бъде прегледана от нашия екип</li>
                    <li>⏰ Ще получиш отговор на посочения email в рамките на 24-48 часа</li>
                    <li>🎉 При одобрение ще получиш твоя уникален промо код и достъп до dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/" className="block">
                <Button variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Обратно към началната страница
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Имаш въпроси? Свържи се с нас на{' '}
                <a href="mailto:affiliates@testograph.com" className="text-primary hover:underline">
                  affiliates@testograph.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
