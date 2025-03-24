from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중엔 * 허용
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    content: str

@app.post("/analyze")
async def analyze_text(data: TextInput):
    result = extract_keyword(data.content)
    return {
        "message": "잘 받음!",
        "keywords": result,
    }

def extract_keyword(text: str, keyword_count: int = 4) -> list[str]:
    okt = Okt()
    nouns = okt.nouns(text)
    filtered = [word for word in nouns if len(word) > 1]
    frequency = Counter(filtered)
    keywords = [word for word, _ in frequency.most_common(keyword_count)]
    print("추출된 키워드:", keywords)
    return keywords
