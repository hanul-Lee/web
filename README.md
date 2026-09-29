# 이한울 포트폴리오

## 프로젝트 개요

정적 HTML/CSS/JavaScript로 구성한 B2B · Data UX 프로덕트 디자이너 포트폴리오입니다. 메인 페이지는 문제를 구조화하고 사용자의 다음 행동을 명확하게 만드는 디자인 관점을 보여주며, 각 프로젝트 페이지는 문제 정의, 설계 결정, 결과와 회고를 사례 중심으로 설명합니다.

- `index.html`: 메인 포트폴리오 페이지
- `project-*.html`: 프로젝트별 공통 케이스 스터디 템플릿
- `case.js`: 프로젝트 정보, 케이스 스터디 내용, 다음 프로젝트 순서 렌더링
- `case.css`: 케이스 스터디 전용 레이아웃과 컴포넌트 스타일
- `assets/portfolio.pdf`: 최신 포트폴리오 PDF

## 프로젝트 순서

메인 카드와 케이스 스터디의 `PROJECT` 번호 및 다음 프로젝트 링크는 아래 순서를 따릅니다.

`01 대시보드 → 02 B2B 플랫폼 → 03 모바일 업무 포털 → 04 칸반보드 → 05 TBM 현장 기록 → 06 반응형 웹 → 07 PSC 플랫폼 → 08 디자인 시스템 → 09 SkyAutoNet → 10 반려동물 건강관리`

번호와 다음 프로젝트를 변경할 때는 [index.html](index.html)의 카드 순서와 [case.js](case.js)의 `projectOrder`, 각 프로젝트 데이터의 `no`와 `next`를 함께 확인합니다.

## 로컬 실행

HTML 파일을 직접 열 수도 있지만, 이미지와 페이지 이동을 포함한 전체 동작은 정적 서버에서 확인하는 것을 권장합니다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173/index.html`을 엽니다.

## 스타일 파일 구분

- `portfolio.scss`: 현재 포트폴리오 메인 화면의 스타일 원본입니다. 사람이 수정하는 파일이며, 섹션별 한글 주석과 SCSS 중첩 문법을 사용합니다.
- `portfolio.css`: `portfolio.scss`를 브라우저가 읽을 수 있도록 변환한 결과물입니다. `index.html`이 실제로 불러오는 파일입니다.
- `case.scss`, `case.css`: 프로젝트 상세 페이지 스타일 원본과 컴파일 결과입니다. `case.css`에서 공통 스타일인 `portfolio.css`를 불러옵니다.
- `styles.scss`, `styles.css`: 초기 랜딩 페이지에서 사용하던 이전 스타일입니다. 현재 포트폴리오 페이지에서는 불러오지 않습니다.

## SCSS 컴파일

Sass가 설치된 환경에서 다음 명령으로 CSS를 생성할 수 있습니다.

```bash
sass portfolio.scss portfolio.css
sass case.scss case.css
```

파일 변경을 계속 감시하려면:

```bash
sass --watch portfolio.scss:portfolio.css
```

기존 `styles.scss:styles.css` 감시 작업은 현재 페이지에 영향을 주지 않지만, 혼동을 피하려면 종료하는 것을 권장합니다.

Sass가 전역 설치되어 있지 않다면 `npx`로 실행할 수 있습니다.

```bash
npx --yes sass portfolio.scss portfolio.css
```

`portfolio.scss`를 수정한 뒤에는 브라우저가 실제로 불러오는 `portfolio.css`도 반드시 갱신합니다. 케이스 스터디를 수정할 때는 별도 컴파일 없이 `case.js`를 직접 수정하면 됩니다.

## 현재 프로젝트 상태

- 칸반보드는 UX 구조와 UI를 설계하고 AI의 도움을 받아 핵심 흐름을 프로토타이핑한 진행 중인 개인 프로젝트입니다.
- 칸반 검증 상태는 기존 README(정식 테스트 전)와 PDF·웹(테스트 완료)이 불일치합니다. 현재 웹은 개인 프로토타입의 설계·구현 범위만 소개하고, 원본 기록 확인 전까지 정량 성과를 표시하지 않습니다.
- 프로젝트 페이지의 `PROJECT 01`부터 `PROJECT 10` 표기는 `case.js`의 프로젝트 데이터에서 동적으로 생성됩니다.
- PDF 링크는 `assets/portfolio.pdf`를 가리키므로 PDF를 교체할 때 파일명을 유지하면 별도 HTML 수정 없이 최신 파일이 연결됩니다.

## 2026-09-29 개편

직무·경력 표현, 근거가 불분명한 수치, 첫 화면과 모바일 탐색을 정리했습니다. 포지셔닝 근거와 파일별 변경, PDF 후속 과제는 [웹사이트 개편 기록](website-update-notes.md)에 있습니다.
