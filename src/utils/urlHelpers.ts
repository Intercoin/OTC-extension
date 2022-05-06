import qs from 'qs';

export function queryString(data: Record<string, any>) {
  return qs.stringify(data, {
    skipNulls: true,
  });
}

export function parseQueryString(data: string) {
  return qs.parse(data, {
    ignoreQueryPrefix: true,
  });
}
