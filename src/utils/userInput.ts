export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function formatBirthDate(value: string) {
  const digits = onlyDigits(value).slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function toIsoDate(value: string) {
  const trimmed = value.trim();
  const slashDate = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);

  if (slashDate) {
    const [, day, month, year] = slashDate;
    return `${year}-${month}-${day}`;
  }

  return trimmed;
}

export function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String(error.message);
    const status = "status" in error ? Number(error.status) : undefined;
    const translatedMessage = translateApiMessage(message, status);

    return translatedMessage || message;
  }

  return "Nao foi possivel conectar ao servidor. Tente novamente.";
}

function translateApiMessage(message: string, status?: number) {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return "Nao foi possivel concluir a solicitacao. Tente novamente.";
  }

  if (normalized === "network request failed") {
    return "Nao foi possivel conectar ao servidor. Verifique a internet do celular e tente novamente.";
  }

  if (
    status === 401 ||
    normalized.includes("bad credentials") ||
    normalized.includes("invalid credentials") ||
    normalized.includes("unauthorized") ||
    normalized.includes("incorrect password") ||
    normalized.includes("wrong password") ||
    normalized.includes("user not found")
  ) {
    return "E-mail ou senha incorretos. Verifique os dados e tente novamente.";
  }

  if (
    status === 409 ||
    normalized.includes("already exists") ||
    normalized.includes("already registered") ||
    normalized.includes("duplicate") ||
    normalized.includes("email already") ||
    normalized.includes("cpf already")
  ) {
    return "Ja existe um cadastro com esses dados. Verifique o e-mail ou CPF informado.";
  }

  if (
    status === 400 ||
    normalized.includes("validation") ||
    normalized.includes("invalid") ||
    normalized.includes("must not") ||
    normalized.includes("required")
  ) {
    return "Confira os dados informados e tente novamente.";
  }

  if (status && status >= 500) {
    return "O servidor encontrou um problema. Tente novamente em alguns instantes.";
  }

  return "";
}
