import { FieldError } from "@js-camp/core/models/fieldError";
import { api } from "../scripts/API";
import { displayTheError } from "../scripts/registration";

/** Parameters for getting anime from the database. */
interface RegistrationConfig {
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly avatar: string;
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
export async function register(registrationConfig: RegistrationConfig) {
  await api.post(`/auth/register/`, {
    email: registrationConfig.email,
    first_name: registrationConfig.first_name,
    last_name: registrationConfig.last_name,
    avatar: registrationConfig.avatar,
    password: registrationConfig.password
  }).then(res => {
    const token = res.data as Token
    localStorage.setItem('access', token.access)
    localStorage.setItem('refresh', token.refresh)
    window.location.replace("/");

  }).catch(res => {
    if (res.response.data.data !== undefined) {
      const error = res.response.data as FieldError
      displayTheError(Object.values(error.data)[0][0])
    }

  });
  // return PaginationMapper.fromDto(data);
}