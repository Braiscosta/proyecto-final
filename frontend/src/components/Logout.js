function Logout() {
  localStorage.clear();
  window.location = "http://localhost:3050/";
  return null;
}
export default Logout;
