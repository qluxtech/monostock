const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// インメモリデータストア（世界一のマーケット状態）
let globalState = {
    tvl: 1420890500,
    revenue: 14208905,
    resources: [
        { name: "DeepSeek-V3 Autonomous Inference Node", endpoint: "api.monostock.io/v1/deepseek" },
        { name: "Global Liquidity Micro-Routing Fabric", endpoint: "fabric.monostock.io/router" }
    ]
};

// メトリクス・マーケット情報取得 API
app.get('/api/v1/metrics', (req, res) => {
    res.json(globalState);
});

// リソース即時デプロイ API
app.post('/api/v1/publish', (req, res) => {
    const { name, endpoint, owner } = req.body;
    if (name && endpoint) {
        globalState.resources.unshift({ name, endpoint });
        globalState.tvl += 15000000;
        globalState.revenue += 150000;
        res.json({ success: true, resources: globalState.resources });
    } else {
        res.status(400).json({ success: false, error: "Invalid parameters" });
    }
});

// 開発者キー発行 API
app.post('/api/v1/register', (req, res) => {
    const { email } = req.body;
    const apiKey = 'mst_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    res.json({ success: true, apiKey });
});

// 全てのルートを index.html にフォールバック（Not Found 防止）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MONOSTOCK Fabric running on port ${PORT}`);
});
