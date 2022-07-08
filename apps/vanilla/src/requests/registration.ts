import { api } from "../scripts/API";

/** Parameters for getting anime from the database. */
interface RegistrationConfig {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  password: string;
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
  }).catch(res => {
    console.log(res.response.data.error);
  });
  // return PaginationMapper.fromDto(data);
}