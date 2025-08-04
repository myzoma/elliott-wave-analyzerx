// 1. الربط مع Binance API
async function getBinanceData(symbol = 'BTCUSDT', interval = '1h') {
  const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`);
  return await response.json();
}

// 2. استخدام المحلل
async function runAnalysis() {
  const rawData = await getBinanceData();
  const analyzer = new ElliottWaveAnalyzer();
  const result = analyzer.analyze(rawData);
  
  // 3. عرض النتائج
  displayResults(result);
}

// 3. عرض النتائج
function displayResults(analysis) {
  const resultsDiv = document.getElementById('analysis-results');
  const recDiv = document.getElementById('recommendations');
  
  resultsDiv.innerHTML = `
    <h3>التحليل الفني</h3>
    <p>النمط: ${analysis.patterns[0]?.type === 'motive' ? 'دافع' : 'تصحيحي'}</p>
    <p>الاتجاه: ${analysis.trend === 'bullish' ? 'صاعد' : 'هابط'}</p>
  `;
  
  recDiv.innerHTML = '<h3>التوصيات</h3>';
  analysis.recommendations.forEach(rec => {
    recDiv.innerHTML += `
      <div class="recommendation ${rec.type}">
        ${rec.message} (الثقة: ${rec.confidence}%)
      </div>
    `;
  });
}

// تشغيل التحليل عند تحميل الصفحة
window.onload = runAnalysis;
