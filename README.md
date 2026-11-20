# 이한울 포트폴리오

B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱 경험을 소개하는 정적 웹사이트입니다. 원본은 `src/`, 빌드·관리 도구는 `scripts/`, 공개 배포 파일은 `dist/`에서 관리합니다.

## 구조

```text
src/
  content/       프로젝트 데이터·페이지 메타데이터·이미지 대응표
  templates/     메인 HTML·공통 상세 HTML 템플릿 1개
  scripts/       메뉴·이미지 확대·진행 표시·GA4
  styles/        shared.scss / portfolio.scss / case.scss
  assets/        이미지·현재 PDF·글꼴 라이선스 등 공개 자산 원본
  fonts/original/ 원본 가변 WOFF2와 원본 글꼴 CSS
scripts/
  lib/           공통 경로·Chrome·정적 서버
  maintenance/   사용하지 않는 스타일 검사
  legacy/pdf/    과거 26쪽 PDF 작업 도구
  build-*.cjs    HTML·스타일·글꼴 빌드
  render-project.js 프로젝트 HTML 렌더링
  subset-fonts.py / optimize-images.cjs
tests/          본문·폰트·디자인·레이아웃·브라우저·확대 UI 검사
docs/
  design/        현재 디자인 기준
  analytics.md   분석 설정
  archive/       과거 검토 문서·면접 자료·화면 캡처
dist/           생성된 공개 파일, Git 추적 제외
.build/         빌드 검증 메타데이터, Git 추적 제외
.local/         로컬 원본 이미지·미사용 백업, Git 추적 제외
```

`dist/`의 파일만 웹에 배포합니다. 소스·원본 폰트·검토 문서·빌드 스크립트는 복사하지 않습니다. 페이지와 자산의 공개 경로는 기존 `index.html`, `project-*.html`, `assets/...`를 유지하므로 URL에 `/dist/`가 붙지 않습니다.

## 설치와 실행

Node.js 22 이상, Python 3.9 이상, Google Chrome이 필요합니다.

```sh
npm ci --ignore-scripts
python3 -m venv .venv-fonts
.venv-fonts/bin/python -m pip install -r scripts/font-requirements.txt
npm run build
npm run preview
```

`http://127.0.0.1:4173`에서 확인합니다. 기본 포트는 `PORT`로 바꿀 수 있습니다. 빌드는 `.venv-fonts/bin/python`을 자동으로 찾으며, 다른 Python은 `FONT_PYTHON`, 다른 Chrome은 `CHROME_PATH`로 지정합니다. 의존성 설치 후 빌드는 로컬 파일만 사용합니다.

## 수정 위치

| 수정 대상 | 원본 |
| --- | --- |
| 메인 소개·프로젝트 카드 | `src/templates/index.html` |
| 상세 본문·프로젝트 순서 | `src/content/projects.json` |
| 상세 설명·공유 설명·외부 링크·바로가기 | `src/content/page-meta.json` |
| 모든 상세의 공통 골격 | `src/templates/project.html` |
| 상세 HTML 렌더링 | `scripts/render-project.js` |
| 공통 헤더·푸터·PDF 링크 | `src/scripts/components.js` |
| 이미지 확대·진행 표시 | `src/scripts/case.js` |
| 메뉴·분석 이벤트 | `src/scripts/script.js`, `src/scripts/analytics.js` |
| 스타일 | `src/styles/` |
| 지원용 PDF | `src/assets/portfolio.pdf` |

수정 후 `npm run build`를 실행합니다. 메인과 상세는 본문·헤더·푸터·탐색 링크를 HTML로 사전 생성합니다. 브라우저 JS는 메뉴와 이미지 확대 등의 상호작용만 담당합니다. 프로젝트마다 달랐던 바로가기·공개 설명과 외부 링크는 메타데이터에 보존합니다.

SCSS는 세 파일 모두 빌드하며 공통 CSS와 페이지별 CSS를 HTML에서 직접 연결합니다. `.impact-flow strong`의 기존 선언, 특히 `font-size: clamp(28px, 2vw, 50px);`와 `line-height: 1.1;`은 소스와 생성 CSS에서 모두 보호합니다. `npm test`가 기존 선언 전체를 비교합니다. `npm run build:styles`는 스타일만 갱신합니다.

프로젝트 순서는 현장 안전 기록 → 공통 UI 기준 → 댕냥실록 → TESCOM → SkyAutoNet → 통합 관리 플랫폼 → 비용·인원 ERP → 모바일 인트라넷 → PSC 플랫폼 → 개인 칸반입니다. 변경할 때 `projects.json`의 `projectOrder`·프로젝트 번호와 메인 카드 순서를 함께 확인합니다.

## 이미지·글꼴·PDF

