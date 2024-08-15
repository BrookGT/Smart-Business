/**
 * Application health check endpoint used by Docker and load balancers.
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  return res.status(200).json({
    status: "ok",
    service: "smart-business-web",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
