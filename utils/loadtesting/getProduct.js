import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    http_reqs: ['rate>1000'], // should exceed 1000 requests per second
  },
};

export default () => {
  const id = Math.ceil(Math.random() * 1000011);
  const url = `http://localhost:3001/products/${id}`;

  http.get(url);
  sleep(0.1);
};