이미지는 `src/content/image-manifest.json`을 바탕으로 `srcset`, 표시 크기에 맞는 `sizes`, `width`·`height`를 생성합니다. 페이지에서 참조한 이미지와 그 변형만 `dist/assets`로 복사합니다. 최적화 전 원본과 미사용 이미지·백업 PDF는 `.local/image-sources/`에 로컬 보관합니다. 재인코딩은 원본이 있을 때 `npm run optimize:images`로 실행하고 다시 빌드합니다.

원본 글꼴은 `src/fonts/original/`에 보관합니다. 빌드는 실제 HTML·대체 텍스트·버튼 문구·CSS 문자를 수집해 가변 굵기와 레이아웃 기능·힌팅을 유지한 서브셋을 `dist/assets/fonts`에 생성합니다. 글꼴 파일과 CSS 버전은 콘텐츠 해시를 사용합니다. 원본이 지원하지 않던 문자는 시스템 글꼴을 사용합니다. 폰트만 갱신하려면 `npm run fonts`를 실행합니다.

이미지 확대는 화면 맞춤·원본 크기·확대/축소를 지원합니다. 키보드 `+`·`-`는 배율, `0`은 화면 맞춤, `1`은 원본 크기, Escape는 닫기입니다. 큰 이미지는 마우스 드래그 또는 터치 스크롤로 이동합니다. 닫으면 확대 버튼으로 포커스가 돌아옵니다.

현재 지원용 PDF는 `src/assets/portfolio.pdf`입니다. 2026-11-17 제출본은 16쪽이며 링크 51개와 책갈피를 포함합니다. 과거 26쪽용 `scripts/legacy/pdf/`는 현재 PDF를 재생성하는 도구가 아닙니다. PDF를 교체할 때 메인 템플릿과 `components.js`의 PDF 버전을 같이 갱신합니다.

## 검사

```sh
npm test
npm run test:static
npm run test:layout
npx playwright install chromium webkit firefox
npm run test:overlap
npm run test:viewer
npm run test:flow
npm run test:browsers
npm run check:build
```

브라우저 검사는 임시 HTTP 서버를 자동으로 열고 종료합니다. 외부 서버는 `AUDIT_BASE_URL`, 특정 엔진은 `AUDIT_ENGINES=firefox`, 특정 페이지는 `AUDIT_PAGES=index.html`로 지정합니다. 자세한 항목은 [검사 안내](tests/README.md)를 참고합니다.

`npm run prune:styles`는 실제 HTML·동작 코드에 없는 클래스의 선택자 후보만 보고합니다. 삭제하려면 빌드 후 `npm run prune:styles -- --write`를 실행하고 화면 비교와 전체 검사를 수행합니다. 보호된 impact 선언과 복잡한 조건 선택자는 보존합니다. 임의의 CSS 자동 병합은 하지 않습니다.

## 배포

`.github/workflows/verify.yml`은 main push·PR·수동 실행에서 빌드, 재현성, 본문·폰트·보호 스타일, JS 비활성화, 15개 화면 폭, 세 브라우저와 확대 UI를 검증합니다. main 검증 성공 후 `dist/` 아티팩트만 GitHub Pages에 배포하며 PR은 배포하지 않습니다.

**이 구조를 처음 배포하기 전에 저장소 Settings → Pages → Build and deployment → Source를 GitHub Actions로 설정해야 합니다.** 브랜치 루트 배포를 계속 사용하면 소스 트리가 공개 결과물로 처리됩니다. 관련 동작은 [GitHub 공식 배포 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)를 참고합니다. 로컬 정리 작업은 GitHub 설정이나 공개 사이트를 변경하지 않습니다.

기본 배포 주소는 `https://hanul-lee.github.io/web/`입니다. 변경하면 `SITE_URL=https://example.com/ npm run build`로 canonical·공유 이미지 URL·사이트맵·404 홈 링크를 함께 갱신합니다. GitHub Pages 프로젝트 사이트의 `robots.txt`는 도메인 루트 정책을 대체하지 않습니다.

현재 디자인 기준은 [디자인 방향](docs/design/direction.md), 분석 설정은 [GA4 안내](docs/analytics.md)에 있습니다. GA4는 프로젝트 클릭·다음 프로젝트 클릭·연락처 클릭을 기록하며 PDF 다운로드는 enhanced measurement를 사용합니다.

## 보안 검사

`npm run test:security`는 비밀키 패턴·배포 파일·고정 Actions 버전·서버의 경로/심볼릭 링크/Host/메서드 제한과, 세 브라우저의 CSP·referrer·GPC 동작을 검사합니다. CI에는 npm·Python 의존성 감사도 포함합니다. 적용 범위와 정적 호스팅의 헤더 제한은 [보안 안내](docs/security.md)에 정리했습니다.
