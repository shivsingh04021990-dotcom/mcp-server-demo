const test = require("node:test");
const assert = require("node:assert/strict");

const { validateRegistrationForm } = require("../script.js");

test("accepts a complete registration form", () => {
  const result = validateRegistrationForm({
    username: "testuser",
    email: "test@example.com",
    password: "secret12",
    confirmPassword: "secret12",
  });

  assert.equal(result.valid, true);
  assert.equal(result.message, "Creating account for testuser...");
});

test("rejects an empty username", () => {
  const result = validateRegistrationForm({
    username: "   ",
    email: "test@example.com",
    password: "secret12",
    confirmPassword: "secret12",
  });

  assert.equal(result.valid, false);
  assert.equal(result.field, "username");
  assert.equal(result.message, "Enter a username.");
});

test("rejects short passwords", () => {
  const result = validateRegistrationForm({
    username: "testuser",
    email: "test@example.com",
    password: "123",
    confirmPassword: "123",
  });

  assert.equal(result.valid, false);
  assert.equal(result.field, "password");
  assert.equal(result.message, "Password must be at least 6 characters.");
});

test("rejects mismatched passwords", () => {
  const result = validateRegistrationForm({
    username: "testuser",
    email: "test@example.com",
    password: "secret12",
    confirmPassword: "secret13",
  });

  assert.equal(result.valid, false);
  assert.equal(result.field, "confirmPassword");
  assert.equal(result.message, "Passwords do not match.");
});
