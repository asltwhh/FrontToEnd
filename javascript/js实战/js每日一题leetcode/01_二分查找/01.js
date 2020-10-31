var maxProfit = function (prices, fee = 2) {
  // 初始化第一天的状态
  let dp0 = 0; // 卖出后的利润为0，因为第一天不可能卖出
  let dp1 = -prices[0]; // 假定第一天买入了
  for (let i = 1; i < prices.length; i++) {
    let tmp = dp0; // 第i天前的利润
    dp0 = Math.max(dp0, dp1 + prices[i] - fee); // 第i天卖出后的利润
    dp1 = Math.max(dp1, tmp - prices[i]); // 第i天买入后的利润
  }
  return dp0;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
