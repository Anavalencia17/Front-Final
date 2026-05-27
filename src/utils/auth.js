export const auth = {
  login: (username) => {
    localStorage.setItem('user_session', JSON.stringify({ username, loginAt: new Date() }));
  },
  logout: () => {
    localStorage.removeItem('user_session');
  },
  isAuthenticated: () => {
    return localStorage.getItem('user_session') !== null;
  },
  getUser: () => {
    const session = localStorage.getItem('user_session');
    return session ? JSON.parse(session) : null;
  }
};