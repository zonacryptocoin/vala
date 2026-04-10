const { send } = require("./sender");
const { sleep } = require("./utils");

async function run() {
  const recipients = [
    { to: "zcc::ADDRESS_1", amount: "0.01" },
    { to: "zcc::ADDRESS_2", amount: "0.02" },
  ];

  for (const r of recipients) {
    try {
      console.log("Sending to:", r.to);

      const result = await send(r.to, r.amount);

      console.log("SUCCESS:", result);
    } catch (err) {
      console.error("FAILED:", r.to, err.response?.data || err.message);
    }

    // delay biar aman
    await sleep(2000);
  }
}

run();
