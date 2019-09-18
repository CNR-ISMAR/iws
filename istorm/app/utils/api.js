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

export const getProfile = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/me/`, options)
};

export const requestTimelineData = (options, from, to) => {
  let url = `${BASE_URL}/openistorm/layers/`;
  if(from && to) {
    url += `?from=${from}&to=${to}`;
  }
  return request(url, getOption(options));
};

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

export const postFavourite = (options) => {
  return request(`${BASE_URL}/openistorm/favorites/`,  getOption(options))
};

export const notification = () => {
  const options = getOption({})
  return request(`${BASE_URL}/openistorm/notifications/`, options)
};

export const deleteNotification = (id) => {
  const options = getOption({
    method: 'delete'
  });
  return request(`${BASE_URL}/openistorm/notifications/${id}/`, options)
}

export const updateNotification = (id) => {
  const options = getOption({
    method: 'put'
  });
  return request(`${BASE_URL}/openistorm/notifications/${id}/markasread/`, options)
}

export const popups = (action) => {
  const bounds = action.parameters.bounds
  const options = getOption({})
  console.log(action)
  return request(`${BASE_URL}/openistorm/layers/info/?bbox=${bounds._sw.lng},${bounds._sw.lat},${bounds._ne.lng},${bounds._ne.lat}&x=1&y=1&time=${action.parameters.time}&width=2&height=2`, options)
};

export const chart = (action) => {
  const bbox = action.params.bbox
  const time = action.params.time
  const options = getOption({}) 
  console.log(action)
  
  //return request(`${BASE_URL}/openistorm/layers/timeseries/?bbox=18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865&x=1&y=1&from=2019-09-16T00:00:00.000Z&width=2&height=2&to=2019-09-16T23:00:00.000Z`, options)
  return request(`${BASE_URL}/openistorm/layers/timeseries/?bbox=${bbox}&x=1&y=1&from=${time}&width=2&height=2&to=${time}`, options)
};

