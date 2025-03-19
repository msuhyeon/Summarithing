import express from 'express';
import mecab from 'mecab-ya';
const app = express();
app.use(express.json());

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Server Start!');
});

app.post('/extract-keywords', async (req, res) => {
  try {
    const { text } = req.body;

    // 형태소 분석
    const result = await mecab.parse(text);
  } catch (error) {
    console.error(`Error in extract-keywords: ${error}`);
    throw new Error();
  }
});

app.listen(PORT, () => {
  console.log('서버 실행 중!!');
});
