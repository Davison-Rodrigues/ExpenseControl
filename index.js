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