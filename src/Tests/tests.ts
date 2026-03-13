import axios from "axios";

const ratelimitertest = async () => {
  try {
    for (let i = 0; i <= 102; i++) {
      const res = await axios.get("http://localhost:3000");
      console.log("Request", i, res.status);
    }

    return "FAIL: Rate limiter did not trigger";
  } catch (err: any) {
    if (err.response?.status === 429) {
      return "PASS: Rate limiter triggered";
    }

    return "FAIL: Unexpected error";
  }
};

ratelimitertest().then(console.log);
