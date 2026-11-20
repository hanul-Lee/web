# 검증 도구

검사는 `dist/`의 실제 공개 파일을 기준으로 합니다. 먼저 `npm run build`를 실행합니다. Node 22 이상과 로컬 Chrome이 필요하고, 세 엔진 검사는 `npx playwright install chromium webkit firefox`로 브라우저를 설치합니다.

| 명령 | 검사항목 |
| --- | --- |
| `npm test` | 공통 템플릿·프로젝트 본문·링크·이미지·메타데이터·폰트 문자 범위·해시·보호 스타일 |
| `npm run test:static` | JS 비활성화 본문·탐색, JS 활성화 확대·닫기·포커스 복귀 |
| `npm run test:layout` | 11개 페이지 × 15개 폭(320–2560px), 간격·이미지·메뉴·가로 넘침 |
| `npm run test:overlap` | 자연스러운 혼합 글꼴 제목의 오탐 방지, 실제 글자 겹침 검출 |
| `npm run test:viewer` | 세 엔진 × 320·390·1280px: 맞춤·원본·배율·키보드·드래그·포커스·컨트롤 경계 |
| `npm run test:flow` | 세 엔진의 키보드 이동·상세·확대·Escape·포커스·JS 비활성화 탐색 |
| `npm run test:browsers` | 세 엔진 × 19개 폭·모바일 터치·회전, JS·HTTP 오류·글자 겹침·왜곡·폰트·메뉴 |
| `npm run check:build` | 같은 소스로 재빌드한 dist와 폰트 메타데이터의 바이트 단위 재현성 |

`tests/helpers/site.cjs`가 경로·CDP 시작·페이지 로딩·이미지/폰트 대기를, `browser.cjs`가 HTTP 서버·세 엔진 생명주기를 공유합니다. 오류가 나도 브라우저와 서버를 종료합니다. `inspect-layout.cjs`는 폰트의 줄 여백을 제외한 실제 글자 영역을 비교합니다. 회귀 검사로 정상 제목과 의도적으로 겹친 글자 모두를 확인합니다.

환경 변수:

- `CHROME_PATH`: 로컬 Chrome 실행 파일 위치
- `AUDIT_BASE_URL`: 이미 실행 중인 서버. 생략하면 임시 서버를 자동 실행
- `AUDIT_ENGINES`: `chromium,webkit,firefox` 중 검사 엔진. 세 엔진이 기본값
- `AUDIT_PAGES`: 쉼표로 구분한 페이지. 브라우저·간격 검사에서 사용
- `AUDIT_WIDTHS`: 쉼표로 구분한 폭. 간격 검사에서 사용
- `AUDIT_REPORT`: 결과 JSON 경로. 기본값은 OS 임시 폴더

간격 검사는 모바일(800px 이하) 72px·데스크톱 140px, 인접 외부 마진 0을 확인합니다. 자료 이미지의 기본 16:9, TBM 세로 이미지 비율과 최대 높이, ERP·인트라넷·PSC의 고정 높이도 검증합니다. 나란한 카드의 제목 시작선과 실제 글 길이에 따른 자연스러운 흐름을 함께 확인합니다.

스타일 변경 전 `node tests/style-snapshot.cjs --write`, 변경 후 `node tests/style-snapshot.cjs`를 실행하면 같은 컴퓨터에서 33개 화면의 위치·크기·글꼴·색상을 비교합니다. `--existing-content`는 새 다음 사례 영역과 그에 따른 하단 높이 변화를 제외하고 기존 본문을 비교하는 이번 UI 변경 검증 옵션입니다. `STYLE_SNAPSHOT`으로 파일 경로를 지정합니다. 운영체제마다 폰트·스크롤바가 달라 로컬 스냅샷을 CI 기준으로 사용하지 않습니다.

CI는 Ubuntu·Node 24·Chrome·Playwright로 검사를 실행합니다. 브라우저 에뮬레이션은 실제 iPhone Safari·Samsung Internet의 브라우저 UI와 사용자 설정까지 재현하지 않으므로 최종 배포 후 기기 확인은 별도입니다.

`npm run test:security`는 정적 파일·비밀키 패턴·Actions 고정, HTTP 서버 접근 제한, 응답 헤더 없는 정적 호스트에서의 CSP 실효성을 검사합니다. 인라인 코드·허용하지 않은 스크립트와 요청·폼·base 변경은 차단되고 Google 태그·분석 수집은 허용되는지 확인합니다. GPC와 referrer도 검사하며 실제 분석 서비스에 테스트 이벤트를 보내지 않습니다.
