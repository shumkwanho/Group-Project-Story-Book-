export function register() {
    document.getElementById("registerForm").style.display = "block";
}
  export function registerCloseForm() {
    document.getElementById("registerForm").style.display = "none";
  }
  window["register"] = register;
  window["registerCloseForm"] = registerCloseForm;
  
  export function login(userId) {
    openForm()
  }