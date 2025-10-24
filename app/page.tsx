import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, TrendingUp, Users, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Testograph</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Вход</Button>
            </Link>
            <Link href="/register">
              <Button>Кандидатствай</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Присъедини се към <span className="text-primary">Testograph</span> Партньорската Програма
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Печели комисионни от <strong>5% до 15%</strong> като промотираш quality supplements и дигитални health продукти
        </p>
        <Link href="/register">
          <Button size="lg" className="text-lg px-8 py-6">
            Започни Сега
          </Button>
        </Link>
      </section>

      {/* Commission Tiers */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Нива на Комисионни</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl font-bold text-muted-foreground">5%</div>
              <CardTitle>Starter</CardTitle>
              <CardDescription>За начинаещи афилиейти</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Базово ниво комисионна
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Достъп до всички материали
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Dashboard за tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="border-primary text-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              Популярен
            </div>
            <CardHeader>
              <div className="text-4xl font-bold text-primary">10%</div>
              <CardTitle>Pro</CardTitle>
              <CardDescription>За опитни промотъри</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Удвоена комисионна
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Персонални QR кодове
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Приоритетна поддръжка
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Elite */}
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl font-bold text-primary">15%</div>
              <CardTitle>Elite</CardTitle>
              <CardDescription>За top performers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Най-висока комисионна
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Ексклузивни промоции
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Dedicated account manager
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Защо Testograph?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Висок Потенциал за Печалба</h4>
            <p className="text-muted-foreground">
              Quality продукти с AOV 150-350 лв. Голяма възможност за приходи.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Готови Материали</h4>
            <p className="text-muted-foreground">
              Креативи, текстове, видеа и гайдове за успешна промоция.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Dedicated Support</h4>
            <p className="text-muted-foreground">
              Екипът ни е винаги на разположение за въпроси и помощ.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Готов да започнеш?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Кандидатствай сега и стартирай своя афилиейт бизнес още днес
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Кандидатствай Сега
              </Button>
            </Link>
            <p className="text-sm mt-4 text-primary-foreground/60">
              Отговаряш на 5 кратки въпроса и заявката ти е готова
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Testograph. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  )
}
