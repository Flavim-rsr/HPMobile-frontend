import type { RegisterUserPayload } from "@/services/api";

export type RegistrationDraft = Omit<RegisterUserPayload, "role">;

let draft: RegistrationDraft | null = null;

export function setRegistrationDraft(nextDraft: RegistrationDraft) {
  draft = nextDraft;
}

export function getRegistrationDraft() {
  return draft;
}

export function clearRegistrationDraft() {
  draft = null;
}
