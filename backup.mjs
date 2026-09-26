// 서버에서 전체 데이터를 받아 backups/YYYY-MM-DD.json 으로 저장한다.
// 필요한 환경 변수: SUPABASE_URL, SUPABASE_ANON_KEY
import { writeFileSync, mkdirSync } from 'node:fs';

const need = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'].filter((k) => !process.env[k]);
if (need.length) {
  console.error(`저장소 Secrets에 ${need.join(', ')}를 넣어 주세요 (README 참고)`);
  process.exit(1);
}

// Supabase 설정 화면의 주소 끝에 /rest/v1/ 이 붙어 있어도 되게 떼어 낸다
const url = process.env.SUPABASE_URL.trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const key = process.env.SUPABASE_ANON_KEY.trim();

const res = await fetch(`${url}/rest/v1/rpc/backup_dump`, {
  method: 'POST',
  headers: { apikey: key, 'Content-Type': 'application/json' },
  body: '{}',
});
if (!res.ok) {
  console.error(`백업을 받지 못했어요 (${res.status}): ${await res.text()}`);
  process.exit(1);
}
const dump = await res.json();

const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
mkdirSync('backups', { recursive: true });
// 한 줄에 한 항목씩 적어 두면 GitHub에서 날짜별로 무엇이 바뀌었는지 보기 쉽다
writeFileSync(`backups/${day}.json`, JSON.stringify(dump, null, 1));
const t = dump.tables;
console.log(`백업 완료: backups/${day}.json · 학생 ${t.students.length}명 · 기록 ${t.ledger.length}건`);
