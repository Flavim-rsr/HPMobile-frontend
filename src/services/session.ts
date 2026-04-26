import type { LoginResponse, User } from "@/services/api";

type SessionUser = Pick<LoginResponse, "userId" | "email" | "fullName" | "role">;

let authToken: string | null = null;
let currentUser: SessionUser | User | null = null;

export function setLoginSession(session: LoginResponse) {
  authToken = session.token;
  currentUser = {
    userId: session.userId,
    email: session.email,
    fullName: session.fullName,
    role: session.role,
  };
}

export function setRegisteredUser(user: User) {
  currentUser = user;
}

export function getCurrentUser() {
  return currentUser;
}

export function getAuthToken() {
  return authToken;
}

export function clearSession() {
  authToken = null;
  currentUser = null;
}
