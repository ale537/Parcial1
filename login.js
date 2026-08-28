const USERS_KEY="clase_a_clase_users_v4";

function getUsers(){return JSON.parse(localStorage.getItem(USERS_KEY)||"[]")}
function setUsers(users){localStorage.setItem(USERS_KEY,JSON.stringify(users))}
function clearErrors(ids){ids.forEach(id=>document.getElementById(id).textContent="")}
function showView(id){
  ["loginView","registerView","forgotView"].forEach(view=>document.getElementById(view).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
function validEmail(email){return /^\S+@(?:usbctg\.edu\.co|usb\.edu\.co)$/i.test(email)}

document.querySelectorAll(".show-password").forEach(button=>{
  button.onclick=()=>{
    const input=document.getElementById(button.dataset.target);
    input.type=input.type==="password"?"text":"password";
    button.textContent=input.type==="password"?"Ver":"Ocultar";
  };
});

document.getElementById("registerBtn").onclick=()=>showView("registerView");
document.getElementById("backToLogin").onclick=()=>showView("loginView");
document.getElementById("forgotBtn").onclick=()=>showView("forgotView");
document.getElementById("backLoginForgot").onclick=()=>showView("loginView");

document.getElementById("registerForm").onsubmit=e=>{
  e.preventDefault();
  clearErrors(["registerNameError","registerEmailError","registerPasswordError","confirmPasswordError"]);
  const name=document.getElementById("registerName").value.trim();
  const email=document.getElementById("registerEmail").value.trim().toLowerCase();
  const password=document.getElementById("registerPassword").value;
  const confirm=document.getElementById("confirmPassword").value;
  const message=document.getElementById("registerMessage");
  message.textContent="";
  let ok=true;

  if(name.length<3){document.getElementById("registerNameError").textContent="Ingresa tu nombre completo.";ok=false}
  if(!validEmail(email)){document.getElementById("registerEmailError").textContent="Ingresa un correo institucional válido (@usbctg.edu.co o @usb.edu.co).";ok=false}
  if(password.length<4){document.getElementById("registerPasswordError").textContent="La contraseña debe tener mínimo 4 caracteres.";ok=false}
  if(confirm!==password){document.getElementById("confirmPasswordError").textContent="Las contraseñas no coinciden.";ok=false}
  if(getUsers().some(user=>user.email===email)){document.getElementById("registerEmailError").textContent="Ya existe una cuenta con este correo.";ok=false}

  if(ok){
    const users=getUsers();
    users.push({name,email,password});
    setUsers(users);
    message.textContent="Cuenta creada correctamente. Ahora puedes iniciar sesión.";
    message.className="form-message success";
    setTimeout(()=>showView("loginView"),800);
  }
};

document.getElementById("loginForm").onsubmit=e=>{
  e.preventDefault();
  clearErrors(["loginEmailError","loginPasswordError"]);
  const email=document.getElementById("loginEmail").value.trim().toLowerCase();
  const password=document.getElementById("loginPassword").value;
  let ok=true;

  if(!validEmail(email)){document.getElementById("loginEmailError").textContent="Ingresa un correo institucional válido (@usbctg.edu.co o @usb.edu.co).";ok=false}
  if(password.length<1){document.getElementById("loginPasswordError").textContent="Ingresa tu contraseña.";ok=false}
  if(!ok)return;

  const user=getUsers().find(user=>user.email===email && user.password===password);
  if(!user){
    document.getElementById("loginMessage").textContent="Correo o contraseña incorrectos.";
    document.getElementById("loginMessage").className="form-message";
    return;
  }

  sessionStorage.setItem("clase_a_clase_session",JSON.stringify({name:user.name,email:user.email}));
  location.href="index.html";
};

document.getElementById("forgotForm").onsubmit=e=>{
  e.preventDefault();
  document.getElementById("forgotEmailError").textContent="";
  const email=document.getElementById("forgotEmail").value.trim().toLowerCase();
  const message=document.getElementById("forgotMessage");

  if(!validEmail(email)){
    document.getElementById("forgotEmailError").textContent="Ingresa un correo institucional válido (@usbctg.edu.co o @usb.edu.co).";
    return;
  }

  const user=getUsers().find(user=>user.email===email);
  if(!user){
    message.textContent="No encontramos una cuenta registrada con ese correo.";
    message.className="form-message";
    return;
  }

  const newPassword=prompt("Ingresa una nueva contraseña de mínimo 4 caracteres:");
  if(newPassword===null)return;
  if(newPassword.length<4){
    message.textContent="La nueva contraseña debe tener mínimo 4 caracteres.";
    return;
  }

  const users=getUsers();
  const index=users.findIndex(user=>user.email===email);
  users[index].password=newPassword;
  setUsers(users);
  message.textContent="Contraseña actualizada correctamente. Ya puedes iniciar sesión.";
  message.className="form-message success";
};
