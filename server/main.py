from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter


app = FastAPI()

# CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: 배포 시엔 프론트 도메인으로 제한
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    content: str

@app.post("/analyze")
async def analyze_text(data: TextInput):
    # KoNLPy 사용하여 사용 빈도 높은 키워드 추출 예정

    result = extract_keyword(TextInput)

    return {
        "message": "잘 받음!",
        "keywords": result,
    }


def extract_keyword(text: str, keyword_count: int=4) -> list[str]:
    okt = Okt()

    nouns = okt.nouns(text)
    frequency = Counter(nouns)
    
    # [담을 것(결과값) for 변수 in 리스트 if 조건]
    keywords = [word for word,_ in nouns]

    print(keywords)

    return {
        "keywords": keywords,
    }