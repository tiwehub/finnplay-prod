const crypto = require("crypto");

function generateSecret() {
  return crypto.randomBytes(64).toString("hex");
}

const sessionSecret = generateSecret();
const jwtSecret = generateSecret();

console.log(`SESSION_SECRET=${sessionSecret}`);
console.log(`JWT_SECRET=${jwtSecret}`);
