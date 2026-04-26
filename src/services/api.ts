const API_BASE_URL = "https://hpweather-backend.onrender.com";

type RequestOptions = {
  body?: unknown;
  method?: "GET" | "POST";
  token?: string;
};

export type ApiError = {
  message: string;
  status?: number;
};

export type RegisterUserPayload = {
  fullName: string;
  cpf: string;
  dateBirth: string;
  email: string;
  password: string;
  identifier: string;
  role: "PATIENT";
};

export type User = {
  id: number;
  fullName: string;
  cpf?: string;
  dateBirth?: string;
  email: string;
  identifier?: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  type: string;
  userId: number;
  email: string;
  fullName: string;
  role: string;
  expiresIn: number;
  platform: string;
};

export type WeatherResponse = {
  current_weather: {
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  latitude: number;
  longitude: number;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? parseResponse(text) : null;

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      "Nao foi possivel concluir a solicitacao. Tente novamente.";
    throw { message, status: response.status } satisfies ApiError;
  }

  return data as T;
}

function parseResponse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export function login(email: string, password: string) {
  return request<LoginResponse>("/api/auth/web/login", {
    body: { email, password },
  });
}

export function registerUser(payload: RegisterUserPayload) {
  return request<User>("/api/users", {
    body: payload,
  });
}

export function getWeather(latitude = -23.5505, longitude = -46.6333) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
  });

  return request<WeatherResponse>(`/api/weather?${params.toString()}`, {
    method: "GET",
  });
}
