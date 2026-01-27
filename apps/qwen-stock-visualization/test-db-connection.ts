// test-db-connection.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Supabase URL:', supabaseUrl);

  try {
    // 测试获取所有股票数据
    const { data: stocks, error: stocksError } = await supabase
      .from('stocks')
      .select('*')
      .limit(5);

    if (stocksError) {
      console.error('Error fetching stocks:', stocksError);
      return;
    }

    console.log('Successfully connected to database!');
    console.log('Sample stocks data:', stocks);

    // 测试获取价格数据
    if (stocks && stocks.length > 0) {
      const stockId = stocks[0].id;
      const { data: prices, error: pricesError } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('stock_id', stockId)
        .limit(5);

      if (pricesError) {
        console.log('No price data found or error:', pricesError);
      } else {
        console.log('Sample prices data:', prices);
      }
    }

  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();