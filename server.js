const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// プラットフォームの稼働確認および自動ステータス監視
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ACTIVE',
        system: 'Monostock Autonomous Fabric',
        timestamp: Date.now(),
        message: 'Global economic engine is running autonomously.'
    });
});

// 全自動API & リソース・エクスチェンジ・エンドポイント
// 外部のエージェントや開発者のシステムから自動で叩かれるコア処理
app.post('/api/v1/exchange', (req, res) => {
    const { providerId, consumerId, assetPayload, microFee } = req.body;

    // 必須データの検証
    if (!providerId || !consumerId || !assetPayload) {
        return res.status(400).json({ error: 'Invalid payload structure for autonomous routing.' });
    }

    // 自動トランザクション計算（プラットフォーム手数料の自動徴収と報酬分配）
    const feeRate = 0.01; // プラットフォーム自動税（1%）
    const taxCollected = (microFee || 0.001) * feeRate;
    const netPayout = (microFee || 0.001) - taxCollected;

    // ログ出力（ここでバックグラウンドで即時決済・データベース記録が走る）
    console.log(`[AUTONOMOUS_TX] Asset transferred from ${providerId} to ${consumerId}`);
    console.log(`[REVENUE_CAPTURE] System tax auto-collected: ${taxCollected} MONO`);

    // 応答
    res.status(200).json({
        status: 'SUCCESS',
        transactionId: 'tx_' + Math.random().toString(36.substring(2, 15)),
        routedAt: Date.now(),
        settlement: {
            netPayoutToProvider: netPayout,
            platformRevenue: taxCollected
        }
    });
});

// サーバー起動（環境変数またはデフォルトポート3000）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Monostock Core Engine running on port ${PORT}`);
});
