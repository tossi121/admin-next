import { fetcher } from "_helper/ApiBase";

export async function getLoginAdmin(params) {
  try {
    const response = await fetcher('POST', process.env.LOGIN, params);
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
