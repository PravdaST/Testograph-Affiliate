# Testograph Affiliate - Implementation Guide

Този документ съдържа детайлни инструкции за завършване на имплементацията на афилиейт системата.

---

## ✅ Завършени Компоненти

- ✅ Database schema (migration-affiliate-system.sql)
- ✅ Next.js project structure
- ✅ Supabase client setup
- ✅ TypeScript types
- ✅ Landing page
- ✅ Tailwind & Shadcn UI setup
- ✅ README с пълна документация

---

## 🔨 Оставащи Задачи

### 1. Shadcn UI Компоненти

Инсталирай необходимите UI компоненти:

```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add progress
npx shadcn@latest add radio-group
npx shadcn@latest add dialog
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add separator
npx shadcn@latest add badge
```

**Забележка**: Sonner (toast) вече е импортиран в layout.tsx

---

### 2. Quiz Registration

#### Файлове за създаване:

**`app/register/page.tsx`** - Quiz регистрационна страница

```tsx
'use client'

import { useState } from 'react'
import { QuizFlow } from '@/components/quiz/QuizFlow'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Кандидатствай за Афилиейт</CardTitle>
          <CardDescription>
            Отговори на 5 кратки въпроса за да кандидатстваш
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuizFlow />
        </CardContent>
      </Card>
    </div>
  )
}
```

**`components/quiz/QuizFlow.tsx`** - Quiz флоу логика

```tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { QuizAnswers, ExperienceLevel, PromotionChannel, AudienceSize, ProductInterest } from '@/types/affiliate'
import { QuizQuestion } from './QuizQuestion'
import { QuizProgress } from './QuizProgress'
import { ContactForm } from './ContactForm'
import { Button } from '@/components/ui/button'

const TOTAL_QUESTIONS = 5

export function QuizFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    channels: [],
    products: [],
  })
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  })

  const handleAnswer = (field: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    // Validate current step before moving forward
    const isValid = validateStep(currentStep)
    if (!isValid) {
      toast.error('Моля отговорете на въпроса преди да продължите')
      return
    }
    if (currentStep < TOTAL_QUESTIONS + 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!answers.experience
      case 2:
        return (answers.channels?.length ?? 0) > 0
      case 3:
        return !!answers.audienceSize
      case 4:
        return (answers.products?.length ?? 0) > 0
      case 5:
        return !!answers.motivation && answers.motivation.length >= 20
      case 6:
        return !!(contactInfo.fullName && contactInfo.email)
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      toast.error('Моля попълнете всички задължителни полета')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactInfo,
          quizAnswers: answers,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Грешка при регистрация')
      }

      toast.success('Заявката е изпратена успешно!')

      // Move to success step
      setCurrentStep(TOTAL_QUESTIONS + 2)
    } catch (error: any) {
      toast.error(error.message || 'Грешка при регистрация')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuizQuestion
            question="Имаш ли опит с продажби в health/fitness сферата?"
            type="single"
            options={[
              { value: 'professional', label: 'Да, професионално (fitness треньор, нутриционист)' },
              { value: 'hobby', label: 'Да, като хоби/passion' },
              { value: 'beginner', label: 'Не, но искам да започна' },
            ]}
            value={answers.experience}
            onChange={(value) => handleAnswer('experience', value as ExperienceLevel)}
          />
        )
      case 2:
        return (
          <QuizQuestion
            question="Къде планираш да промотираш продуктите?"
            type="multiple"
            options={[
              { value: 'social', label: 'Социални мрежи (Instagram, Facebook, TikTok)' },
              { value: 'youtube', label: 'YouTube канал' },
              { value: 'website', label: 'Уебсайт/блог' },
              { value: 'personal', label: 'Лично (в зала, сред приятели)' },
            ]}
            value={answers.channels || []}
            onChange={(value) => handleAnswer('channels', value as PromotionChannel[])}
          />
        )
      case 3:
        return (
          <QuizQuestion
            question="Колко голяма е твоята аудитория?"
            type="single"
            options={[
              { value: '0-1k', label: '0-1000 последователи' },
              { value: '1k-10k', label: '1000-10000' },
              { value: '10k-50k', label: '10000-50000' },
              { value: '50k+', label: '50000+' },
            ]}
            value={answers.audienceSize}
            onChange={(value) => handleAnswer('audienceSize', value as AudienceSize)}
          />
        )
      case 4:
        return (
          <QuizQuestion
            question="Кои продукти те интересуват?"
            type="multiple"
            options={[
              { value: 'testoup', label: 'TestoUP Supplement' },
              { value: 'bundles', label: 'Bundles (App + PRO пакети)' },
              { value: 'all', label: 'Всички продукти' },
            ]}
            value={answers.products || []}
            onChange={(value) => handleAnswer('products', value as ProductInterest[])}
          />
        )
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Защо искаш да станеш афилиейт?</h3>
            <textarea
              className="w-full min-h-[150px] p-3 border rounded-md"
              placeholder="Сподели с нас твоята мотивация... (минимум 20 символа)"
              value={answers.motivation || ''}
              onChange={(e) => handleAnswer('motivation', e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              {answers.motivation?.length || 0} / 20 символа
            </p>
          </div>
        )
      case 6:
        return (
          <ContactForm
            values={contactInfo}
            onChange={setContactInfo}
          />
        )
      case 7:
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Заявката е изпратена!</h3>
            <p className="text-muted-foreground mb-6">
              Благодарим ти за интереса! Ще разгледаме твоята заявка и ще те уведомим до 48 часа.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Обратно към началната страница
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {currentStep <= TOTAL_QUESTIONS + 1 && (
        <QuizProgress currentStep={currentStep} totalSteps={TOTAL_QUESTIONS + 1} />
      )}

      <div className="mt-6">
        {renderStep()}
      </div>

      {currentStep <= TOTAL_QUESTIONS + 1 && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Назад
          </Button>

          {currentStep === TOTAL_QUESTIONS + 1 ? (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Изпращане...' : 'Изпрати Заявка'}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Напред
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
```

