import Axios from 'axios';
import Cookies from 'js-cookie';

// Api Headers
function setHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (Cookies.get('access_Token') != '') {
    _headers['headers']['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
  }
  return _headers;
}

export function mutipartHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  if (Cookies.get('access_token')) {
    _headers['headers']['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
  }
  return _headers;
}

export async function fetcher(method, url, params) {
  try {
    let response;
    if (method == 'GET') {
      const updateHeader = setHeader();
      updateHeader['params'] = params;
      response = await Axios.get(`${process.env.BASE_URL}${url}`, updateHeader);
    } else {
      response = await Axios.post(`${process.env.BASE_URL}${url}`, params, setHeader());
    }
    if (response.status) {
      return successResponse(response.data);
    } else {
      return errorResponse(response);
    }
  } catch (err) {
    return errorResponse({ resultMessage: err });
  }
}

function successResponse(response) {
  return {
    status: true,
    data: response['results'],
    message: response['message'],
  };
}

function errorResponse(response) {
  return {
    status: false,
    data: null,
    message: response['message'],
  };
}
