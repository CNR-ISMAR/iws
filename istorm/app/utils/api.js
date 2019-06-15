import request from "./request";
import { eventNames } from "cluster";

const BASE_URL = process.env.API_URL;
const defaultOption = {
    headers: new Headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }),
};
const getOption = (option) => {
    return Object.assign(defaultOption, option);
}

export const login = (options) => request(`${BASE_URL}/oauth/token`, getOption(options));