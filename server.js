const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let globalState = {
    tvl: 1420890500,
    revenue: 14208905,
    spread: "0.012%",
    liquidityDepth: "¥482,910,000",
    resources: [
        { name: "DeepSeek-V3 Autonomous Inference Node", endpoint: "api.monostock.io/v1/deepseek", type: "AI Fabric", ask: "¥1,500/req", bid: "¥1,480/req" },
        { name: "Global Liquidity Micro-Routing Fabric", endpoint: "fabric.monostock.io/router", type: "Routing", ask: "¥0.05/tx", bid: "¥0.048/tx" },
        { name: "Neural Weight Matrix Streamer", endpoint: "neural.monostock.io/weights", type: "Compute", ask: "¥12,400/hr", bid: "¥12,250/hr" }
    ]
};

app.get('/api/v1/metrics', (req, res) => {
    res.json(globalState);
});

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

app.post('/api/v1/register', (req, res) => {
    const { email } = req.body;
    const apiKey = 'mst_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    res.json({ success: true, apiKey });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MONOSTOCK Market Maker running on port ${PORT}`);
});
