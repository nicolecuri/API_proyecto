
const API_URL = 'https://api-fitplanner.vercel.app/api';
async function run() {
  const userId = 'cmrpn7kp20009in2wi22c6qgu'; // from earlier
  const res = await fetch(API_URL + '/tracking/' + userId);
  console.log(await res.text());
}
run();

