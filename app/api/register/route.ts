import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, quiz_data } = body;

    // Validation
    if (!full_name || !email || !quiz_data) {
      return NextResponse.json(
        { error: 'Моля попълни всички задължителни полета' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('affiliate_applications')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Вече съществува заявка с този email адрес' },
        { status: 409 }
      );
    }

    // Create application
    const { data, error } = await supabase
      .from('affiliate_applications')
      .insert({
        full_name,
        email,
        phone,
        quiz_data,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating application:', error);
      return NextResponse.json(
        { error: 'Грешка при подаване на заявката' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email
    console.log('TODO: Send confirmation email to', email);

    return NextResponse.json({
      success: true,
      application: data,
      message: 'Заявката е подадена успешно',
    });

  } catch (error: any) {
    console.error('Error in registration API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
