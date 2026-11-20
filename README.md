# 이한울 포트폴리오

B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱 경험을 소개하는 정적 웹사이트입니다.

## 주요 파일

- `index.html`: 메인 페이지
- `project-*.html`: 프로젝트 상세 페이지 10개
- `case.js`: 사전 생성된 상세 페이지의 이미지 확대·진행 표시(약 4.3KB)
- `tools/render-case.js`: 빌드 전용 프로젝트 데이터·HTML 렌더링·다음 프로젝트 순서
- `script.js`: 공통 메뉴 동작
- `components.js`: 전체 페이지의 공통 헤더·푸터, 메뉴·PDF 링크 (메뉴 초기화를 위해 `script.js` 앞에서 불러옵니다.)
- `shared.scss` / `shared.css`: 공통 토큰·초기화·헤더·푸터·접근성 스타일
- `portfolio.scss` / `portfolio.css`: 메인 페이지 스타일 원본과 결과물
- `case.scss` / `case.css`: 상세 스타일 원본과 결과물
- `assets/portfolio.pdf`: 현재 지원용 다운로드 PDF. 제출할 때도 이 파일을 사용합니다.
- `assets/cases`, `assets/pp`: 현재 웹에서 참조하는 사례 이미지·설명도
- `assets/fonts`: 사이트 문자로 만든 가변 WOFF2 서브셋과 OFL 라이선스
- `tools/font-sources`: 재생성 가능한 원본 글꼴과 원본 CSS
- `.github/workflows/verify.yml`: push·PR 시 빌드·본문·폰트·상세 동작·레이아웃 자동 검증
- `tests`: 브라우저·탐색·간격 검증 도구
- `docs/submission-20261024.md`: 최신 PDF·웹 교체 범위와 검증 기록
- `docs/portfolio-final-review.md`: 과거 PDF·웹 검증 기록
- `tools/build_portfolio_pdf.py`: 과거 편집본 빌드 소스. 현재 제출 PDF 재생성에 사용하지 않습니다.
- `docs`의 면접 준비·리서치 원고는 과거 참고자료이며 최신 제출본과는 별도입니다.

최종 다운로드 PDF는 `assets/portfolio.pdf`에서 관리합니다. 2026-11-17 기준 제출본은 16쪽이며, 목차·홈·메뉴·브레드크럼·프로젝트·App Store·연락처 링크 51개와 PDF 책갈피(상위 8개, 하위 포함 16개)를 포함합니다. 원본에는 링크가 없어 macOS PDFKit으로 이전 판의 링크 위치를 옮기고, 상단 브레드크럼 링크는 새 페이지에서 다시 측정해 넣었습니다.

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
npm run build:styles
# 상세 스타일을 수정한 경우에만 추가 실행
npx sass case.scss case.css
```

공통·메인 CSS는 각각 컴파일하며 상세 CSS에서 메인 CSS를 `@import`하지 않습니다. 각 HTML이 공통 CSS와 해당 페이지 CSS를 순서대로 연결합니다. `.impact-flow strong`의 기존 선언은 `case.scss`와 `case.css`에서 모두 보호하며 `npm test`로 검증합니다. CSS 소스맵도 함께 유지합니다.

## 프로젝트 순서

현장 안전 기록 → 공통 UI 기준 → 댕냥실록 → TESCOM → SkyAutoNet → 통합 관리 플랫폼 → 비용·인원 ERP → 모바일 인트라넷 → PSC 플랫폼 → 개인 칸반

순서를 수정할 때는 `index.html`의 카드, `tools/render-case.js`의 프로젝트 번호와 `projectOrder`를 함께 확인합니다.

스카이오토넷 작업기간은 2021.09.01–2021.11.01, 테스콤은 2022.01.01–2022.06.01입니다.

## PDF 교체와 배포

새 제출본으로 교체할 때는 `assets/portfolio.pdf`를 갱신하고 `components.js`의 `pdfLink`와 `index.html` 본문의 PDF 링크에 있는 `v` 값을 함께 변경합니다. 브라우저에 이전 PDF가 남는 것을 줄이기 위한 버전입니다.

로컬 파일 수정은 공개 GitHub Pages에 자동 반영되지 않습니다. 공개 반영 여부는 저장소의 배포 상태와 실제 다운로드 파일을 확인합니다.

## 검증

검사 도구 사용법은 [tests/README.md](tests/README.md)를 참고합니다.

```sh
node tests/section-spacing.cjs
```

큰 영역 사이 간격은 모바일 72px, 데스크톱 140px이며 외부 마진을 중복 적용하지 않습니다. 이 검사 결과는 기본적으로 OS 임시 폴더에 저장됩니다.

## 디자인 기준

현재 브랜드·컬러·타입·반응형 그리드 기준은 [docs/design-direction.md](docs/design-direction.md)에 정리했습니다.

## 정적 페이지 빌드 및 이미지 관리

`tools/render-case.js`의 프로젝트 내용을 변경한 뒤 `npm run build`를 실행합니다. `tools/templates/project-*.html`을 바탕으로 본문·테마·공통 헤더와 푸터·다음 프로젝트 링크가 포함된 HTML 10개를 생성합니다. 생성된 상세 HTML은 JavaScript 없이도 읽을 수 있으며, `case.js`는 브라우저에서 이미지 확대와 진행 표시를 연결합니다. 공통 헤더·푸터를 수정할 때도 다시 빌드합니다.

빌드는 Node.js 22 이상과 로컬 Google Chrome을 사용합니다. 다른 위치에 설치한 경우 `CHROME_PATH`를 지정합니다. 첫 설정에서 Sass와 FontTools·Brotli를 설치합니다. 설치 후 빌드는 로컬 파일만 사용합니다.

```sh
npm ci
python3 -m venv .venv-fonts
.venv-fonts/bin/python -m pip install -r tools/font-requirements.txt
FONT_PYTHON=.venv-fonts/bin/python npm run build
```

`FONT_PYTHON`을 생략하면 기본 `python3`를 사용합니다. 빌드는 공통·메인 CSS → 상세 HTML → 글꼴 서브셋 순서로 실행합니다. Python은 3.9 이상을 사용합니다. 배포 주소 기본값은 `https://hanul-lee.github.io/web/`이며, 변경할 때 `SITE_URL=https://example.com/ npm run build`로 canonical·공유 이미지 URL·사이트맵·404 홈 링크를 함께 갱신합니다. `robots.txt`는 도메인 루트에서 적용되므로 `/web/robots.txt`를 사용하는 GitHub Pages 프로젝트 배포에서는 루트 robots 정책도 별도로 확인합니다.

