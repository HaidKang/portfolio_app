# 포트폴리오 웹사이트 기능 명세서

## 1) 목표/지향점

* **목표**: 개인 역량·경력·프로젝트를 신뢰감 있게 보여주고, 문의 전환(컨택/콜) 유도
* **톤&무드**: 모던, 미니멀, 전문적(화이트·그레이 + 포인트 컬러 1개 / 라운드 16–20px / 충분한 여백)
* **KPI**: 평균 체류시간, 프로젝트 상세 진입률, 연락처 제출률, 파일 다운로드 수

## 2) 정보 구조(IA) 및 페이지

* **Global**: 홈, 프로젝트, 이력/스킬, 블로그(선택), 문의, (영/한 다국어 옵션)
* **홈(Home)**: 히어로(한 줄 가치제안), 핵심 프로젝트 3–6, 스킬 요약, 추천사, 최신 글 3, CTA
* **프로젝트(Project List/Detail)**: 필터/태그, 카드형 목록, 상세(배경–목표–역할–프로세스–성과–스택–이미지/영상–링크)
* **이력/스킬(About/Resume)**: 요약 소개, 타임라인, 스킬 메트릭(레벨/경험연수), 수상/자격
* **블로그(선택)**: 카테고리/태그, 목차 자동 생성, 코드 하이라이트
* **문의(Contact)**: 폼(이름/이메일/메시지/첨부 선택), SNS/메일/캘린더 링크
* **기타**: 404, 개인정보처리방침, 이용약관(선택)

## 3) 핵심 기능 요구사항

### 3.1 UI/UX 공통

* **다크모드**: `prefers-color-scheme` 연동 + 토글 저장(LocalStorage)
* **반응형**: `≥1280`, `768–1279`, `≤767` 3단 브레이크포인트
* **애니메이션**: 200–300ms, ease-out / 스크롤 인뷰 페이드·슬라이드(한 섹션 당 1개 이하, 과다 금지)
* **접근성**: 키보드 내비게이션, 포커스 링, 대비 AA 이상, img 대체텍스트, 라이브영역 ARIA

### 3.2 내비게이션

* 스티키 헤더(스크롤 축소), 현재 위치 강조, 스킵 링크 제공
* 언어 토글(ko/en) 및 다크모드 토글

### 3.3 프로젝트

* **필터링/검색**: 태그(도메인/역할/스택), 텍스트 검색(프로젝트명/요약/태그)
* **정렬**: 최신순 기본, 인기/가중치 정렬 옵션
* **프로젝트 카드**: 커버 이미지, 역할, 사용스택 배지, 성과 하이라이트(숫자)
* **프로젝트 상세**: 이미지 갤러리(라이트박스), 동영상 임베드, 이전/다음 네비, 관련 프로젝트 추천

### 3.4 이력/스킬

* 타임라인(연·월 기준), 핵심 성과 숫자화(매출/전환/트래픽 등)
* 스킬 배지 + 숙련도(5단계) + 사용 연수 + 최근 사용 여부

### 3.5 블로그(선택)

* 마크다운 렌더링, 코드 하이라이트, TOC 자동, 검색/태그, RSS
* 포스트 내 관련 프로젝트/글 추천

### 3.6 문의/연결

* **폼 필드**: 이름(required), 이메일(required, 패턴 검증), 회사/역할(optional), 메시지(required 10–1,500자), 첨부(최대 10MB, pdf/doc/png/jpg)
* **전송 처리**: 스팸 보호(reCAPTCHA v3 또는 hCaptcha), 전송 성공/실패 토스트, 성공 후 감사 페이지 + 캘린더 링크
* **통합**: 이메일 송신 + Google Sheet/Notion API(선택)
* **추적**: 제출 성공 이벤트 로깅

## 4) 비기능 요구사항

* **성능**: LCP ≤ 2.5s, CLS ≤ 0.1, TTI ≤ 3.5s(모바일 4G 기준), 이미지 lazy-loading/자동 WebP
* **SEO**: 메타태그, Open Graph/Twitter 카드, 정적 URL, 사이트맵 `/sitemap.xml`, robots.txt
* **구조화 데이터**: `WebSite`, `Person`, `BreadcrumbList`, `Article`(블로그), `CreativeWork`(프로젝트)
* **보안/프라이버시**: HTTPS 필수, 폼 인풋 서버 측 검증, 파일형·용량 제한, 개인정보 고지
* **로그/분석**: GA4 또는 Plausible, 이벤트(프로젝트 상세 진입/스크롤 75%/문의 제출/파일DL/언어토글/다크토글)

## 5) 콘텐츠 모델(CMS 스키마)

* **Project**

  * id, slug, title, summary(150자), role(리드/PM/FE/BE/Design), period(start–end), stack\[string\[]], tags\[string\[]]
  * problem, goal, process(단계 배열), contribution, outcome(metrics\[]), links(demo/git), cover, gallery\[], video
  * featured(bool), weight(number), locale(ko/en)
