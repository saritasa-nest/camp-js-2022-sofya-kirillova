import { FieldError } from "@js-camp/core/models/fieldError";
import { api } from "../scripts/API";
import { displayTheError } from "../pages/authentication/authorization";

/** Parameters for getting anime from the database. */
interface AuthorizationConfig {
  readonly email: string;
  readonly password: string;
}

interface Token {
  readonly access: string;
  readonly refresh : string;
}
/**
 * Sends a request to the database.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function login(registrationConfig: AuthorizationConfig) {
  await api.post(`/auth/login/`, {
    email: registrationConfig.email,
    password: registrationConfig.password
  }).then(res => {
    const token = res.data as Token
    localStorage.setItem('access', token.access)
    localStorage.setItem('refresh', token.refresh)
    window.location.replace("/");

  }).catch(res => {
      const error = res.response.data as FieldError
      displayTheError(error.detail)
  });
  // return PaginationMapper.fromDto(data);
}