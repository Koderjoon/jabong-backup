# 25학번 자봉 장부 백업

[jabong](https://github.com/Koderjoon/jabong) 앱의 데이터를 매일 새벽 3시(한국 시간)에 받아서 `backups/날짜.json`으로 올린다.

- 백업에는 명단(이름 포함)·자봉 기록·수정 이력·요청·출석·자주 쓰는 항목이 들어간다. 비밀번호, 로그인, 증빙 사진은 들어가지 않는다.
- 파일은 암호화하지 않은 JSON이라 이 저장소를 보는 누구나 읽을 수 있다.
- 날짜별 파일이 계속 쌓인다. 하루 수십 KB라 몇 년을 둬도 괜찮다.

## 처음 설정 (한 번만)

1. 이 저장소 → **Settings → Secrets and variables → Actions → New repository secret**으로 두 개를 넣는다.
   값은 jabong 앱의 Vercel **Settings → Environment Variables**에 넣은 것과 같다.

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | `VITE_SUPABASE_URL`의 값 |
   | `SUPABASE_ANON_KEY` | `VITE_SUPABASE_ANON_KEY`의 값 |

2. **Actions** 탭 → "매일 백업" → **Run workflow**로 한 번 돌려서 초록불과 `backups/` 폴더에 파일이 생기는지 확인한다.

## 되살리기

1. 이 저장소의 `backups/`에서 되살릴 날짜의 파일을 연다 → 오른쪽 위 **Download raw file**.
2. 앱에 부총대로 로그인 → **관리 → 백업 → 백업 파일**에 받은 파일을 고른다.
3. 지금과 무엇이 달라지는지 미리보기를 확인하고, `되살리기`라고 적은 뒤 **이 백업으로 되살리기**.
   되살리기 직전 상태는 파일로 먼저 받아진다.
