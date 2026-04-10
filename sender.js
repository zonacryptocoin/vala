const api = require("./api");
const { signTransaction } = require("./signer");
const { PUBLIC_KEY } = require("./config");
const { v4: uuidv4 } = require("uuid");

// CREATE
async function createTransfer(to, amount) {
  const res = await api.post("/transfers/create", {
    to,
    amount,
    asset: "CC",
  });

  return res.data.preparedTransaction;
}

// SUBMIT
async function submitTransfer(preparedTransaction) {
  const signature = signTransaction(preparedTransaction);

  const payload = {
    signedSubmission: {
      preparedTransaction,
      hashingSchemeVersion: "HASHING_SCHEME_VERSION_V2",
      publicKey: PUBLIC_KEY,
      signature,
      submissionId: uuidv4(),
    },
  };

  const res = await api.post("/transfers/submit", payload);
  return res.data;
}

// MAIN SEND
async function send(to, amount) {
  const preparedTx = await createTransfer(to, amount);
  return await submitTransfer(preparedTx);
}

module.exports = { send };
