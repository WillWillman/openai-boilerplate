import queryString from 'query-string';


export const fetchJson = ({ url, query = {}, body, ...options }: { url: string, method: string, query?, body?, headers?}) =>
  fetch(`${url}?${queryString.stringify(query)}`, {
    ...body && { body: JSON.stringify(body) },
    ...options,
  }).then(r => r.json());
