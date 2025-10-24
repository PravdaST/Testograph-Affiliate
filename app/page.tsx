import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, TrendingUp, Users, Zap, Quote } from 'lucide-react'

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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Печели до <span className="text-primary">15%</span> комисионна промотирайки качествени health supplements
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Присъедини се към <strong>500+ успешни афилиейти</strong>, които вече печелят <strong>стабилни месечни приходи</strong> с Testograph
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Афилиейти</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-2xl md:text-3xl font-bold text-primary">€25K+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Изплатени</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </div>

        <Link href="/register">
          <Button size="lg" className="text-lg px-8 py-6">
            Кандидатствай за Афилиейт (5 мин) →
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Одобряваме само 30% от кандидатите · Отговор до 24 часа
        </p>
      </section>

      {/* Commission Tiers */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Нива на Комисионни</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl font-bold text-muted-foreground">5%</div>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Стартираш с основите и учиш занаята</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Базова 5% комисионна от всяка продажба</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Пълен достъп до 60+ маркетинг материала</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real-time dashboard за tracking на продажби</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Email поддръжка (отговор до 24 часа)</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                След първите 5 продажби → автоматичен ъпгрейд на Pro
              </div>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="border-2 border-primary text-center relative scale-105 shadow-2xl hover:shadow-3xl transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              Най-Популярен
            </div>
            <CardHeader>
              <div className="text-5xl font-bold text-primary">10%</div>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>Удвоена комисионна за активни промотъри</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Удвоена</strong> 10% комисионна</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Персонализирани QR кодове за всеки продукт</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Приоритетна поддръжка (отговор до 4 часа)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ранен достъп до нови продукти</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                Средно €375-500/месец при 15-20 продажби
              </div>
            </CardContent>
          </Card>

          {/* Elite */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl font-bold text-primary">15%</div>
              <CardTitle>Elite</CardTitle>
              <CardDescription>Топ 10% афилиейти с 20+ месечни продажби</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Най-висока</strong> 15% комисионна</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ексклузивни промоции и discount codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Персонален account manager (WhatsApp/Telegram)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Участие в създаването на нови продукти</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                Топ афилиейтите печелят €1,500-3,000/месец
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-muted/20">
        <h3 className="text-3xl font-bold text-center mb-4">Истории на Успешни Афилиейти</h3>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Реални резултати от реални хора, които вече печелят с Testograph
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  И
                </div>
                <div>
                  <CardTitle className="text-lg">Иван М.</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">Elite Affiliate</Badge>
                    <span className="text-xs text-muted-foreground">Instagram · 45K followers</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "За 6 месеца направих <strong className="text-foreground">43 продажби</strong> и спечелих <strong className="text-foreground text-primary">€1,280 комисионни</strong>. Материалите са супер качествени и аудиторията ми харесва продуктите. Промотирам TestoUP в stories и резултатите са страхотни!"
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold">43 продажби</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">€</span>
                  <span className="font-semibold text-primary">1,280</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  М
                </div>
                <div>
                  <CardTitle className="text-lg">Мария Д.</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Pro Affiliate</Badge>
                    <span className="text-xs text-muted-foreground">TikTok · 12K followers</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "Започнах като Starter преди 3 месеца и вече съм на Pro ниво! Правя <strong className="text-foreground">15-18 продажби месечно</strong>, което е около <strong className="text-foreground text-primary">€400-450</strong>. Харесвам че екипът е много отзивчив и винаги ми помагат с въпроси."
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold">~17 продажби/месец</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">€</span>
                  <span className="font-semibold text-primary">425</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  Г
                </div>
                <div>
                  <CardTitle className="text-lg">Георги С.</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">Elite Affiliate</Badge>
                    <span className="text-xs text-muted-foreground">Blog · 25K visits/month</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "Имам health & fitness блог и Testograph е перфектният партньор. За последните 4 месеца съм генерирал <strong className="text-foreground">€2,100+ комисионни</strong>. Качеството на продуктите е high-level и това се усеща."
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold">€525/месец avg</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">€</span>
                  <span className="font-semibold text-primary">2,100+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  Д
                </div>
                <div>
                  <CardTitle className="text-lg">Десислава Г.</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Pro Affiliate</Badge>
                    <span className="text-xs text-muted-foreground">Facebook · 8K followers</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "Като майка на 2 деца търсех начин да работя от вкъщи. С Testograph правя <strong className="text-foreground">10-12 продажби месечно</strong>, което е <strong className="text-foreground text-primary">~€300 extra income</strong>. Супер съм благодарна за възможността!"
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold">~11 продажби/месец</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">€</span>
                  <span className="font-semibold text-primary">300</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Присъедини се към <strong className="text-foreground">500+ афилиейти</strong>, които вече печелят
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-4">
              Искам да съм следващият →
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Защо Testograph Афилиейт?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Спечели €2,000+ на месец от вкъщи</h4>
            <p className="text-muted-foreground text-sm">
              Средният Pro афилиейт прави 15-20 продажби месечно. При AOV €250 и 10% комисионна, това е <strong className="text-foreground">€375-500/месец</strong>. А топ афилиейтите правят 40+ продажби и печелят <strong className="text-foreground">€1,500-3,000!</strong>
            </p>
          </div>
          <div className="text-center p-6 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">60+ Готови Маркетинг Материала</h4>
            <p className="text-muted-foreground text-sm">
              Не губи време с графики! Получаваш професионални <strong className="text-foreground">креативи, stories templates, reels videos, копирайт примери</strong> и готови текстове. Само copy-paste и промотирай!
            </p>
          </div>
          <div className="text-center p-6 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Персонална Поддръжка</h4>
            <p className="text-muted-foreground text-sm">
              Екипът ни е винаги на линия - <strong className="text-foreground">email отговор до 24 часа</strong>, Pro афилиейти получават приоритетна поддръжка (4 часа), а Elite имат <strong className="text-foreground">личен account manager</strong> в WhatsApp/Telegram.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Info Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Как работят изплащанията?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="text-3xl">⏱️</div>
                  Месечни изплащания
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">Всяка спечелена комисионна се изплаща автоматично <strong className="text-foreground">до 5-то число на месеца</strong>.</p>
                <p>След потвърждаване на поръчката (14 дни), комисионната е твоя!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="text-3xl">💳</div>
                  Гъвкави методи
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">Избираш как да получиш парите си:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Банков превод (IBAN)</li>
                  <li>PayPal</li>
                  <li>Revolut</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="text-3xl">💰</div>
                  Минимум €50
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">Минимална сума за изплащане е <strong className="text-foreground">€50</strong>.</p>
                <p>Ако не достигнеш до края на месеца, сумата се прехвърля за следващия.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Стани следващият успешен Testograph афилиейт</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Кандидатствай сега и получи отговор до 24 часа
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Кандидатствай за Афилиейт (5 мин) →
              </Button>
            </Link>
            <p className="text-sm mt-4 text-primary-foreground/60">
              Одобряваме само 30% от кандидатите. Бъди сигурен, че си мотивиран!
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
