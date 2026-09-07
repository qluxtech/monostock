const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

// --- 超高速メモリデータベース（実運用では永続DBへ接続） ---
const db = {
    users: [],
    resources: [
        { id: 'res_01', name: 'Global Autonomous Scraper API', endpoint: '/api/v1/scraper', owner: 'system' },
        { id: 'res_02', name: 'Micro-Payment Routing Engine', endpoint: '/api/v1/routing', owner: 'system' }
    ],
    metrics: {
        tvl: 1420890500,
        revenue: 14208905
    }
};

// システムステータス確認
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ACTIVE', system: 'Monostock Ultimate Fabric' });
});

// 統計データおよび流通中APIマーケット一覧の取得
app.get('/api/v1/metrics', (req, res) => {
    res.status(200).json({
        tvl: db.metrics.tvl,
        revenue: db.metrics.revenue,
        resources: db.resources
    });
});

// 開発者・エージェント登録 ＆ APIキー自動発行
app.post('/api/v1/register', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const apiKey = 'mono_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    db.users.push({ email, apiKey, registeredAt: Date.now() });

    console.log(`[USER_REGISTERED] Email: ${email}, API Key generated.`);
    res.status(200).json({ status: 'SUCCESS', email, apiKey });
});

// スマホからのワンタッチAPI・リソース出品
app.post('/api/v1/publish', (req, res) => {
    const { name, endpoint, owner } = req.body;
    if (!name || !endpoint) return res.status(400).json({ error: 'Invalid resource payload' });

    const newRes = { 
        id: 'res_' + Math.random().toString(36).substring(2, 8), 
        name, 
        endpoint, 
        owner: owner || 'creator' 
    };
    db.resources.unshift(newRes); // 新しいものをリストの最上部に追加

    // 流通総額とシステム収益を自動加算
    db.metrics.tvl += 150000;
    db.metrics.revenue += 2250;

    console.log(`[RESOURCE_PUBLISHED] ${name} deployed successfully.`);
    res.status(200).json({ status: 'PUBLISHED', resource: newRes });
});

// 自動決済・マルチレイヤー分配エンドポイント
app.post('/api/v1/autonomous-settlement', (req, res) => {
    const { viralReferrerId, assetValue } = req.body;
    if (!assetValue) return res.status(400).json({ error: 'Missing core parameters.' });

    const totalVolume = parseFloat(assetValue);
    const platformRevenue = totalVolume * 0.015;
    const viralPayout = viralReferrerId ? (totalVolume * 0.003) : 0;
    
    db.metrics.tvl += totalVolume;
    db.metrics.revenue += (platformRevenue - viralPayout);

    res.status(200).json({
        status: 'AUTONOMOUS_SUCCESS',
        ledgerId: 'ldg_' + Math.random().toString(36).substring(2, 15),
        distribution: {
            platformNetProfit: platformRevenue - viralPayout,
            viralReferrerBonus: viralPayout
        }
    });
});

// ルートアクセスに対して index.html を返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Monostock Ultimate Engine active on port ${PORT}`);
});