**`components/quiz/QuizQuestion.tsx`**

```tsx
'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Option {
  value: string
  label: string
}

interface QuizQuestionProps {
  question: string
  type: 'single' | 'multiple'
  options: Option[]
  value?: string | string[]
  onChange: (value: any) => void
}

export function QuizQuestion({ question, type, options, value, onChange }: QuizQuestionProps) {
  if (type === 'single') {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">{question}</h3>
        <RadioGroup value={value as string} onValueChange={onChange}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
  }

  // Multiple choice
  const selectedValues = (value || []) as string[]

  const handleToggle = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter(v => v !== optionValue))
    } else {
      onChange([...selectedValues, optionValue])
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{question}</h3>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2 mb-3">
          <Checkbox
            id={option.value}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={() => handleToggle(option.value)}
          />
          <Label htmlFor={option.value} className="cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}
```

**`components/quiz/QuizProgress.tsx`**

```tsx
import { Progress } from '@/components/ui/progress'

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Стъпка {currentStep} от {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
```

**`components/quiz/ContactForm.tsx`**

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ContactFormProps {
  values: {
    fullName: string
    email: string
    phone: string
  }
  onChange: (values: any) => void
}

export function ContactForm({ values, onChange }: ContactFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Данни за контакт</h3>

      <div>
        <Label htmlFor="fullName">Име и фамилия *</Label>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => onChange({ ...values, fullName: e.target.value })}
          placeholder="Иван Иванов"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => onChange({ ...values, email: e.target.value })}
          placeholder="ivan@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Телефон (опционално)</Label>
        <Input
          id="phone"
          value={values.phone}
          onChange={(e) => onChange({ ...values, phone: e.target.value })}
          placeholder="+359 888 123 456"
        />
      </div>
    </div>
  )
}
```

---

### 3. API Endpoints

**`app/api/register/route.ts`** - Регистрация API

```tsx
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { QuizAnswers } from '@/types/affiliate'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, quizAnswers } = body

    // Validate required fields
    if (!fullName || !email || !quizAnswers) {
      return NextResponse.json(
        { error: 'Липсват задължителни полета' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('affiliate_applications')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Вече има заявка с този email адрес' },
        { status: 400 }
      )
    }

    // Insert application
    const { data, error } = await supabase
      .from('affiliate_applications')
      .insert({
        full_name: fullName,
        email,
        phone,
        quiz_data: quizAnswers,
        experience_level: quizAnswers.experience,
        promotion_channels: quizAnswers.channels,
        audience_size: quizAnswers.audienceSize,
        interested_products: quizAnswers.products,
        motivation: quizAnswers.motivation,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Грешка при запис в базата данни' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      applicationId: data.id,
      message: 'Заявката е изпратена успешно',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Грешка при регистрация' },
      { status: 500 }
    )
  }
}
```

---

### 4. Shopify Integration

**`lib/shopify/client.ts`** - Shopify API client

```tsx
const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN!
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!