이미지는 WebP의 480·960·1920·2560px 너비 변형(원본보다 확대하지 않음)을 사용합니다. HTML에는 `srcset`, `sizes`, 원본 비율의 `width`와 `height`를 빌드 시 넣습니다. 추가 프로젝트의 작은 목록 썸네일은 `sizes="64px"`로 지정합니다. 확대 보기는 가장 큰 파일을 사용합니다. `tools/image-manifest.json`은 원본과 변형 파일의 대응표입니다.

최적화 전 원본과 사용하지 않는 이미지 16개, `assets/__portfolio.pdf` 백업은 로컬의 `tools/image-sources/`로 옮겨 Git에서 제외했습니다. 현재 PDF인 `assets/portfolio.pdf`는 유지합니다. 원본을 재인코딩하려면 이 로컬 폴더를 보관하고 `npm run optimize:images`와 `npm run build`를 실행합니다. 새 체크아웃은 이미 생성된 WebP만으로 빌드할 수 있습니다. 원본 재인코딩에는 별도 보관한 원본 폴더가 필요합니다. `node_modules`도 추적에서 제외했으며 `npm ci`로 복원할 수 있습니다. 과거 Git 커밋의 파일은 그대로 남아 있습니다.

공유 이미지는 `assets/og-image.png`(1200×630)이며, 모든 HTML에 Open Graph와 Twitter 큰 이미지 메타데이터를 넣습니다. `sitemap.xml`에는 메인과 상세 10개를 포함하고 404는 제외합니다.

GA4의 `project_click`과 `next_project_click`은 `project_id`, `source_project`, `link_location`으로 클릭한 사례와 위치를 구분합니다. 연락처 클릭과 PDF enhanced measurement는 기존대로 유지합니다.

추가 검증:

```sh
npm test
node tests/static-site.cjs
npm run test:layout
```

정적 페이지 검사는 10개 상세의 JavaScript 비활성화 시 본문·탐색·반응형 이미지와, 활성화 시 중복 삽입 방지·이미지 확대·포커스 복귀를 확인합니다.


## 폰트 최적화와 자동 검증

`tools/subset-fonts.py`는 12개 HTML(404 포함)의 본문·대체 텍스트·메타데이터, 브라우저 JS의 버튼 문구와 CSS의 `content` 문자를 수집합니다. 원본 Manrope·Noto Sans KR에서 이 문자와 기본 ASCII를 남기고, 가변 굵기 축·레이아웃 기능·힌팅을 유지한 WOFF2를 생성합니다. `font-display: swap`과 원래 글꼴 이름·400–800 굵기 범위를 유지합니다. 원본은 `tools/font-sources/`, OFL 라이선스는 `assets/fonts/`에 보관합니다.

본문을 바꾼 뒤 전체 빌드를 실행하면 글꼴과 글꼴 CSS의 콘텐츠 해시, HTML의 CSS 버전이 함께 갱신됩니다. `npm test`는 사이트의 새 문자 누락, 글꼴 해시, 가변 굵기 보존, 폰트 CSS 용량을 검사합니다. 원본 폰트가 지원하지 않던 문자는 기존처럼 시스템 글꼴로 표시합니다. 폰트만 다시 생성할 때는 `FONT_PYTHON=.venv-fonts/bin/python npm run fonts`를 실행합니다.

GitHub Actions는 `main` push, PR, 수동 실행에 대해 `npm ci`와 고정 버전 Python 의존성 설치, 전체 빌드, 본문·이미지·폰트 검사, JavaScript 비활성화·확대 보기 검사, 11개 페이지 × 15개 폭의 레이아웃 검사를 실행합니다. 생성 파일을 빠뜨린 경우에도 실패합니다. 이 워크플로는 검증용이며 배포 설정은 기존 저장소의 배포 방식을 따릅니다.
