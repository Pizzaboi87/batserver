require("dotenv").config();
const mysql = require("mysql2/promise");

const sanitizePem = (raw) => {
  if (!raw) return "";
  const trimmed = raw.trim().replace(/^"+|"+$/g, "");
  const withRealNewlines = trimmed.replace(/\\n/g, "\n");
  return withRealNewlines;
};

const main = async () => {
  const pem = sanitizePem(process.env.AIVEN_CA_CERT);
  const ssl =
    pem && pem.includes("BEGIN CERTIFICATE")
      ? {
          minVersion: "TLSv1.2",
          ca: Buffer.from(pem, "utf-8"),
          rejectUnauthorized: true,
        }
      : String(process.env.API_SSL_INSECURE || "").toLowerCase() === "true"
      ? { minVersion: "TLSv1.2", rejectUnauthorized: false }
      : undefined;

  console.log(
    "[TEST] host:",
    process.env.API_HOST,
    "port:",
    process.env.API_PORT,
    "ssl:",
    ssl ? "on" : "off"
  );

  const pool = mysql.createPool({
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT),
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
    ssl,
  });

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT 1 AS ok");
    console.log("[TEST] Query result:", rows);
    conn.release();
    await pool.end();
    console.log("[TEST] SUCCESS");
  } catch (err) {
    console.error("[TEST] ERROR", {
      name: err?.name,
      message: err?.message,
      code: err?.code,
      errno: err?.errno,
      sqlState: err?.sqlState,
      stack: err?.stack,
    });
    process.exit(1);
  }
};

main();
