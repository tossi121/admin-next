import { fetcher } from "_helper/ApiBase";

export async function getUserDataList() {
  try {
    const response = await fetcher('POST', process.env.LOGIN);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getUserDataList() {
  try {
    const response = await fetcher('GET', process.env.USER_LIST_DATA);
    return response;
  } catch (err) {
    return err;
  }
}
