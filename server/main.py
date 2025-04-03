from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter
from dotenv import load_dotenv

from openai import OpenAI
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
    summary = call_openai(data.content)

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

client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

def call_openai(text: str) -> str:
    try: 
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "넌 긴 글을 요약하는 전문가야. 다음 텍스트를 보고 중요 포인트를 잘 찾아서 친절한 태도로 5문장으로 요약해줘."},
                {"role": "user", "content": text}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        print("OpenAI 호출 에러:", e)
        return "요약 중 오류 발생"