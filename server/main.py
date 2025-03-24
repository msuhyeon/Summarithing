from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter
from dotenv import load_dotenv

import openai
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #TODO: 배포 시 url로 수정
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    content: str

@app.post("/summarize")
async def analyze_text(data: TextInput):
    keywords = extract_keyword(data.content)
    summary = await call_openai(data.content)

    return {
        "keywords": keywords,
        "summary": summary
    }

def extract_keyword(text: str, keyword_count: int = 4) -> list[str]:
    okt = Okt()
    nouns = okt.nouns(text)
    filtered = [word for word in nouns if len(word) > 1]
    frequency = Counter(filtered)
    keywords = [word for word, _ in frequency.most_common(keyword_count)]
    return keywords

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def call_openai(text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "넌 긴 글을 요약하는 전문가야. 다음 텍스트를 보고 중요 포인트를 잘 찾아서 3줄로 요약해줘."},
            {"role": "user", "content": text}
        ],
        temperature=0.7,
        max_tokens=500
    )
    return response.choices[0].message["content"]