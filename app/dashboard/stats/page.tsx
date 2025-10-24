'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  ShoppingCart,
  Euro,
  Calendar,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
} from 'lucide-react';

interface DashboardStats {
  total_clicks: number;
  total_orders: number;
  total_commission: number;
  pending_commission: number;
  commission_rate: number;
}

interface Order {
  id: string;
  order_number: string;
  order_total: number;
  commission_amount: number;
  commission_status: string;
  created_at: string;
}

interface Affiliate {
  id: string;
  promo_code: string;
  commission_rate: number;
  created_at: string;
}

interface MonthlyStats {
  month: string;
  clicks: number;
  orders: number;
  commission: number;
}

export default function StatsPage() {
  const supabase = createClient();

  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculated metrics
  const [conversionRate, setConversionRate] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [avgCommission, setAvgCommission] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get affiliate data
      const { data: affiliateData } = await supabase
        .from('affiliates')
        .select('*')
        .eq('email', user.email)
        .single();

      if (affiliateData) {
        setAffiliate(affiliateData);

        // Fetch stats from API
        const statsResponse = await fetch('/api/dashboard/stats');
        const statsData = await statsResponse.json();
        if (statsResponse.ok) {
          setStats(statsData.stats);
        }

        // Fetch ALL orders (no limit)
        const ordersResponse = await fetch('/api/dashboard/orders?limit=1000');
        const ordersData = await ordersResponse.json();
        if (ordersResponse.ok) {
          const orders = ordersData.orders || [];
          setAllOrders(orders);
          calculateMetrics(orders, statsData.stats);
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const calculateMetrics = (orders: Order[], statsData: DashboardStats) => {
    // Conversion rate
    const clicks = statsData.total_clicks || 0;
    const totalOrders = orders.length;
    const conversion = clicks > 0 ? (totalOrders / clicks) * 100 : 0;
    setConversionRate(conversion);

    // Average order value
    if (orders.length > 0) {
      const totalValue = orders.reduce((sum, o) => sum + o.order_total, 0);
      setAvgOrderValue(totalValue / orders.length);

      const totalComm = orders.reduce((sum, o) => sum + o.commission_amount, 0);
      setAvgCommission(totalComm / orders.length);
    }

    // Monthly statistics
    const monthlyMap = new Map<string, { clicks: number; orders: Order[] }>();

    // Group orders by month
    orders.forEach(order => {
      const date = new Date(order.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { clicks: 0, orders: [] });
      }
      monthlyMap.get(monthKey)!.orders.push(order);
    });

    // Convert to array and calculate stats
    const monthly = Array.from(monthlyMap.entries())
      .map(([month, data]) => {
        const monthDate = new Date(month + '-01');
        const monthName = monthDate.toLocaleDateString('bg-BG', {
          month: 'long',
          year: 'numeric'
        });

        return {
          month: monthName,
          clicks: data.clicks, // We don't have per-month clicks, so this will be 0
          orders: data.orders.length,
          commission: data.orders.reduce((sum, o) => sum + o.commission_amount, 0),
        };
      })
      .sort((a, b) => {
        // Sort by date descending (newest first)
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 6); // Last 6 months

    setMonthlyStats(monthly);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!affiliate || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold">Няма налични данни</p>
        <p className="text-sm text-muted-foreground mt-1">
          Моля опреснете страницата
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Детайлна Статистика</h1>
          <p className="text-muted-foreground mt-1">
            Преглед на твоите резултати и ефективност
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchAllData(true)}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обнови
        </Button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4" />
              Общо Кликове
            </CardDescription>
            <CardTitle className="text-3xl">{stats.total_clicks}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Общ трафик към магазина
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Общо Поръчки
            </CardDescription>
            <CardTitle className="text-3xl">{stats.total_orders}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Успешни продажби
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Конверсия
            </CardDescription>
            <CardTitle className="text-3xl">
              {conversionRate.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              От кликове до поръчки
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Средна Комисионна
            </CardDescription>
            <CardTitle className="text-3xl">
              {avgCommission.toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              На поръчка
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Обща Комисионна</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {stats.total_commission.toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Изплатени комисионни</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Чакащи Комисионни</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">
              {stats.pending_commission.toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-yellow-600" />
              <span>Предстоящи плащания</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Средна Стойност на Поръчка</CardDescription>
            <CardTitle className="text-2xl">
              {avgOrderValue.toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span>Базирано на {stats.total_orders} поръчки</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Statistics */}
      {monthlyStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Месечна Статистика</CardTitle>
            <CardDescription>
              Последните {monthlyStats.length} месеца с активност
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Месец</TableHead>
                    <TableHead className="text-right">Поръчки</TableHead>
                    <TableHead className="text-right">Комисионна</TableHead>
                    <TableHead className="text-right">Средна</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyStats.map((month, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell className="text-right">{month.orders}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">
                        {month.commission.toFixed(2)} лв
                      </TableCell>
                      <TableCell className="text-right">
                        {month.orders > 0 ? (month.commission / month.orders).toFixed(2) : '0.00'} лв
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Всички Поръчки ({allOrders.length})</CardTitle>
          <CardDescription>
            Пълна история на твоите продажби
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-lg font-semibold">Все още няма поръчки</p>
              <p className="text-sm text-muted-foreground mt-1">
                Започни да промотираш продуктите!
              </p>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Номер</TableHead>
                    <TableHead className="text-right">Сума</TableHead>
                    <TableHead className="text-right">Комисионна</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">
                        #{order.order_number}
                      </TableCell>
                      <TableCell className="text-right">
                        {order.order_total.toFixed(2)} лв
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {order.commission_amount.toFixed(2)} лв
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.commission_status === 'paid' ? 'default' : 'secondary'}
                        >
                          {order.commission_status === 'paid' ? 'Изплатено' : 'Чакащо'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Информация за Акаунта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Промо Код:</span>
            <span className="font-mono font-semibold">{affiliate.promo_code}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Процент Комисионна:</span>
            <Badge variant="default">{affiliate.commission_rate}%</Badge>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Член От:</span>
            <span className="text-sm">
              {new Date(affiliate.created_at).toLocaleDateString('bg-BG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
