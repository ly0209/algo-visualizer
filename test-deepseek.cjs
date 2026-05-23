const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
}

const API_KEY = env.VITE_DEEPSEEK_API_KEY;
const BASE_URL = env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = env.VITE_DEEPSEEK_MODEL || 'deepseek-chat';

async function test() {
  console.log('正在测试 DeepSeek API 连通性...\n');
  console.log('请求地址: ' + BASE_URL + '/v1/chat/completions');
  console.log('模型: ' + MODEL + '\n');

  const res = await fetch(BASE_URL + '/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: '现在使用的模型是什么？说出自己详细的模型名字比如deepseekv4-flash等' }],
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('请求失败:', res.status, err.error?.message || res.statusText);
    process.exit(1);
  }

  const data = await res.json();
  console.log('连接成功!\n');
  console.log('DeepSeek 回复:', data.choices[0].message.content);
  console.log('\nToken 使用情况:', JSON.stringify(data.usage, null, 2));
}

test().catch((err) => {
  console.error('发生错误:', err.message);
});
