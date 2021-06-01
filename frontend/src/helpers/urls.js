// const API_ROOT = 'http://localhost:8000';
const API_ROOT = 'https://kollab-8.herokuapp.com';

export const APIUrls = {
    login: () => `${API_ROOT}/user/login`,
    signup: () => `${API_ROOT}/user/register`,
};
