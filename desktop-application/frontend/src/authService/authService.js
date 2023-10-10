// authService.js
let isAuthenticated = false;

const authenticate = () => {
  isAuthenticated = true;
};

const logout = () => {
  isAuthenticated = false;
};

const isAuthenticatedUser = () => {
  return isAuthenticated;
};

export { authenticate, logout, isAuthenticatedUser };
