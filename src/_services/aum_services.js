import { fetcher } from '@/_helper/ApiBase';

export async function handleOurClient(params) {
  try {
    const response = await fetcher('GET', process.env.OUR_CLIENT, params);
    return response;
  } catch (err) {
    return null;
  }
}

export async function handleOurSource(params) {
  try {
    const response = await fetcher('GET', process.env.OUR_SOURCE, params);
    return response;
  } catch (err) {
    return null;
  }
}
export async function handleClientMastersList(params) {
  try {
    const response = await fetcher('GET', process.env.CLIENT_MASTERS, params);
    return response;
  } catch (err) {
    return null;
  }
}
export async function handleClientMatchings(params) {
  try {
    const response = await fetcher('POST', process.env.CLIENT_MATCHINGS, params);
    return response;
  } catch (err) {
    return null;
  }
}
