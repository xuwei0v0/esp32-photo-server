import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { filename } = req.query;

  const filePath = path.join('/tmp', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File Not Found' });
  }

  const file = fs.readFileSync(filePath);

  // 根据文件类型设置 Content-Type（默认 jpg）
  res.setHeader('Content-Type', 'image/jpeg');
  res.send(file);
}
