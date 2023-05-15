import { fetcher } from "_helper/ApiBase";

export async function getLoginAdmin(params) {
  try {
    const response = await fetcher('POST', process.env.LOGIN, params);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getUserDataList(params) {
  try {
    const response = await fetcher('GET', process.env.USER_LIST_DATA, params);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getUserOrderData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_ORDER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserReviewData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_REVIEW_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserQueriesData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_QUERIES_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getActiveUserData(params) {
  try {
    const response = await fetcher('GET', process.env.ACITVE_PRIME_USER_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserDetails(params) {
  try {
    const response = await fetcher('GET', process.env.USER_DETAILS_DATA, params);
    return response;
  } catch (err) {
    return null;
  }
}

export async function updateUserDetails(params) {
  try {
    const response = await fetcher('POST', process.env.UPDATE_DETAILS_DATA, params);
    return response;
  } catch (err) {
    return null;
  }
}