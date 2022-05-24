const API_URL = 'https://api.github.com/users/';
const input_text = document.getElementById('input-text');
const button_search = document.getElementById('buscar-btn');
const githubDiv = document.getElementById('githubDiv');

/*******************************************************/

/************** */
const obtenerPerfil = async () => {
  try {
    //input_text = '';
    const busqueda = input_text.value;
    const res = await axios.get(API_URL + busqueda);
    console.log(res.data.login);
    console.log(res);
    const login = res.data.login;
    const avatar = res.data.avatar_url;
    const repos = res.data.public_repos;
    //console.log(avatar);
    mostrarPerfil(login, avatar, repos);
  } catch (error) {
    console.log(error);
  }
};
button_search.addEventListener('click', obtenerPerfil);
/*************************** */

const mostrarPerfil = (nombre, avatar, repos) => {
  githubDiv.innerHTML = `<div class="card" style="width: 18rem; margin: 2rem auto;" >
  <img src=${avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${repos} repos</p>
    
  </div>
</div>`;
};
/********************/