* **Post**

  * id, slug, title, excerpt, body(md), cover, tags\[], publishedAt, locale
* **Skill**

  * name, level(1–5), years(number), lastUsed(YYYY-MM), category(FE/BE/DevOps/PM/UX)
* **Testimonial(선택)**

  * authorName, role, org, quote, avatar, relatedProjectId
* **Profile**
    
  * name, title, shortBio, photo, socials({github,linkedin,mail,calendar})

> CMS는 Headless(Sanity/Contentful/Strapi 등) 또는 Git 기반(Markdown/MDX) 중 택1. 다국어는 `locale` 필드 + fallback 전략.

## 6) 기술 스택(권장안)

* **프론트**: Next.js(App Router) + React + TypeScript
* **스타일**: Tailwind CSS + shadcn/ui(버튼/카드/다이얼로그) + 아이콘(lucide-react)
* **이미지**: next/image(자동 최적화), blur-up
* **폼**: React Hook Form + Zod(검증)
* **검색/필터**: 클라이언트 상태(Zustand) + 간단한 인덱스(Lunr/Fuse) 또는 CMS 쿼리
* **배포**: Vercel(프리뷰/프로덕션), Cloudflare 대안 가능
* **분석**: GA4 또는 Plausible(쿠키리스)

## 7) API/서버 명세(요약)

* **POST `/api/contact`**

  * req: `{ name, email, company?, message, attachment? }`
  * 검증: 서버 측 Zod + rate limit(아이피 기준 5req/10min)
  * 처리: 메일 전송 + 스프레드시트/Notion 기록(선택)
  * res: `{ ok: true }` 또는 에러 코드(400/429/500)
* **GET `/api/sitemap.xml`**: 정적/증분 생성
* **i18n**: Next.js i18n 라우팅(`/ko`, `/en`) + 번역 JSON

## 8) 컴포넌트 명세(핵심)

* **Header**(로고, GNB, 언어/다크 토글)
* **Hero**(헤드라인, 서브카피, CTA 버튼 1–2, 키비주얼)
* **ProjectCard**(커버, 타이틀, 역할, 스택배지, 하이라이트 숫자, hover 상승)
* **FilterBar**(태그칩, 정렬 드롭다운, 검색 인풋, 선택 초기화)
* **Timeline**(이력 점/선형, 모바일 아코디언)
* **Testimonial**(카드 슬라이더)
* **BlogCard**(카테고리, 읽는시간, 날짜)
* **ContactForm**(검증/로딩/알림)
* **Footer**(저작권, 소셜, 정책 링크)

## 9) 스타일 가이드(요약)

* **타이포**: `H1 36–48`, `H2 28–32`, `Body 16–18`, `Caption 12–14`
* **그리드**: 컨테이너 1200px, 컬럼 12, 거터 24px, 섹션 상하 여백 72–120px
* **색상**: 기본(Neutral 900/700/500/100), 포인트 1개(브랜드색), 상태색(성공/경고/에러)
* **버튼**: Primary(실채), Secondary(윤곽), Ghost(텍스트), disabled 상태 명확
* **아이콘/일러스트**: 선명한 라인, 과도한 그림자/글로우 금지

## 10) 다국어(i18n) 정책

* 기본 `ko`, 보조 `en`, 경로 분리(`/en/...`)
* 콘텐츠 필드 별 `locale` 관리, 미번역 시 기본 언어 fallback
* 날짜/숫자/화폐 `Intl` 로케일 포맷

## 11) 추적 이벤트 정의

* `project_view`(id, position), `project_filter`(tags, sort), `project_detail_nextprev`
* `contact_submit_success`/`fail`
* `blog_read`(id, readTime%), `download_cv`, `toggle_theme`, `toggle_lang`

## 12) 접근성·품질 체크리스트(요약)

* Lighthouse/AXE 90점↑, heading 구조, 폼 레이블/오류 안내, 키보드 포커스, 비디오 캡션
* 이미지 lazy, CLS 억제(고정 width/height), 폰트 `font-display: swap`, 프리로드 핵심 폰트 1종

## 13) 배포/운영

* **브랜치 전략**: `main`(prod), `dev`(preview)
* PR마다 프리뷰 URL 자동 생성, 승인 시 프로덕션 배포
* 에러 로깅(Sentry) + Uptime 모니터링(Healthcheck)

## 14) 수집/보관 정책(요약)

* 개인정보 최소 수집, 목적/보관기간 명시, 로그 90일 보관, 파일 업로드 30일 만료

## 15) 산출물·인수 기준

* 디자인 토큰(JSON), 컴포넌트 스토리북, 접근성 리포트, 성능 리포트, SEO 체크 통과
* **인수 테스트**: 필터/검색 동작, 문의 폼 유효성/메일 수신, 다크·언어 토글 저장, 사이트맵 제출
