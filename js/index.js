const form = { // Criando objetos de atalho para acessar facilmente.
    email: () => document.getElementById("email"),
    senha: () => document.getElementById("senha"),
    recoverButtonP: () => document.getElementById("recover-password-button"),
    loginButton: () => document.getElementById("login-button"),
    pInvalidError: () => document.getElementById("password-invalid-error"),
    eInvalidError: () => document.getElementById("email-invalid-error"),
    eRequiredError: () => document.getElementById("email-required-error"),
    pRequiredError: () => document.getElementById("password-required-error")
}

function onChangeEmail(){
    toggleButtonsDisabled();
    toggleEmailErros();
}

function onChangePassword(){
    toggleButtonsDisabled();
    togglePasswordErrors();
}

function toggleEmailErros() { // Condição ? verdadeira : Falsa.
    const email = form.email().value;
    form.eRequiredError().style.display = email ? 'none' : 'block'
    form.eInvalidError().style.display = isEmailValid() ? 'none' : 'block';
}

function togglePasswordErrors() {
    const password = form.senha().value;
    form.pRequiredError().style.display = password ? 'none' : 'block';
    form.pInvalidError().style.display = isPasswordValid() ? 'none' : 'block';
}

function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    form.recoverButtonP().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.senha().value;
    if (!password) {
        return false;
    } return true;
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value).then(response => {
        hideLoading();
        window.location.href = "./home.html";
    }).catch(error =>{
        hideLoading();
        alert('Usuário não econtrado!');
    });

}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert("Email de recuperação enviado com sucesso para " + form.email().value);
    }).catch(error => {
        hideLoading();
        alert("Email inválido");
    });
}

function goRegister() {
    window.location.href = "./register.html";
}

function pagLogin(){
    window.location.href = "./index.html";
}

function register(){
    showLoading();
    const email = form.email().value;
    const senha = form.senha().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, senha
    ).then(() => {
        hideLoading();
        window.location.href ="./home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error){ //Pega código de erro error.code para mostrar msg personalizada.
    if (error.code =='auth/email-already-in-use'){
        return "Email já está em uso!";
    }
    else if (error.code == 'auth/weak-password'){
        return "Senha fraca!";
    }
    return error.message;
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href ='./home.html';
    }
})