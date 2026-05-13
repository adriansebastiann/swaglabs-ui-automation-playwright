import { LoginPage } from '../pages/login.page';
import { USERS } from './test-data';

async function login(loginPage: LoginPage, username: string, password: string): Promise<void> {
  await loginPage.navigate();
  await loginPage.login(username, password);
}

export async function loginAsStandardUser(loginPage: LoginPage): Promise<void> {
  await login(loginPage, USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
}

export async function loginAsLockedOutUser(loginPage: LoginPage): Promise<void> {
  await login(loginPage, USERS.LOCKED_OUT_USER.username, USERS.LOCKED_OUT_USER.password);
}