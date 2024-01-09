const characterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const btnReset = document.getElementById("btn-reset");
const content = document.getElementById("content");
const image = document.getElementById("img");

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return result;
};

const keys = ["name", "status", "species", "gender", "origin", "episode"];

const buildResult = (result) => {
  const newObjetct = {};
  keys
    .map((key) => document.getElementById(key))
    .map((elem) => {
      elem.checked && (newObjetct[elem.name] = result[elem.name]);
    });

  return newObjetct;
};

btnGo.addEventListener("click", async (event) => {
  event.preventDefault();
  const result = await fetchApi(characterId.value);
  //content.textContent = `${JSON.stringify(result, undefined, 2)}`;
  content.textContent = `${JSON.stringify(buildResult(result), undefined, 2)}`;
  console.log(buildResult(result));
  image.src = `${result.image}`;
});

btnReset.addEventListener("click", () => location.reload());
