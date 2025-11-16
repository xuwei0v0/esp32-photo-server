import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { filename, image_base64 } = req.body;
  if (!filename || !image_base64) {
    return res.status(400).json({ error: 'Missing filename or image_base64' });
  }

  // 解码 Base64
  const buffer = Buffer.from(image_base64, 'base64');

  // 保存到 /tmp（Vercel Serverless 临时存储）
  const filePath = path.join('/tmp', filename);
  fs.writeFileSync(filePath, buffer);

  const url = `https://${req.headers.host}/api/files/${filename}`;

  res.status(200).json({
    url,
    notice: "文件已保存到 Serverless /tmp 中（短暂有效，不会持久保存）"
  });
}
