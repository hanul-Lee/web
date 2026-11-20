# 보안 적용 범위

이 사이트는 정적 포트폴리오이며 서버 로그인·데이터베이스·사용자 파일 업로드 기능이 없습니다. 소스와 배포 HTML·로컬 미리보기·의존성·CI를 각각 검사합니다.

## 배포 HTML

모든 HTML(404 포함)의 리소스보다 앞에 CSP와 referrer 메타데이터를 생성합니다. 자체 JS와 Google 태그 호스트만 스크립트로 허용하고, 인라인 JS·이벤트 속성·eval·임의의 외부 스크립트·폼 제출·base 변경·object·iframe을 제한합니다. Google 분석의 비광고 수집 경로는 허용합니다. 외부로 보내는 referrer는 origin만 남기며 새 창 링크는 noopener·noreferrer를 사용합니다.

프로젝트 테마의 CSS 변수·확대 배율과 404 스타일 때문에 인라인 **스타일**은 허용합니다. 인라인 **스크립트**는 허용하지 않습니다. GA4의 공개 측정 ID는 비밀키가 아니며, DNT와 Global Privacy Control(GPC) 추적 거부 설정에서는 태그를 로드하지 않습니다.

세 브라우저에서 응답 CSP 헤더를 제거한 가상 정적 호스트를 테스트해 HTML 메타 정책 자체가 동작하는지 확인합니다. 실제 GA에 테스트 이벤트를 보내지 않고 태그·수집 경로를 가짜 응답으로 검증합니다. 참고: [Google의 비광고 GA CSP 지침](https://developers.google.com/tag-platform/security/guides/csp), [CSP 메타 정책](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

## 로컬 미리보기 서버

127.0.0.1에만 바인딩하며 정확한 로컬 Host와 GET·HEAD만 허용합니다. 숨김 파일·경로 이탈·외부를 가리키는 심볼릭 링크·허용하지 않은 파일 형식을 차단합니다. 파일이 없어지는 경우에도 서버가 중단되지 않도록 처리합니다. nosniff·frame-ancestors·X-Frame-Options·Permissions-Policy 응답 헤더도 적용합니다. 문서 CSP는 HTML에만 적용하고 PDF에는 적용하지 않아 기본 PDF 뷰어와 충돌하지 않도록 합니다.

**이 서버의 응답 헤더가 GitHub Pages에도 자동 적용되는 것은 아닙니다.** 공개 결과물에 포함되는 정책은 HTML CSP와 referrer입니다. frame-ancestors·nosniff 등 응답 헤더가 필요한 보호는 실제 호스팅 계층에서 별도로 설정·확인해야 합니다. frame-ancestors를 작동하지 않는 meta 태그로 넣어 보호되는 것처럼 표시하지 않습니다.

## 소스·배포·빌드

빌드 자산은 src/assets 안의 정상 경로만 읽습니다. 정적 결과물에 소스·검토 문서·원본 폰트·인증서·키·숨김 파일·심볼릭 링크가 들어가는지 검사합니다. 프로젝트 링크 프로토콜과 새 창 옵션도 검사하며, 다음 사례 제목·요약은 textContent로 넣습니다.

소스 텍스트와 배포 파일에서 개인키·GitHub 토큰·AWS 액세스 키·Google API 키의 알려진 패턴을 검사합니다. 탐지 시 파일·줄·종류만 출력하고 값을 출력하지 않습니다. 이 검사는 모든 비밀정보나 과거 Git 이력을 판별하는 완전한 스캐너는 아닙니다. 로컬 .env·개인키 파일은 Git에서 제외합니다.

## 의존성과 CI

GitHub Actions는 실제로 확인한 커밋 SHA로 고정합니다. 검증 작업은 저장소 읽기 권한만 사용하고, 배포 권한은 main 검증 후 별도 배포 작업에만 부여합니다. npm 설치 스크립트는 자동 실행하지 않고 필요한 Playwright 브라우저 설치만 명시적으로 실행합니다.

CI에서 npm 잠금 의존성과 scripts/font-requirements.txt의 FontTools·Brotli 고정 버전을 검사합니다. Dependabot은 npm·Python·Actions 업데이트를 주간 PR로 제안하며 자동 병합하지 않습니다.

```sh
npm run test:security
npm audit
python -m pip_audit -r scripts/font-requirements.txt --no-deps --disable-pip
```

마지막 명령은 별도 환경에 pip-audit 2.9.0을 설치한 뒤 실행합니다. `test:security`는 먼저 `npm run build`와 Playwright 브라우저 설치가 필요합니다. 로컬 변경은 커밋·배포 전까지 공개 사이트에 반영되지 않습니다.
