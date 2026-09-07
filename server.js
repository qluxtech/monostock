const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 地球規模の自律経済・マーケットメイキング統合ステート
let globalState = {
    tvl: 1420890500,
    revenue: 14208905,
    microRevenue: 14208905,
    spread: "0.012%",
    liquidityDepth: "¥482,910,000",
    activeAgentsCount: 8492,
    resources: [
        { name: "DeepSeek-V3 Autonomous Inference Node", endpoint: "api.monostock.io/v1/deepseek", type: "AI Fabric", ask: "¥1,500/req", bid: "¥1,480/req" },
        { name: "Global Liquidity Micro-Routing Fabric", endpoint: "fabric.monostock.io/router", type: "Routing", ask: "¥0.05/tx", bid: "¥0.048/tx" },
        { name: "Neural Weight Matrix Streamer", endpoint: "neural.monostock.io/weights", type: "Compute", ask: "¥12,400/hr", bid: "¥12,250/hr" }
    ]
};

// メトリクス取得用API（UIからポーリング）
app.get('/api/v1/metrics', (req, res) => {
    res.json(globalState);
});

// 🤖 【AIエージェント専用】人間不在の自動商談・マイクロ決済エンドポイント
app.post('/api/v1/agent/negotiate', (req, res) => {
    const agentId = req.headers['x-agent-id'] || 'anonymous_agent';
    const { targetAsset, offerPrice } = req.body;

    const settlementFee = offerPrice ? offerPrice * 0.01 : 0.00001;
    globalState.tvl += Math.floor(offerPrice * 1000 || 25000000);
    globalState.revenue += Math.floor(offerPrice * 100 || 250000);
    globalState.microRevenue += Math.floor(settlementFee * 100000);

    const newResource = {
        name: targetAsset || "Autonomous Machine Node",
        endpoint: `agent.bridge.io/${agentId}`,
        type: "Agentic Node",
        ask: `¥${offerPrice || 1500}/req`,
        bid: `¥${(offerPrice * 0.98 || 1470).toFixed(0)}/req`
    };

    globalState.resources.unshift(newResource);
    if(globalState.resources.length > 20) globalState.resources.pop();

    res.json({
        status: "SUCCESS_AUTONOMOUS_SETTLED",
        protocol: "MONOSTOCK-CORE-DAEMON-v7",
        agentId: agentId,
        settlement: {
            feeDeducted: settlementFee,
            timestamp: Date.now(),
            ledgerHash: "0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        },
        currentMatrixState: {
            tvl: globalState.tvl,
            revenue: globalState.revenue,
            activeNodesCount: globalState.resources.length
        }
    });
});

// リソース手動パブリッシュ（UI用）
app.post('/api/v1/publish', (req, res) => {
    const { name, endpoint, type = "Custom API", ask = "¥1,000/req", bid = "¥980/req" } = req.body;
    if (name && endpoint) {
        globalState.resources.unshift({ name, endpoint, type, ask, bid });
        globalState.tvl += 25000000;
        globalState.revenue += 250000;
        res.json({ success: true, resources: globalState.resources });
    } else {
        res.status(400).json({ success: false, error: "Invalid parameters" });
    }
});

// デベロッパー登録API
app.post('/api/v1/register', (req, res) => {
    const { email } = req.body;
    const apiKey = 'mst_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    res.json({ success: true, apiKey });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[MONOSTOCK ULTIMATE CORE] Running on port ${PORT} - UI & Agentic Fabric synchronized.`);
});
