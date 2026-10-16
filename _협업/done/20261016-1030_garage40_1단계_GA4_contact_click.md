# [garage40] 1단계 — 측정 도구 달기 (GA4 + 문의 클릭 이벤트)

- 요청자: Aside / 사장님 승인 2026-10-16 ("진행하자")
- 대상 저장소: coorocket/garage40 (main 머지 = GitHub Pages + Netlify 동시 라이브)
- 기준 문서: `docs/garage40-네이버SEO-구축계획_v1.0_2026-10-14.md` 1단계·11-2, `_협업/docs/garage40-네이버SEO-협업지침_v1.0_2026-10-15.md`
- 커밋 접두어: `feat:` / 브랜치 예: `feat/ga4-contact-click` / PR 1개, 병합 금지

## 왜
지금은 아무것도 측정되지 않는다(진단 G3). 2단계부터 바꾸는 것들의 효과를 숫자로 보려면 먼저 측정이 있어야 한다.

## 사실(사장님 제공, 창작 금지)
- GA4 측정 ID: **G-589M5B6Q71** (속성 "garage40.netlify.app", 계정 CMD.LAB - 블루헬프, 2026-10-16 생성)
- 문의 경로 3종: 전화(`tel:`), 카톡(`open.kakao.com` 또는 `pf.kakao.com`), 문자(`sms:`). 견적 폼이 있으면 `form` 추가.

