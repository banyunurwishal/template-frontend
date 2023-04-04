export default {
  loggedInUser: (state) => localStorage.getItem('user') || null,
}
