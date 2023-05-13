import Cookies from 'js-cookie';

export function setHeader() {
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
