# Testograph Affiliate System

Система за афилиейт програма на Testograph с Quiz-базирана регистрация, афилиейт дашборд и Shopify интеграция.

## 🚀 Setup

### 1. Инсталация

```bash
cd testograph-affiliate
npm install
```

### 2. Environment Variables

Копирай `.env.local.example` в `.env.local` и попълни стойностите:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Shopify
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_ACCESS_TOKEN=your_admin_api_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret

# Email
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@testograph.eu
```

### 3. Database Migration

Изпълни migration файла в Supabase SQL Editor:

```bash
# Файл: testograph-app/supabase/migration-affiliate-system.sql
```

### 4. Стартиране

```bash
npm run dev
```

Отвори [http://localhost:3007](http://localhost:3007)

---

## 📁 Структура на Проекта

```
testograph-affiliate/
├── app/
│   ├── (public)/                   # Публични страници
│   │   ├── page.tsx               # Landing page
│   │   └── register/              # Quiz регистрация
│   │       └── page.tsx
│   ├── (auth)/                     # Auth страници
│   │   ├── login/page.tsx
│   │   └── reset-password/page.tsx
│   ├── dashboard/                  # Афилиейт дашборд
│   │   ├── page.tsx               # Overview със статистики
│   │   ├── materials/page.tsx     # Маркетингови материали
│   │   ├── promo-code/page.tsx    # QR кодове и линкове
│   │   └── settings/page.tsx      # Профил настройки
│   └── api/
│       ├── register/route.ts      # Регистрация API
│       └── webhooks/
│           └── shopify/route.ts   # Shopify webhook
├── components/
│   ├── quiz/
│   │   ├── QuizFlow.tsx           # Главен Quiz компонент
│   │   ├── QuizQuestion.tsx       # Компонент за въпрос
│   │   └── QuizProgress.tsx       # Прогрес бар
│   ├── dashboard/
│   │   ├── StatsCard.tsx          # Карта със статистика
│   │   └── OrdersList.tsx         # Списък с поръчки
│   └── ui/                         # Shadcn UI компоненти
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   └── server.ts              # Server client
│   ├── shopify/
│   │   ├── create-discount.ts     # Създаване на промо код
│   │   └── track-orders.ts        # Проследяване на поръчки
│   ├── email/
│   │   └── affiliate-welcome.ts   # Welcome email template
│   └── utils.ts                    # Helper функции
└── types/
    └── affiliate.ts                # TypeScript types
```

---

## 🎯 Основни Функционалности

### 1. **Афилиейт Регистрация (Quiz)**

**Път**: `/register`

5 въпроса за кандидатстване:

1. Опит в здравословен/fitness сектор
2. Канали за промоция
3. Размер на аудитория
4. Интересуващи продукти
5. Мотивация (свободен текст)

След Quiz:
- Форма с име, имейл, телефон
- Запис в `affiliate_applications`
- Съобщение: "Заявката е изпратена"

### 2. **Админ Панел**

**Път**: `Testograph/app/admin/affiliates/`

Функции:
- Списък със заявки (pending, approved, rejected)
- Преглед на Quiz отговори
- Одобрение/отхвърляне
- Задаване на комисионна (5%, 10%, 15%)
- Генериране на промо код
- Изпращане на Welcome Email

### 3. **Афилиейт Дашборд**

**Път**: `/dashboard`

**Overview страница**:
- Статистика карти:
  - Кликове
  - Генерирани поръчки
  - Общ приход
  - Моята комисионна
- График на поръчките (30 дни)
- Списък с последни поръчки

**Materials страница** (`/dashboard/materials`):
- Креативи за download (снимки/видеота)
- Готови текстове за социални мрежи
- PDF гайд за продажби

**Promo Code страница** (`/dashboard/promo-code`):
- Показване на промо код
- QR кодове за продукти
- Copy-to-clipboard линкове
- Избор на продукт

### 4. **Shopify Интеграция**

При одобрение на афилиейт:
1. Създава се discount code в Shopify (Shopify Admin API)
2. Запис в `affiliates` таблица

При поръчка:
1. Webhook `/api/webhooks/shopify` улавя `orders/create`
2. Проверява се за `discount_code`
3. Записва се в `affiliate_orders`
4. Изчислява се комисионна
5. Афилиейтът вижда поръчката в дашборда

### 5. **Email Автоматизация**

След одобрение:
- Генерира се парола
- Изпраща се Welcome Email с:
  - Данни за вход
  - Промо код
  - Линк към дашборд
  - Първи стъпки

---

## 🔧 API Endpoints

### POST `/api/register`

Регистрация на афилиейт:

```ts
// Request
{
  fullName: string
  email: string
  phone: string
  quizAnswers: {
    experience: string
    channels: string[]
    audienceSize: string
    products: string[]
    motivation: string
  }
}

// Response
{
  success: boolean
  applicationId: string
  message: string
}
```

### POST `/api/webhooks/shopify`

Shopify webhook за нови поръчки:

```ts
// Headers
{
  "x-shopify-hmac-sha256": "signature"
  "x-shopify-topic": "orders/create"
}

// Body: Shopify Order JSON
{
  id: number
  discount_codes: [{ code: string, amount: string }]
  total_price: string
  email: string
  ...
}
```

---

## 📊 База Данни

### Таблици

1. **affiliate_applications**
   - Заявки за регистрация
   - Quiz отговори
   - Status: pending, approved, rejected

2. **affiliates**
   - Одобрени афилиейти
   - Промо код
   - Комисионна ставка
   - Статистики

3. **affiliate_orders**
   - Проследяване на поръчки
   - Shopify order ID
   - Комисионна сума

4. **affiliate_materials**
   - Маркетингови материали
   - Креативи, текстове, гайдове

5. **affiliate_commissions**
   - История на плащания

6. **affiliate_clicks**
   - Tracking на кликове

### Helper Functions

- `update_affiliate_stats()` - Auto-update при нова поръчка
- `get_affiliate_by_promo_code(code)` - Quick lookup

---

## 🎨 UI Компоненти

Използва Shadcn UI:

```bash
npx shadcn@latest add button card input label select toast progress radio-group
```

Необходими компоненти:
- Button
- Card
- Input
- Label
- Select
- Toast (Sonner)
- Progress
- Radio Group
- Dialog
- Tabs

---

## 🚢 Deployment

### Vercel

```bash
vercel --prod
```

### Environment Variables

Задай всички env променливи в Vercel Dashboard

### Domain Setup

Настрой `affiliate.testograph.eu` да сочи към Vercel

---

## 📝 TODO

- [ ] Shopify discount code creation функция
- [ ] Email templates (Resend)
- [ ] Shadcn UI компоненти
- [ ] Dashboard charts (Recharts)
- [ ] QR code generation
- [ ] Materials upload функционалност
- [ ] Payment tracking за комисионни

---

## 🔐 Security

- RLS policies на всички таблици
- HMAC verification на Shopify webhooks
- Auth middleware за dashboard
- Admin role check за админ функции

---

## 📞 Support

За въпроси и техническа поддръжка: tech@testograph.eu
