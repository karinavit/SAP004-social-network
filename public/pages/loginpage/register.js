export const register = () => {
    const container = document.createElement('div');

    container.innerHTML = `
    <a href="/#">
    <button >Voltar</button>
    </a>
        <label> Digite seu nome Completo </label>
        <input id="name-input-register" type="text">
        <label> Digite seu e-mail </label>
        <input id="email-input-register" type="email">
        <label> Digite sua data de nascimento </label>
        <input id="date-input-register" type="date">
        <label> Digite sua senha nova </label>
        <input id="password-input-register" type="password">
        <a href="/#posts" >
        <button id="sign-in-button">Registrar-se</button>
        </a>

    `;
    return container;
};