
const API_URL = 'https://api-fitplanner.vercel.app/api';
async function run() {
  const res = await fetch(API_URL + '/tracking/test_user/routine-123');
  console.log('GET routine-123:', res.status, await res.text());
}
run();

