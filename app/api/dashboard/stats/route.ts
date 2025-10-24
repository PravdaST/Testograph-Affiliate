import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    // Get authenticated user from cookie
    const cookieStore = cookies();
    const authCookie = cookieStore.get('sb-access-token');

    if (!authCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get affiliate ID from auth
    const { data: { user } } = await supabase.auth.getUser(authCookie.value);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: affiliate } = await supabase
      .from('affiliates')
      .select('id, commission_rate')
      .eq('email', user.email)
      .single();

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      );
    }

    // Get clicks count
    const { count: clicksCount } = await supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('affiliate_id', affiliate.id);

    // Get orders and calculate commissions
    const { data: orders } = await supabase
      .from('affiliate_orders')
      .select('commission_amount, commission_status')
      .eq('affiliate_id', affiliate.id);

    const totalOrders = orders?.length || 0;
    const totalCommission = orders
      ?.filter(o => o.commission_status === 'paid')
      .reduce((sum, o) => sum + (o.commission_amount || 0), 0) || 0;

    const pendingCommission = orders
      ?.filter(o => o.commission_status === 'pending')
      .reduce((sum, o) => sum + (o.commission_amount || 0), 0) || 0;

    const stats = {
      total_clicks: clicksCount || 0,
      total_orders: totalOrders,
      total_commission: totalCommission,
      pending_commission: pendingCommission,
      commission_rate: affiliate.commission_rate,
    };

    return NextResponse.json({
      success: true,
      stats,
    });

  } catch (error: any) {
    console.error('Error in dashboard stats API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
