export const request = async (url, options, onHttpError) => {
  const response = await fetch(url, options);
  if (!response.ok && typeof onHttpError === 'function') onHttpError(response);
  return response.json();
};

export const http = (
  url,
  defaultHeaders,
  requestFn = request,
  formatFn = JSON.stringify
) => {
  const verb = (method, { headers, body, ...options } = {}, onHttpError) => {
    defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
    headers = { ...defaultHeaders, ...headers };
    body = formatFn(body);
    options = { ...options, body, headers };
    return requestFn(url, { ...options, method }, onHttpError);
  };

  return {
    get: (options, onHttpError) => verb('GET', options, onHttpError),
    post: (options, onHttpError) => verb('POST', options, onHttpError),
    put: (options, onHttpError) => verb('PUT', options, onHttpError),
    delete: (options, onHttpError) => verb('DELETE', options, onHttpError),
  };
};

export default http;
