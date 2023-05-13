import { fetcher } from '@/_helper/ApiBase';

export async function logInUser(params) {
  try {
    const response = await fetcher('POST', process.env.SIGN_IN_USER, params);
    return response;
  } catch (err) {
    return null;
  }
}
