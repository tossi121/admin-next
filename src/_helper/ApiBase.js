import Axios from 'axios';
import Cookies from 'js-cookie';

// Api Headers
function setHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (Cookies.get('token')) {
    _headers['headers']['Authorization'] = `Bearer ${Cookies.get('token')}`;
  }
  return _headers;
}

// API fetch Base
export async function fetcher(method, url, params) {
  try {
    let response;
    if (method == 'GET') {
      const updateHeader = setHeader();
      updateHeader['params'] = params;
      response = await Axios.get(`${process.env.BASE_API_URL}${url}`, updateHeader);
    } else {
      response = await Axios.post(`${process.env.BASE_API_URL}${url}`, params, setHeader());
    }
    if (response.status == 200) {
      return successResponse(response);
    } else {
      return errorResponse(response);
    }
  } catch (err) {
    return errorResponse({ resultMessage: err });
  }
}

function successResponse(response) {
  return {
    result: response.data.result,
    data: response.data['resultData'],
    message: response.data['resultMessage'],
  };
}

function errorResponse(response) {
  return {
    result: response.data.result,
    data: null,
    message: response.data['resultMessage'],
  };
}
