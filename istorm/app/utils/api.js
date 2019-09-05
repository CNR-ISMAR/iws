import request from "./request";

const BASE_URL = process.env.API_URL;

const defaultOption = {
    headers: new Headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }),
};

const getOption = (option) => {
    option = Object.assign(defaultOption, option);
    if(option.body) {
        option.body = JSON.stringify(option.body)
    }
    return option
}

export const oauthOption = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLINET_ID,
    client_secret: process.env.CLIENT_SECRET,
}


export const login = (options) => {
    return request(`${BASE_URL}/oauth/token/`, getOption(options))
};

const FavsOpts = {
    headers:{
        'Authorization': 'Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC',
        'Accept': 'application/json, text/plain', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    },
}

export const favourites = () => {
    return request(`${BASE_URL}/openistorm/favorites/`, FavsOpts)
};
