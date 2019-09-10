import request from "./request";

const BASE_URL = process.env.API_URL;

const apiTokenSingleton = () => {
  let token = null;
  return {
    get: () => {
      return token;
    },
    set: (inputToken) => {
      token = inputToken
    }
  }
};
const apiToken = apiTokenSingleton();

const defaultOption = {
    headers: new Headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }),
};

const getOption = (option) => {
    if(apiToken.get()) {
      if(defaultOption.headers.has("Authorization")) {
        defaultOption.headers.set('Authorization', `Bearer ${apiToken.get()}`);
      } else {
        defaultOption.headers.append('Authorization', `Bearer ${apiToken.get()}`);
      }
    }
    option.headers = defaultOption.headers;
    if(option.body) {
        option.body = JSON.stringify(option.body)
    }
    return option
}

export function setToken(token) {
  apiToken.set(token);
}

export const oauthOption = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLINET_ID,
    client_secret: process.env.CLIENT_SECRET,
}

export const oauthOptionRefreshToken = {
  grant_type: "refresh_token",
  client_id: process.env.CLINET_ID,
  client_secret: process.env.CLIENT_SECRET,
}

export const login = (options) => {
    return request(`${BASE_URL}/oauth/token/`, getOption(options))
};

export const loginRefresh = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/token/`, options)
};

export const requestTimelineData = (options, from, to) => {
  let url = `${BASE_URL}/openistorm/layers/`;
  if(from && to) {
    url += `?from=${from}&to=${to}`;
  }
  return request(url, getOption(options));
};

// const FavsOpts = {
//     headers:{
//         'Authorization': 'Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC',
//         'Accept': 'application/json, text/plain',
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache'
//     },
// }

export const favourites = () => {
  const options = getOption({})
  return request(`${BASE_URL}/openistorm/favorites/`, options)
};

export const deleteFavourite = (id) => {
  const options = getOption({
    method: 'delete'
  });
  return request(`${BASE_URL}/openistorm/favorites/${id}/`, options)
};
