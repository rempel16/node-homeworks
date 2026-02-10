import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@mail.com",
    passwordHash: await bcrypt.hash("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    email: "user@mail.com",
    passwordHash: await bcrypt.hash("user123", 10),
    role: "user",
  },
];

// --- helpers ---
function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "15m" });
}

function authenticateJWT(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: no token" });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: invalid/expired token" });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    next();
  };
}

app.get("/", (req, res) => res.send("OK"));

app.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  return res.json({ token });
});

app.put("/update-email", authenticateJWT, (req, res) => {
  const { newEmail } = req.body ?? {};
  if (!newEmail) return res.status(400).json({ error: "newEmail is required" });

  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const taken = users.some((u) => u.email === newEmail && u.id !== user.id);
  if (taken) return res.status(409).json({ error: "Email already in use" });

  user.email = newEmail;
  return res.json({ message: "Email updated", user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

app.post("/delete-account", authenticateJWT, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const idx = users.findIndex((u) => u.id === req.user.id);
  users.splice(idx, 1);

  return res.json({ message: "Account deleted", deletedId: req.user.id });
});

app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
  const { userId, newRole } = req.body ?? {};
  if (!userId || !newRole) return res.status(400).json({ error: "userId and newRole are required" });
  if (!["user", "admin"].includes(newRole)) return res.status(400).json({ error: "newRole must be 'user' or 'admin'" });

  const target = users.find((u) => u.id === Number(userId));
  if (!target) return res.status(404).json({ error: "Target user not found" });

  target.role = newRole;
  return res.json({ message: "Role updated", user: { id: target.id, username: target.username, role: target.role } });
});

app.post("/refresh-token", authenticateJWT, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const newToken = signToken(user);
  return res.json({ token: newToken });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log("Seed users:");
  console.log("admin / admin123");
  console.log("user  / user123");
});
