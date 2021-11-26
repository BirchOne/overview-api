import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '15s',
};

const url = 'http://localhost:3001/products/1';
// const url = 'http://localhost:3001/products/500000';
// const url = 'http://localhost:3001/products/1000000';

export default () => {
  const res = http.get(url);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 500ms': (r) => r.timings.duration < 500,
    'transaction time < 1000ms': (r) => r.timings.duration < 1000,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  });
  sleep(0.1);
};
