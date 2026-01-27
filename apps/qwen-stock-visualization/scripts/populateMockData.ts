// scripts/populateMockData.ts
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

async function populateMockData() {
  console.log('开始填充模拟数据...');
  
  // 获取所有股票
  const { data: stocks } = await supabase
    .from('stocks')
    .select('id, symbol');
  
  if (!stocks) {
    console.error('无法获取股票数据');
    return;
  }
  
  console.log(`找到 ${stocks.length} 只股票`);
  
  // 为每只股票生成最近30天的模拟价格数据
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  for (const stock of stocks) {
    console.log(`正在为 ${stock.symbol} 生成模拟价格数据...`);
    
    // 为每只股票生成随机价格数据
    let basePrice = 100 + Math.random() * 200; // 随机基础价格
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // 生成随机价格波动
      const changePercent = (Math.random() - 0.5) * 0.1; // -5% 到 +5% 的变化
      const changeAmount = basePrice * changePercent;
      const newPrice = basePrice + changeAmount;
      
      // 更新基础价格用于下一天
      basePrice = newPrice;
      
      // 插入价格数据
      const { error } = await supabase
        .from('stock_prices')
        .insert({
          stock_id: stock.id,
          price: parseFloat(newPrice.toFixed(2)),
          change_amount: parseFloat(changeAmount.toFixed(2)),
          change_percent: parseFloat((changePercent * 100).toFixed(2)),
          volume: Math.floor(Math.random() * 1000000) + 100000, // 随机成交量
          timestamp: date.toISOString()
        });
      
      if (error) {
        console.error(`插入 ${stock.symbol} 的价格数据时出错:`, error);
      }
    }
  }
  
  console.log('模拟数据填充完成！');
}

// 运行函数
populateMockData().catch(console.error);