export async function shopifyFetch(query: string, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error('Shopify API error')
  }

  return response.json()
}
```

**`lib/shopify/create-discount.ts`** - Създаване на discount code

```tsx
import { shopifyFetch } from './client'

export async function createDiscountCode(
  code: string,
  commissionRate: number,
  affiliateId: string
) {
  const query = `
    mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
        codeDiscountNode {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              codes(first: 1) {
                nodes {
                  code
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    basicCodeDiscount: {
      title: `Affiliate: ${code}`,
      code: code,
      startsAt: new Date().toISOString(),
      customerGets: {
        value: {
          percentageDiscount: {
            percentage: commissionRate / 100, // Convert 10% to 0.10
          },
        },
        items: {
          all: true,
        },
      },
      customerSelection: {
        all: true,
      },
      usageLimit: null, // Unlimited uses
    },
  }

  const result = await shopifyFetch(query, variables)

  if (result.data.discountCodeBasicCreate.userErrors.length > 0) {
    throw new Error(result.data.discountCodeBasicCreate.userErrors[0].message)
  }

  return result.data.discountCodeBasicCreate.codeDiscountNode
}
```

---

### 5. Admin Panel

Създай нов таб в Testograph проекта:

**`Testograph/app/admin/affiliates/page.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { AffiliateApplication } from '@/types/affiliate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AffiliatesPage() {
  const [applications, setApplications] = useState<AffiliateApplication[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    fetchApplications()
  }, [filter])

  const fetchApplications = async () => {
    let query = supabase
      .from('affiliate_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    setApplications(data || [])
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Affiliate Applications</h1>

        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded ${
                filter === status ? 'bg-primary text-white' : 'bg-secondary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{app.full_name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{app.email}</p>
                </div>
                <Badge variant={
                  app.status === 'approved' ? 'default' :
                  app.status === 'rejected' ? 'destructive' : 'secondary'
                }>
                  {app.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p><strong>Experience:</strong> {app.experience_level}</p>
                <p><strong>Channels:</strong> {app.promotion_channels?.join(', ')}</p>
                <p><strong>Audience:</strong> {app.audience_size}</p>
                <p><strong>Motivation:</strong> {app.motivation}</p>
              </div>
              <Link href={`/admin/affiliates/${app.id}`} className="text-primary hover:underline mt-4 inline-block">
                View Details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 📦 Next Steps

1. Install Shadcn UI components
2. Run database migration in Supabase
3. Create Quiz components
4. Implement API endpoints
5. Create admin panel pages
6. Add Shopify integration
7. Create dashboard components
8. Test the full flow
9. Deploy to Vercel

---

## 🔗 Полезни Ресурси

- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Shopify Admin API](https://shopify.dev/docs/api/admin)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Resend Email API](https://resend.com/docs)

---

Успех с имплементацията! 🚀
