const nacl = require("tweetnacl");
const { PRIVATE_KEY } = require("./config");

const privateKey = Buffer.from(PRIVATE_KEY, "base64");

function signTransaction(preparedTransaction) {
  const message = Buffer.from(preparedTransaction, "base64");

  const signature = nacl.sign.detached(
    message,
    privateKey
  );

  return Buffer.from(signature).toString("base64");
}

module.exports = { signTransaction };
