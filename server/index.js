import express from 'express';
import cors from 'cors';
import mecab from 'mecab-ya';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Server Start!');
});

app.post('/extract-keywords', async (req, res) => {
  try {
    const { text } = req.body;

    // 형태소 분석
    mecab.nouns(text, function (err, result) {
      if (err) {
        console.error('Error in mecab function:', err);
        return res.status(500).json({ error: 'Failed to process text' });
      }
      res.json({ keywords: result });
    });
  } catch (error) {
    console.error(`Error in extract-keywords: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log('서버 실행 중!!');
});
