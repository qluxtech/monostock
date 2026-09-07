const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

// 静的ファイルの提供（publicフォルダ内のindex.html等を表示）
app.use(express.static(path.join(__dirname, 'public')));

// ヘルスチェック
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ACTIVE', system: 'Monostock Autonomous Fabric v2.0' });
});

// 🔥 超高収益・自動マルチレイヤー分配エンドポイント
app.post('/api/v1/autonomous-settlement', (req, res) => {
    const { providerId, consumerId, viralReferrerId, assetValue } = req.body;

    if (!assetValue) {
        return res.status(400).json({ error: 'Missing core routing parameters.' });
    }

    const totalVolume = parseFloat(assetValue);
    const platformTaxRate = 0.015;
    const viralBonusRate = 0.003;
    
    const platformRevenue = totalVolume * platformTaxRate;
    const viralPayout = viralReferrerId ? (totalVolume * viralBonusRate) : 0;
    
    const netPlatformProfit = platformRevenue - viralPayout;
    const providerPayout = totalVolume - platformRevenue;

    res.status(200).json({
        status: 'AUTONOMOUS_SUCCESS',
        ledgerId: 'ldg_' + Math.random().toString(36).substring(2, 15),
        timestamp: Date.now(),
        distribution: {
            providerNet: providerPayout,
            platformNetProfit: netPlatformProfit,
            viralReferrerBonus: viralPayout,
            systemStatus: 'DEFLATIONARY_BURN_APPLIED'
        }
    });
});

// ルート以外のアクセスはすべてindex.htmlにフォールバック（Not Found対策）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Monostock Autonomous Engine v2.0 active on port ${PORT}`);
});
