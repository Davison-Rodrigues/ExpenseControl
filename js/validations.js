function validateEmail(email) { //VERIFICAÇÃO DE EMAIL DIGITADO
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}