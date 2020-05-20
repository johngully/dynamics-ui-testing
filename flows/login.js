const { Login } = require('../utils/login');

const LoginFlow = async (url, username, password) => {
  const login = new Login();
  await login.start(url, username, password);
};

module.exports = {
  LoginFlow
};