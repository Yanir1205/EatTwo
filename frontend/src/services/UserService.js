import HttpService from './HttpService';

const authEndpoint = 'auth';
const endpoint = 'user';

async function login(credentails) {
  const user = await HttpService.post(`${authEndpoint}/login`, credentails);
  return _handleLogin(user);
}
async function signup(credentails) {
  const user = await HttpService.post(`${authEndpoint}/signup`, credentails);
  return _handleLogin(user);
}
async function logout() {
  await HttpService.post(`${authEndpoint}/logout`);
  sessionStorage.clear();
}
function _handleLogin(user) {
  sessionStorage.setItem(endpoint, JSON.stringify(user));
  return user;
}

function getById(id) {
  return HttpService.get(`${endpoint}/${id}`);
}

export default {
  login,
  signup,
  logout,
  getById,
};