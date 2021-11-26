import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 150,
  duration: '10s',
};

// const url = 'http://localhost:3001/products/?page=1&count=10';
// const url = 'http://localhost:3001/products/?page=50000&count=10';
const url = 'http://localhost:3001/products/?page=100000&count=10';

export default () => {
  const res = http.get(url);
  check(res, {
    'is status 200': (r) => r.status === 200,
    // 'transaction time < 200ms': (r) => r.timings.duration < 200,
    // 'transaction time < 500ms': (r) => r.timings.duration < 500,
    // 'transaction time < 1000ms': (r) => r.timings.duration < 1000,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  });
  sleep(0.1);
};
