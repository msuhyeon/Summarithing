import express from 'express';
import cors from 'cors';
import mecab from 'mecab-ya';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Server Start!');
});

app.post('/extract-keywords', async (req, res) => {
  try {
    const { text } = req.body;

    // 형태소 분석
    const result = mecab.nouns(text, function (err, result) {
      console.log(result);
    });

    res.json({ keywords: result });
  } catch (error) {
    console.error(`Error in extract-keywords: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log('서버 실행 중!!');
});
