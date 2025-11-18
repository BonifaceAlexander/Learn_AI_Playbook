export default function handler(req, res) {
  const { prompt } = req.body || {}
  res.status(200).json({ output: "[MOCK] " + (prompt || "no prompt provided") })
}
