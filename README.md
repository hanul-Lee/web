# 이한울 포트폴리오

## 스타일 파일 구분

- `portfolio.scss`: 현재 포트폴리오 메인 화면의 스타일 원본입니다. 사람이 수정하는 파일이며, 섹션별 한글 주석과 SCSS 중첩 문법을 사용합니다.
- `portfolio.css`: `portfolio.scss`를 브라우저가 읽을 수 있도록 변환한 결과물입니다. `index.html`이 실제로 불러오는 파일입니다.
- `case.css`: 프로젝트 상세 페이지 전용 추가 스타일입니다. 공통 스타일인 `portfolio.css`를 먼저 불러옵니다.
- `styles.scss`, `styles.css`: 초기 랜딩 페이지에서 사용하던 이전 스타일입니다. 현재 포트폴리오 페이지에서는 불러오지 않습니다.

## SCSS 컴파일

Sass가 설치된 환경에서 다음 명령으로 CSS를 생성할 수 있습니다.

```bash
sass portfolio.scss portfolio.css
```

파일 변경을 계속 감시하려면:

```bash
sass --watch portfolio.scss:portfolio.css
```

기존 `styles.scss:styles.css` 감시 작업은 현재 페이지에 영향을 주지 않지만, 혼동을 피하려면 종료하는 것을 권장합니다.
