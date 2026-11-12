const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ACCESS_EXPIRES =
  process.env.JWT_ACCESS_EXPIRES || "1m";

const REFRESH_EXPIRES =
  process.env.JWT_REFRESH_EXPIRES || "7d";

const REFRESH_DAYS = 7;

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: ACCESS_EXPIRES,
      issuer: "my-app",
      audience: "my-app-client",
      algorithm: "HS256",
    }
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      jti: crypto.randomUUID(),
      type: "refresh",
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: REFRESH_EXPIRES,
      issuer: "my-app",
      audience: "my-app-client",
      algorithm: "HS256",
    }
  );
};

// Hash refresh token using SHA256
const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

// Cookie configuration
const refreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api",
  maxAge: REFRESH_DAYS * 24 * 60 * 60 * 1000,
});

// Refresh token expiration date
const getRefreshExpiry = () => {
  return new Date(
    Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  refreshCookieOptions,
  getRefreshExpiry,
};