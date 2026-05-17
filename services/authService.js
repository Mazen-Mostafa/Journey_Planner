const USERS_KEY = "journey-plan-users";
const SESSION_KEY = "journey-plan-session";

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function toPublicUser(user) {
  const { passwordHash, salt, ...publicUser } = user;
  return publicUser;
}

export function getSessionUser() {
  const session = readSession();
  if (!session?.id) return null;

  const user = readUsers().find((entry) => entry.id === session.id);
  return user ? toPublicUser(user) : null;
}

export async function registerUser({ name, email, country, phone, password }) {
  const normalizedEmail = normalizeEmail(email);
  const users = readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const salt = crypto.randomUUID();
  const passwordHash = await hashPassword(password, salt);

  const newUser = {
    id: createUserId(),
    name: name.trim(),
    email: normalizedEmail,
    country: country.trim(),
    phone: phone.trim(),
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  const sessionUser = toPublicUser(newUser);
  writeSession({ id: sessionUser.id });
  return sessionUser;
}

export async function loginUser(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const user = readUsers().find((entry) => entry.email === normalizedEmail);

  if (!user) {
    throw new Error("Incorrect email or password. Please try again.");
  }

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    throw new Error("Incorrect email or password. Please try again.");
  }

  const sessionUser = toPublicUser(user);
  writeSession({ id: sessionUser.id });
  return sessionUser;
}

export function logoutUser() {
  writeSession(null);
}

export async function updateUserProfile(userId, { name, password }) {
  const users = readUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    throw new Error("User not found.");
  }

  const updated = { ...users[index] };

  if (name?.trim()) {
    updated.name = name.trim();
  }

  if (password) {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    const salt = crypto.randomUUID();
    updated.salt = salt;
    updated.passwordHash = await hashPassword(password, salt);
  }

  users[index] = updated;
  writeUsers(users);

  const sessionUser = toPublicUser(updated);
  writeSession({ id: sessionUser.id });
  return sessionUser;
}
