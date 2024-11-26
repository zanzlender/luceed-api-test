const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const LUCEED_USERNAME = "luceed_mb";
const LUCEED_PASSWORD = "7e5y2Uza";

const app = express();

app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://apidemo.luceed.hr",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove /api prefix when forwarding
    },
    onProxyReq: (proxyReq) => {
      // Add basic auth header if not present
      if (!proxyReq.getHeader("Authorization")) {
        const credentials = Buffer.from(`${LUCEED_USERNAME}:${LUCEED_PASSWORD}`).toString("base64");
        proxyReq.setHeader("Authorization", `Basic ${credentials}`);
        proxy.setHeader("Content-Type", "application/json");
      }
    },
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
