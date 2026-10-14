# 이한울 포트폴리오

B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱 경험을 소개하는 정적 웹사이트입니다.

## 주요 파일

- `index.html`: 메인 페이지
- `project-*.html`: 프로젝트 상세 페이지 10개
- `case.js`: 프로젝트 내용과 다음 프로젝트 순서, 화면 확대 기능
- `script.js`: 공통 메뉴 동작
- `portfolio.scss` / `portfolio.css`: 메인·공통 스타일 원본과 결과물
- `case.scss` / `case.css`: 상세 스타일 원본과 결과물
- `assets/portfolio.pdf`: 현재 지원용 다운로드 PDF. 제출할 때도 이 파일을 사용합니다.
- `assets/cases`, `assets/pp`: 현재 웹에서 참조하는 사례 이미지·설명도
- `assets/fonts`: 자체 호스팅 글꼴과 라이선스
- `tests`: 브라우저·탐색·간격 검증 도구
- `docs`: 기존 면접 준비·리서치 원고. 과거 참고자료이며 최신 제출본과는 별도입니다.

이전 검토 출력물, 중복 수정안, 구버전 PDF, 사용하지 않는 이미지·스타일, 자동 편집 기록은 정리했습니다. 최종 다운로드 PDF는 `assets/portfolio.pdf` 한 곳에서 관리합니다.

## 로컬 확인

```sh
python3 -m http.server 4173
```

`http://127.0.0.1:4173/index.html`을 엽니다.

## 스타일 수정

프로젝트의 Sass를 설치하거나 재설치하려면 다음 명령을 사용합니다.

```sh
npm ci
```

SCSS 수정 후 실제 웹에서 불러오는 CSS도 갱신합니다.

```sh
npx sass portfolio.scss portfolio.css
npx sass case.scss case.css
```

CSS 소스맵은 스타일 원본을 찾는 데 사용하므로 현재 파일을 함께 유지합니다.

## 프로젝트 순서

통합 플랫폼 → TBM 현장 안전 기록 → 비용·인원 ERP → 공통 UI 기준 → 모바일 인트라넷 → 개인 칸반 → 반응형 웹 → PSC 플랫폼 → 스카이오토넷 → 반려동물 건강관리

순서를 수정할 때는 `index.html`의 카드, `case.js`의 프로젝트 번호와 `projectOrder`를 함께 확인합니다.

스카이오토넷 작업기간은 2021.09.01–2021.11.01, 테스콤은 2022.01.01–2022.06.01입니다.

## PDF 교체와 배포

새 제출본으로 교체할 때는 `assets/portfolio.pdf`를 갱신하고 모든 HTML의 PDF 링크에 있는 `v` 값을 함께 변경합니다. 브라우저에 이전 PDF가 남는 것을 줄이기 위한 버전입니다.

로컬 파일 수정은 공개 GitHub Pages에 자동 반영되지 않습니다. 공개 반영 여부는 저장소의 배포 상태와 실제 다운로드 파일을 확인합니다.

## 검증

검사 도구 사용법은 [tests/README.md](tests/README.md)를 참고합니다.

```sh
node tests/section-spacing.cjs
```

큰 영역 사이 간격은 모바일 72px, 데스크톱 140px이며 외부 마진을 중복 적용하지 않습니다. 이 검사 결과는 기본적으로 OS 임시 폴더에 저장됩니다.

## 디자인 기준

현재 브랜드·컬러·타입·반응형 그리드 기준은 [docs/design-direction.md](docs/design-direction.md)에 정리했습니다.
