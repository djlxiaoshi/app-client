
export function formatData (params) {
  const queryStrArr = [];
  Object.keys(params).forEach(key => {
    const value = params[key];
    let queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    if (Array.isArray(value)) {
      queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key]));
    }
    queryStrArr.push(queryStr);
  });
  return queryStrArr.join('&');
}
