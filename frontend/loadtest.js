import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 50, // virtual users
  duration: "30s", // test duration
};

export default function () {
  let res = http.get("https://motomart-ten.vercel.app/");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
