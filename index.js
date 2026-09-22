const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// プロジェクト直下（__dirname）全体を静的ファイルとして公開
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});