const baseUrl = "http://api.doctory.co/restserver/api/";

export const get = async url => {
  return await fetch(baseUrl + url, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  });
};

export const post = async (url, body) => {
  return await fetch(baseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: !body ? null : JSON.stringify(body)
  });
};

export const putReq = async (url, data) => {
  return await fetch(baseUrl + url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
};
