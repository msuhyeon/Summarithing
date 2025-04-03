client-next/
├── public/ # 정적 파일 저장 디렉토리
├── src/
│ ├── app/ # Next.js의 app 라우터가 위치하는 폴더
│ │ ├── layout.js # 공통 레이아웃
│ │ ├── page.js # 루트 페이지
│ │ └── ... # 기타 라우트 세그먼트
│ ├── components/ # 재사용 가능한 컴포넌트들
│ ├── lib/ # 유틸리티, API 호출 등 로직
│ └── styles/ # 글로벌 및 컴포넌트별 스타일 파일
├── next.config.js # Next.js 구성 파일
└── package.json # 프로젝트 의존성 및 스크립트
