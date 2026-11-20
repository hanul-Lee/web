# 브라우저 회귀 검사

전체 11개 페이지에서 Chromium·WebKit·Firefox, 320–2560px의 19개 화면 폭을 검사합니다. 아이폰·갤럭시 프리셋의 터치·화면 밀도·가로 회전도 검사합니다.

검사항목: JavaScript/HTTP 오류, 웹폰트 로드, 이미지 누락·왜곡, 글자 겹침, 가로 넘침, 헤더 고정·높이, 상세 여백 정렬, 모바일 메뉴, 선택적 브라우저 API 미지원 시 다음 프로젝트 링크.

Node.js 22 이상과 Playwright가 필요합니다. 프로젝트 소스와 별도의 임시 디렉터리에 테스트 의존성을 설치할 수 있습니다.

```sh
npm install --prefix /tmp/portfolio-qa playwright@1.63.0
/tmp/portfolio-qa/node_modules/.bin/playwright install chromium webkit firefox
```

사이트 루트에서 서버를 실행한 뒤 별도 터미널에서 검사를 실행합니다.

```sh
python3 -m http.server 4173
```

```sh
NODE_PATH=/tmp/portfolio-qa/node_modules node tests/browser-audit.cjs
```

`AUDIT_BASE_URL`로 검사할 서버를 지정할 수 있습니다. `CHROME_PATH`를 설정하면 Playwright Chromium 대신 해당 Chrome 실행 파일을 사용합니다. 결과 JSON은 OS 임시 폴더의 portfolio-browser-audit.json에 저장되며 `AUDIT_REPORT`로 경로를 바꿀 수 있습니다. 실패 시 종료 코드는 1입니다.

에뮬레이션은 실제 iPhone Safari·iOS Chrome·Samsung Internet 앱의 브라우저 UI, 강제 다크 모드, 사용자 설정을 완전히 재현하지 않습니다. 배포 후 실제 기기 확인도 필요합니다. 640px 검사는 1280px 화면에서 200% 확대했을 때의 레이아웃 폭을 포함하지만 실제 확대 조작 시험은 아닙니다.

## 채용 검토 탐색 흐름

`NODE_PATH=/tmp/portfolio-qa/node_modules node tests/recruiter-flow.cjs`

3개 브라우저에서 추가 프로젝트의 즉시 노출·키보드 이동, 상세 이동, 핵심 요약에서 실제 화면으로 이동, 이미지 확대/닫기, Escape와 포커스 복귀, JavaScript 비활성화 시 프로젝트 노출을 검사합니다. `browser-audit.cjs`는 추가 프로젝트 목록을 포함한 전체 레이아웃도 검사합니다.

특정 페이지만 수정했다면 `AUDIT_PAGES=index.html`처럼 파일명을 지정해 관련 페이지를 재검사할 수 있습니다. 여러 파일은 쉼표로 구분합니다.

## 큰 영역 간격 실측

`node tests/section-spacing.cjs`는 로컬 Chrome의 개발자 도구 프로토콜로 메인과 10개 상세 페이지를 320–2560px의 15개 폭에서 검사합니다. 가장 바깥 영역·대표 프로젝트·상세 스토리 영역 사이의 `getBoundingClientRect()` 거리를 측정하고, 모바일(800px 이하) 72px, 데스크톱 140px 범위와 인접 영역의 외부 마진 0을 확인합니다. 폰트와 이미지를 로드한 뒤 측정하며, 가로 넘침과 누락된 이미지도 검사합니다. `CHROME_PATH`로 실행 파일, `AUDIT_REPORT`로 결과 경로를 지정할 수 있습니다.

대표 프로젝트의 행 간격은 390px·1280px에서 64px·80px로 별도 검사합니다. 전체 상세의 순차 번호와 모바일 메뉴의 콘텐츠 너비·오른쪽 정렬도 검사합니다. 테스트 Chrome은 매 실행마다 별도의 임시 프로필과 임의 포트를 사용합니다.

카드 2·3번의 화면 박스 높이와 나란한 배치의 설명·제목 시작선을 검사합니다. 결정 사항과 링크는 각 카드의 텍스트 길이에 따라 자연스럽게 이어지는지 확인합니다. 상세 설계 화면은 1100px 이하에서 텍스트 아래에 이미지가 놓이고, 다음 사례 화살표는 제목 뒤 8px 간격인지 검사합니다. 989px·1010px도 포함합니다.

상세 설계 자료는 기본 16:9 프레임과 TBM 세로 자료의 390:810 비율·450px 최대 높이를 검사하며, ERP는 280px(600px 이하 220px), 인트라넷·PSC는 440px(600px 이하 380px)의 현재 고정 높이를 검사합니다. 같은 행에 배치된 카드의 높이를 비교하고, 세로로 쌓인 카드의 설명 길이는 각각 허용합니다. 칸반 상단의 메타데이터 간격은 현재 디자인의 28px를 기준으로 검사합니다. 이미지 아래 설명의 시작선, 초기안·최종안 이미지 높이와 나란한 배치의 정렬도 확인합니다.

상세 상단은 소개·바로가기와 대표 이미지가 같은 그룹에 있는지, 참여 정보가 별도 전체 너비 그룹인지 확인합니다. 800px 이하의 세로 배치와 801px 이상의 나란한 배치·이미지 상단 정렬을 검사하며 1057px·1100px·1101px을 포함합니다.


## 기본 검사와 CI

`npm test`는 프로젝트 데이터·HTML·이미지·PDF 링크, 우선 로딩 이미지 개수, 브라우저 런타임 용량, 보호된 `.impact-flow strong` 선언, CSS 직접 연결, 폰트 문자 범위·해시·가변 굵기 축을 검사합니다. `npm run test:static`은 JavaScript 비활성화 상태의 10개 상세 본문·탐색과, 활성화 상태의 중복 생성 방지·확대 보기·포커스 복귀를 검사합니다.

`.github/workflows/verify.yml`은 Ubuntu·Node 24·Chrome에서 전체 빌드와 `npm test`, `npm run test:static`, `npm run test:layout`을 실행합니다. 별도의 Playwright 설치 없이 실행되며, 생성 파일과 소스가 다르거나 새 폰트 파일을 커밋에서 빠뜨리면 실패합니다.

## 스타일 변경 전후 비교

같은 컴퓨터의 Chrome에서 스타일 변경 전 `node tests/style-snapshot.cjs --write`, 변경 후 `node tests/style-snapshot.cjs`를 실행합니다. 390·801·1280px에서 11개 페이지 전체 요소의 실제 위치·크기와 계산된 글꼴·색상·레이아웃 속성을 비교합니다. 자동 여백의 계산 문자열은 Chrome의 레이아웃 상태에 따라 달라질 수 있어 실제 좌표로 검증합니다. 스냅샷은 OS 임시 폴더에 저장하며 `STYLE_SNAPSHOT`으로 경로를 지정할 수 있습니다. 메인 페이지에서 요청한 폰트 파일 수·바이트도 Chrome Network 이벤트로 기록합니다. 이 비교는 로컬 리팩터링 검증용이며 운영체제가 다른 CI에는 로컬 기준 스냅샷을 전달하지 않습니다.
