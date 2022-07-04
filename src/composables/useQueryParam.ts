export function useQueryParam(paramName: string) {
  let queryParamValue = window.location.search
    .substring(1)
    .split("&")
    .map((param) => param.split("="))
    .filter((param) => param[0] === paramName)[0];

  if (!queryParamValue || !Array.isArray(queryParamValue)) {
    return null;
  }

  return queryParamValue[1];
}
