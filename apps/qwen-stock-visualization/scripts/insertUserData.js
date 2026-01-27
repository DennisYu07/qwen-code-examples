import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 加载 .env.local 文件
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('环境变量缺失');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertUserData() {
  try {
    // 首先找到用户
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', '12345678@163.com')
      .single();

    if (userError) {
      console.error('查询用户时出错:', userError);
      return;
    }

    if (!user) {
      console.log('未找到指定邮箱的用户');
      return;
    }

    console.log('找到用户ID:', user.id);

    // 检查是否已经存在投资组合
    const { data: existingPortfolio, error: portfolioCheckError } = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (portfolioCheckError) {
      console.error('检查投资组合时出错:', portfolioCheckError);
      return;
    }

    let portfolioId;

    if (existingPortfolio && existingPortfolio.length > 0) {
      console.log('用户已有投资组合:', existingPortfolio[0].id);
      portfolioId = existingPortfolio[0].id;
    } else {
      // 插入投资组合
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolios')
        .insert({
          user_id: user.id,
          name: '我的主要投资组合',
          initial_balance: 100000,
          current_balance: 98500
        })
        .select()
        .single();

      if (portfolioError) {
        console.error('插入投资组合时出错:', portfolioError);
        return;
      }

      console.log('成功插入投资组合:', portfolio.id);
      portfolioId = portfolio.id;
    }

    // 检查持仓是否已存在
    const { data: existingPositions, error: positionsCheckError } = await supabase
      .from('portfolio_positions')
      .select('id')
      .eq('portfolio_id', portfolioId)
      .limit(1);

    if (positionsCheckError) {
      console.error('检查持仓时出错:', positionsCheckError);
      return;
    }

    if (!existingPositions || existingPositions.length === 0) {
      // 插入持仓
      const positionsData = [
        {
          portfolio_id: portfolioId,
          stock_id: 1, // AAPL
          quantity: 10,
          avg_cost: 140.50
        },
        {
          portfolio_id: portfolioId,
          stock_id: 2, // MSFT
          quantity: 5,
          avg_cost: 330.25
        },
        {
          portfolio_id: portfolioId,
          stock_id: 3, // GOOGL
          quantity: 8,
          avg_cost: 135.75
        }
      ];

      const { error: positionsError } = await supabase
        .from('portfolio_positions')
        .insert(positionsData);

      if (positionsError) {
        console.error('插入持仓时出错:', positionsError);
      } else {
        console.log('成功插入持仓数据');
      }
    } else {
      console.log('用户已有持仓数据');
    }

    // 检查交易记录是否已存在
    const { data: existingTransactions, error: transactionsCheckError } = await supabase
      .from('portfolio_transactions')
      .select('id')
      .eq('portfolio_id', portfolioId)
      .limit(1);

    if (transactionsCheckError) {
      console.error('检查交易记录时出错:', transactionsCheckError);
      return;
    }

    if (!existingTransactions || existingTransactions.length === 0) {
      // 插入交易记录
      const transactionsData = [
        {
          portfolio_id: portfolioId,
          stock_id: 1,
          transaction_type: 'buy',
          quantity: 10,
          price: 140.50,
          total_value: 1405.00
        },
        {
          portfolio_id: portfolioId,
          stock_id: 2,
          transaction_type: 'buy',
          quantity: 5,
          price: 330.25,
          total_value: 1651.25
        },
        {
          portfolio_id: portfolioId,
          stock_id: 3,
          transaction_type: 'buy',
          quantity: 8,
          price: 135.75,
          total_value: 1086.00
        }
      ];

      const { error: transactionsError } = await supabase
        .from('portfolio_transactions')
        .insert(transactionsData);

      if (transactionsError) {
        console.error('插入交易记录时出错:', transactionsError);
      } else {
        console.log('成功插入交易记录');
      }
    } else {
      console.log('用户已有交易记录');
    }

    // 检查自选股是否已存在
    const { data: existingWatchlist, error: watchlistCheckError } = await supabase
      .from('watchlists')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (watchlistCheckError) {
      console.error('检查自选股时出错:', watchlistCheckError);
      return;
    }

    if (!existingWatchlist || existingWatchlist.length === 0) {
      // 添加一些自选股
      const watchlistData = [
        { user_id: user.id, stock_id: 1 },
        { user_id: user.id, stock_id: 4 }, // AMZN
        { user_id: user.id, stock_id: 5 }  // TSLA
      ];

      const { error: watchlistError } = await supabase
        .from('watchlists')
        .insert(watchlistData);

      if (watchlistError) {
        console.error('插入自选股时出错:', watchlistError);
      } else {
        console.log('成功插入自选股');
      }
    } else {
      console.log('用户已有自选股');
    }

    console.log('用户数据操作完成');
  } catch (err) {
    console.error('操作过程中出现错误:', err);
  }
}

// 执行函数
insertUserData().then(() => {
  console.log('脚本执行完成');
  process.exit(0);
});