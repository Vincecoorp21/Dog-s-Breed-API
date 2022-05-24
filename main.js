const API_URL_ALL = 'https://dog.ceo/api/breeds/list/all';
const API_URL_RANDOM = 'https://dog.ceo/api/breeds/image/random';
const API_URL_PIC = 'https://dog.ceo/api/breed/african/images'; //
const API_URL_BREED = 'https://dog.ceo/api/breed/';
const breedsDiv = document.getElementById('all_breeds');
const all_breeds_link = document.getElementById('all_breeds_link');
const random_breed_link = document.getElementById('random_breed_link');
const randomDiv = document.getElementById('random_breed');
const picDiv = document.getElementById('specific_breed');
const specific_picDiv = document.getElementById('specific_breed');
const african = document.getElementById('african_link');
const searchbreed = document.getElementById('search_breed');
const btn_search_breed = document.getElementById('btn');
const choosebreed_Div = document.getElementById('choose_breed');

//console.log(API_URL_ALL);
/*********************FUNCTION SHOWBREEDS*******************************/
/*******PRINT ALL THE TEXT BREEDS ON THE SCREEN*************************/

const showBreeds = async () => {
  try {
    breedsDiv.innerHTML = '';
    const res = await axios.get(API_URL_ALL);
    //console.log(res.data.message);
    const razas = res.data.message;
    console.log(razas);
    printBreeds(razas);
  } catch (error) {
    console.log(error);
  }
};
all_breeds_link.addEventListener('click', showBreeds);

/******************************************************* */
const printBreeds = breeds => {
  //breedsDiv.innerHTML = `<div>hola</div>`;
  breedsDiv.classList.remove('hidden');
  specific_picDiv.classList.add('hidden');
  choosebreed_Div.classList.add('hidden');
  randomDiv.classList.add('hidden');
  for (let breed in breeds) {
    breedsDiv.innerHTML += `<div class="breed-print-all"><a>${breed}</a></div>`;
  }
};

/**************FUNCTIO SHOWRANDOM***************************************/
/*************PRINT ONE RANDOM PIC ON THE SCREEN*********************/
const showRandom = async () => {
  try {
    const random_all = await axios.get(API_URL_RANDOM);
    console.log(random_all);
    const random_img = random_all.data.message;
    //console.log(random_img);
    printRandom(random_img);
  } catch (error) {
    console.log(error);
  }
};
/*-----*/
const printRandom = img => {
  breedsDiv.classList.add('hidden');
  specific_picDiv.classList.add('hidden');
  choosebreed_Div.classList.add('hidden');
  randomDiv.classList.remove('hidden');
  randomDiv.innerHTML = `<div><img class="random_img"src=${img} alt="Card image"/></div>`;

  //console.log(img);
};
random_breed_link.addEventListener('click', showRandom);

/******************FUNCTION SPECIFIC BREED****************************+*/
/***********PRINTS AFRICAN BREED ON THE SCREEN*************************************/
const specificBreed = async () => {
  try {
    //console.log('works');
    const pics = await axios.get(API_URL_PIC);
    const african_pics = pics.data.message;
    console.log(african_pics);
    showSpecificBreed(african_pics);
  } catch (error) {
    console.log(error);
  }
};

/***************************************/

const showSpecificBreed = african_pics => {
  breedsDiv.classList.add('hidden');
  specific_picDiv.classList.remove('hidden');
  choosebreed_Div.classList.add('hidden');
  randomDiv.classList.add('hidden');
  african_pics.forEach(pic => {
    console.log(pic);
    specific_picDiv.innerHTML += `
    <div><img class="random_img" src=${pic} alt="Card image"/></div> `;
  });

  //specific_picDiv.innerHTML;
};

african.addEventListener('click', specificBreed);

// function sabervalue() {
//   const que_raza = searchbreed.value;
//   console.log(que_raza);
// }
/***********FUNCTION CHOOSE YOUR BREED**************/
/***************************************************/

const chooseYourBreed = async e => {
  e.preventDefault();
  choosebreed_Div.innerHTML = '';
  try {
    const what_breed = searchbreed.value;
    //console.log(que_raza);
    const choose_array = await axios.get(
      API_URL_BREED + what_breed + '/images'
    );
    const choose_imgs = choose_array.data.message;
    //console.log(choose_imgs);
    showInput(choose_imgs);
  } catch (error) {
    console.log(error);
  }
};

/****************************************/
const showInput = breeds => {
  breedsDiv.classList.add('hidden');
  specific_picDiv.classList.add('hidden');
  choosebreed_Div.classList.remove('hidden');
  randomDiv.classList.add('hidden');
  breeds.forEach(breed => {
    choosebreed_Div.innerHTML += `<div><img class="random_img" src=${breed} alt="Card image"/></div>`;
  });
};

btn_search_breed.addEventListener('click', chooseYourBreed);