## 할 일
1. `index.html`의 `</head>` 바로 앞에 GA4 태그 삽입 (페이지에 한 번만):
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-589M5B6Q71"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-589M5B6Q71');
   </script>
   ```
2. `<body>`에 `data-page-type="home"` 속성 추가 (앞으로 category/item/kw/case 페이지에도 같은 규칙).
3. `assets/site.js`에 문의 클릭 이벤트 추가. 문서 전체에 클릭 위임 1개로 처리:
   - 대상: `a[href^="tel:"]` → method `tel`, `a[href^="sms:"]` → `sms`, `a[href*="kakao.com"]` → `kakao`, 견적 폼 제출 → `form`
   - 이벤트명 `contact_click`, 매개변수 `method`, `page_type`(body data-page-type, 없으면 `unknown`), `page_path`(location.pathname), `cta_position`(버튼의 `data-track` 값, 없으면 `unknown`)
   - `gtag`가 없으면(차단 등) 조용히 무시. 링크 이동을 막지 않는다(preventDefault 금지).
4. 모바일 하단 고정 바·히어로·푸터·패키지 섹션의 문의 버튼에 `data-track` 값 부여: `sticky_mobile` / `hero_cta` / `footer_cta` / `price_cta` / `form_submit`. 문구·디자인·링크 대상은 바꾸지 않는다.
5. PR 설명에 "화면에서 달라지는 것: 없음(보이지 않는 측정만)", 확인 방법, 되돌리는 방법(PR revert) 3줄.

## 금지
- title / H1 / meta description / canonical / robots.txt / sitemap.xml / 스키마 변경 금지 (2단계는 별도 요청서·별도 승인)
- 문의 버튼의 문구·전화번호·링크 대상 변경 금지
- 외부 스크립트는 gtag 1개만. GTM 컨테이너 사용 금지(단순 유지)
- 이미지·CSS 변경 금지

## 완료 기준 (PR 설명에 표로)
| 항목 | 확인 |
|---|---|
| index.html head에 gtag 1회, ID G-589M5B6Q71 | |
| body data-page-type="home" | |
| 전화·문자·카톡·폼 각각 contact_click 발생(브라우저 콘솔 dataLayer 확인) | |
| data-track 5종 부여 목록 | |
| title/H1/meta/canonical/robots/sitemap diff 0 | |
| Netlify deploy preview에서 페이지 정상, 콘솔 에러 0 | |

## 사전검토 표 (seo-change-guard)
| 항목 | 판정 | 근거 |
|---|---|---|
| URL | 안전 | 변경 없음 |
| 삭제/404 | 안전 | 없음 |
| 사이트맵 | 안전 | 변경 없음 |
| 색인 지시 | 안전 | 변경 없음 |
| 콘텐츠 | 안전 | 보이는 내용 변경 없음 |
| title/meta | 안전 | 변경 없음 |
| 안정성 | 안전 | gtag async 1개, 정적 사이트 |
| 네이버 영향 | 없음 | 측정 코드만 |
| 구글 영향 | 없음 | GA4는 순위 요소 아님 |
| 되돌리기 | 쉬움 | PR revert |
| 측정 | 머지일 = 기준선 시작. Aside가 GA4에서 contact_click 첫 수신 확인 후 주요 이벤트 지정·주간 보고에 편입 | |
- 구글 SEO 부정 영향: 없음 / 네이버 SEO 부정 영향: 없음 / URL 변경 위험: 없음

## 머지 후 (Aside·사장님)
- Aside: 라이브에서 gtag·data-track 확인, GA4 실시간 contact_click 수신 확인 → 주요 이벤트 지정 → 월수금 루틴에 garage40 섹션 추가
- 사장님: 휴대폰으로 사이트 열어 전화 버튼 1회 눌러 보기(테스트 클릭은 보고에서 제외 표시)

## 결과
- PR: #5 (https://github.com/coorocket/garage40/pull/5), 브랜치 `claude/confident-sagan-b7oggu` (세션 지정 브랜치를 사용해 요청서의 `feat/` 접두어와 다름)
- 변경 파일: `index.html`(gtag, body data-page-type, data-track 11곳), `assets/site.js`(클릭 위임 + 폼 submit 이벤트), 요청서 이동(`to_code/` → `done/`), `to_aside/` 결과 메모
- data-track 부여: `hero_cta` 1(헤더 사진 견적) / `price_cta` 3(패키지 카드) / `footer_cta` 3(연락 섹션 카톡·전화, 푸터 전화) / `sticky_mobile` 2(하단 바 전화·카톡) / `form_submit` 2(견적 폼 문자·카톡 버튼)
- 자체검증 (Playwright, 로컬 서버, 375px, gtag를 스텁으로 교체해 인자 수집):

| 항목 | 결과 |
|---|---|
| head에 gtag 1회, ID G-589M5B6Q71 | 통과 (스크립트 태그 1개, `config` 1회) |
| body data-page-type="home" | 통과 |
| tel·sms·kakao·form 각각 contact_click | 통과 (4종 모두, page_type=home, page_path=/) |
| data-track 5종 | 통과 (위 목록) |
| title/H1/meta/canonical/robots/sitemap/스키마 diff | 0 (diff에서 해당 줄 없음, title·H1 값 동일) |
| 콘솔/페이지 에러 | 0, gtag 없을 때도 에러 0 |
| 링크 이동 | preventDefault 사용 안 함 |
| Netlify deploy preview | **PR 생성 후 확인 필요** (이 환경에서는 못 봄) |

- 못 한 것 / 판단 필요:
  - 견적 폼은 제출 버튼이 없어 실제 문의는 폼 안 문자·카톡 버튼 클릭으로 발생합니다. 이 두 버튼은 `method=sms|kakao`, `cta_position=form_submit`으로 잡히고, 폼 submit 이벤트(Enter 키)는 `method=form`으로 따로 잡힙니다. 같은 문의가 한 번만 세어지는지는 GA4에서 확인 바랍니다.
  - 헤더의 "사진 견적"을 `hero_cta`로 분류했습니다(히어로 영역에 자체 전화·카톡 버튼이 없음). 다르게 분류하길 원하면 알려 주세요.
  - `pnpm build`는 의존성이 설치돼 있지 않아 실행하지 못했고, 파일은 루트 그대로 정적 검증했습니다.
  - 주의: 이 PR이 머지되면 GitHub Pages와 Netlify에 동시에 라이브됩니다. CLAUDE.md의 "외부 스크립트 추가 금지"는 이 요청서의 gtag 1개 허용으로 예외 처리했습니다.
