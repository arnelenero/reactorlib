export const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw Error(response.statusText);
  return await response.json();
};

export const http = (
  url,
  defaultHeaders,
  requestFn = request,
  formatFn = JSON.stringify
) => {
  const verb = (method, { headers, body, ...options }) => {
    defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
    headers = { ...defaultHeaders, ...headers };
    body = formatFn(body);
    options = { ...options, body, headers };
    return requestFn(url, { ...options, method });
  };

  return {
    get: options => verb('GET', options),
    post: options => verb('POST', options),
    put: options => verb('PUT', options),
    delete: options => verb('DELETE', options),
  };
};

export default http;
