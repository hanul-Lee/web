# 사용자 지정 스타일 보호

- 사용자가 명시적으로 변경을 요청하지 않는 한 `.impact-flow strong`의 기존 스타일 선언을 수정하거나 다른 선택자로 덮어쓰지 않는다.
- 특히 `font-size: clamp(28px, 2vw, 50px);`와 `line-height: 1.1;`은 그대로 보존한다. `case.scss`와 빌드 결과인 `case.css`에 모두 적용한다.
