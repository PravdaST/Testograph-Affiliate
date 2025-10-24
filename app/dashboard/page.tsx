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
  MousePointerClick,
  ShoppingCart,
  Euro,
  Copy,
  Check,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DashboardStats {
  total_clicks: number;
  total_orders: number;
  total_commission: number;
  pending_commission: number;
  commission_rate: number;
}

interface Affiliate {
  id: string;
  promo_code: string;
  commission_rate: number;
  status: string;
}

interface Order {
  id: string;
  order_number: string;
  order_total: number;
  commission_amount: number;
  commission_status: string;
  created_at: string;
}

export default function DashboardPage() {
  const supabase = createClient();

  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (isRefresh = false) => {
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
        const response = await fetch('/api/dashboard/stats');
        const statsData = await response.json();
        if (response.ok) {
          setStats(statsData.stats);
        }

        // Fetch recent orders
        const ordersResponse = await fetch('/api/dashboard/orders?limit=10');
        const ordersData = await ordersResponse.json();
        if (ordersResponse.ok) {
          setRecentOrders(ordersData.orders || []);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleCopyCode = () => {
    if (affiliate?.promo_code) {
      navigator.clipboard.writeText(affiliate.promo_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold">Акаунтът не е намерен</p>
        <p className="text-sm text-muted-foreground mt-1">
          Моля свържи се с поддръжката
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Добре дошъл, Affiliate!</h1>
          <p className="text-muted-foreground mt-1">
            Ето твоята статистика и данни
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchDashboardData(true)}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обнови
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4" />
              Кликове
            </CardDescription>
            <CardTitle className="text-3xl">{stats?.total_clicks || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Общо кликове по твоя промо код
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Поръчки
            </CardDescription>
            <CardTitle className="text-3xl">{stats?.total_orders || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Успешни поръчки
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Спечелени
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {(stats?.total_commission || 0).toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Изплатена комисионна
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Чакащи
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">
              {(stats?.pending_commission || 0).toFixed(2)} лв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Неизплатена комисионна
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Promo Code & QR Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Твоят Промо Код</CardTitle>
            <CardDescription>
              Споделяй този код с твоята аудитория
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-4 bg-muted rounded-lg text-center">
                <code className="text-2xl font-bold">{affiliate.promo_code}</code>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
              >
                {copiedCode ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Комисионна:</span>
              <Badge variant="default">{affiliate.commission_rate}%</Badge>
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>URL за споделяне:</strong>
              </p>
              <code className="text-xs break-all">
                https://shop.testograph.eu?discount={affiliate.promo_code}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Код</CardTitle>
            <CardDescription>
              Сканирай за бърз достъп до твоята афилиейт линк
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={`https://shop.testograph.eu?discount=${affiliate.promo_code}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                // Download QR code logic
                const svg = document.querySelector('svg');
                if (svg) {
                  const svgData = new XMLSerializer().serializeToString(svg);
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                      if (blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `qr-code-${affiliate.promo_code}.png`;
                        a.click();
                      }
                    });
                  };
                  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                }
              }}
            >
              Свали QR код
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Последни поръчки</CardTitle>
          <CardDescription>
            Последните 10 поръчки с твоя промо код
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
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
                  {recentOrders.map((order) => (
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
    </div>
  );
}
