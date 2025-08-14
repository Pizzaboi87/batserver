const fs = require("fs");
const path = require("path");

const isProd = String(process.env.NODE_ENV).toLowerCase() === "production";

const sanitizePem = (raw) => {
  if (!raw) return "";
  const trimmed = raw.trim().replace(/^"+|"+$/g, "");
  const withRealNewlines = trimmed.replace(/\\n/g, "\n");
  return withRealNewlines;
};

const buildSSL = () => {
  if (process.env.AIVEN_CA_CERT_PATH) {
    const certPath = path.resolve(process.env.AIVEN_CA_CERT_PATH);
    if (!fs.existsSync(certPath)) {
      if (isProd) {
        throw new Error(
          `AIVEN_CA_CERT_PATH=${certPath} does not exist in production`
        );
      }
    } else {
      return {
        minVersion: "TLSv1.2",
        ca: fs.readFileSync(certPath, "utf-8"),
        rejectUnauthorized: true,
      };
    }
  }

  const pem = sanitizePem(process.env.AIVEN_CA_CERT);
  if (pem && pem.includes("BEGIN CERTIFICATE")) {
    return {
      minVersion: "TLSv1.2",
      ca: Buffer.from(pem, "utf-8"),
      rejectUnauthorized: true,
    };
  }

  const insecure =
    String(process.env.API_SSL_INSECURE || "").toLowerCase() === "true";
  if (!isProd && insecure) {
    return {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    };
  }

  if (isProd) {
    throw new Error(
      "Missing Aiven CA in production. Provide AIVEN_CA_CERT_PATH or AIVEN_CA_CERT."
    );
  }
  return undefined;
};

const toInt = (v, def) => {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

const config = {
  db: {
    host: process.env.API_HOST,
    port: toInt(process.env.API_PORT, 3306),
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE,
    waitForConnections: true,
    connectionLimit: toInt(process.env.DB_CONN_LIMIT, 10),
    queueLimit: 0,
    connectTimeout: toInt(process.env.DB_CONNECT_TIMEOUT_MS, 10000),
    enableKeepAlive: true,
    keepAliveInitialDelay: toInt(process.env.DB_KEEPALIVE_DELAY_MS, 10000),
    multipleStatements: false,
    ssl: buildSSL(),
  },
  listPerPage: toInt(process.env.LIST_PER_PAGE, 200),
  server: {
    port: toInt(process.env.PORT, 3000),
  },
};

module.exports = config;
