let btnLogin = document.querySelector("#btn-login");

const username_txt = document.querySelector("#username");
const pass_txt = document.querySelector("#pass");

const usernameFeedback = document.getElementById('usernameFeedback');
const passwordFeedback = document.getElementById('passwordFeedback');

btnLogin.addEventListener("click", () => {
    const storedUsername = 'matla';
     const storedPassword = 'password';

    let usernamevalueinput = username_txt.value;
    let passwordvalueinput = pass_txt.value;
    
    errorMes = 0;

  if(!usernamevalueinput){
    usernameFeedback.textContent = "Enter username";
    errorMes = 1;
  }  if(!passwordvalueinput){
    passwordFeedback.textContent = "Enter username";
    errorMes = 1;
  }
  if(!errorMes){
    if (usernamevalueinput === storedUsername && passwordvalueinput === storedPassword) { 
      window.location.href = `dashboard.html`; 

    }
       else { 
        document.getElementById('message').textContent = 'Invalid username or password. Please try again.'; 
      }
  }
  })


  