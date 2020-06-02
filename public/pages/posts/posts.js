export const signIn = () => {
    const container = document.createElement('div');

    container.innerHTML = `
        <h1> Bem vindo </h1>
        <a href="/#">
        <button id="loggout" >Sair</button>
        </a>
    <br> <br>

    <form>
        <input type=text id="porfavor">

        <button id="postar"  type="submit">Postar</button>
    </form>

    <ul id="postados">

    </ul>

    `;
    return container;
};
