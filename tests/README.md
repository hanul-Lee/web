# 브라우저 회귀 검사

전체 11개 페이지에서 Chromium·WebKit·Firefox, 320–2560px의 19개 화면 폭을 검사합니다. 아이폰·갤럭시 프리셋의 터치·화면 밀도·가로 회전도 검사합니다.

검사항목: JavaScript/HTTP 오류, 웹폰트 로드, 이미지 누락·왜곡, 글자 겹침, 가로 넘침, 헤더 고정·높이, 상세 여백 정렬, 모바일 메뉴, 선택적 브라우저 API 미지원 시 다음 프로젝트 링크.

Node.js 20 이상과 Playwright가 필요합니다. 프로젝트 소스와 별도의 임시 디렉터리에 테스트 의존성을 설치할 수 있습니다.

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

3개 브라우저에서 추가 프로젝트의 즉시 노출·키보드 이동, 상세 이동, 핵심 요약에서 실제 화면으로 이동, 이미지 확대/닫기, Escape와 포커스 복귀, JavaScript 비활성화 시 프로젝트 노출를 검사합니다. `browser-audit.cjs`는 추가 프로젝트 목록을 포함한 전체 레이아웃도 검사합니다.

특정 페이지만 수정했다면 `AUDIT_PAGES=index.html`처럼 파일명을 지정해 관련 페이지를 재검사할 수 있습니다. 여러 파일은 쉼표로 구분합니다.
