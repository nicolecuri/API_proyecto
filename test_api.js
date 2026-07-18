
const API_URL = 'https://api-fitplanner.vercel.app/api';
async function run() {
  console.log('Testing tracking...');
  const res1 = await fetch(API_URL + '/tracking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'test_user', date: 'routine-123', data: { completedExercises: { 1: true } } })
  });
  console.log('POST status:', res1.status, await res1.text());

  const res2 = await fetch(API_URL + '/tracking/test_user');
  console.log('GET status:', res2.status, await res2.text());
}
run();

