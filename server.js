const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ヘルスチェック
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ACTIVE', system: 'Monostock Autonomous Fabric v2.0' });
});

// 🔥 超高収益・自動マルチレイヤー分配エンドポイント
app.post('/api/v1/autonomous-settlement', (req, res) => {
    const { providerId, consumerId, viralReferrerId, assetValue } = req.body;

    if (!providerId || !consumerId || !assetValue) {
        return res.status(400).json({ error: 'Missing core routing parameters.' });
    }

    // --- エグい自動マネタイズ・アルゴリズム ---
    const totalVolume = parseFloat(assetValue);
    
    const platformTaxRate = 0.015; // プラットフォーム基本自動税 (1.5%)
    const viralBonusRate = 0.003;  // バイラル紹介者への自動還元 (0.3%)
    
    const platformRevenue = totalVolume * platformTaxRate;
    const viralPayout = viralReferrerId ? (totalVolume * viralBonusRate) : 0;
    
    // プラットフォームの純取り分（紹介者分を差し引いてもエグい利益が残る）
    const netPlatformProfit = platformRevenue - viralPayout;
    const providerPayout = totalVolume - platformRevenue;

    // ログ出力（完全自動で富が分散・集積される瞬間）
    console.log(`[ECONOMY_CORE] -----------------------------------------`);
    console.log(`[TX_PROCESSED] Volume: ${totalVolume} MONO`);
    console.log(`[PLATFORM_WEALTH] Net Profit Captured: ${netPlatformProfit} MONO`);
    if (viralReferrerId) {
        console.log(`[VIRAL_LOOP] Paid ${viralPayout} MONO to referrer: ${viralReferrerId} (Growth loop activated)`);
    }

    // 応答
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Monostock Autonomous Engine v2.0 active on port ${PORT}`);
});
