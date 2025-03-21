let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
input = document.querySelector("input");
search = document.querySelector(".search");
let li1 = document.querySelector(".firstmeaning");
li2 = document.querySelector(".secondmeaning");
let playbtn = document.querySelector(".playbtn");
let audio = document.querySelector("audio");
li1.remove();
li2.remove();
let error = document.querySelector(".error");
ul = document.querySelector("ul");
search.addEventListener("click", (event) => {
  event.preventDefault();
  let wordtosearch = input.value;
  getWord(wordtosearch);
});

async function getWord(wordtosearch) {
  try {
    error.innerHTML = "";
    let response = await axios.get(url + wordtosearch);
    let data = await response.data;
    meanings = data[0].meanings;
    definitions = meanings[0].definitions;
    realmeaning1 = definitions[0];
    ul.appendChild(li1);
    let phonetics = data[0].phonetics[0].audio;
    if (phonetics) {
      playbtn.classList.add("show");
      console.log(phonetics);
      audio.src = await phonetics;
      playbtn.addEventListener("click", async () => {
        await audio.play();
      });
    } else {
      audio.src = "";
      playbtn.classList.remove("show");
    }
    console.log(realmeaning1.definition);

    li1.innerText = realmeaning1.definition;
    if (definitions.length > 1) {
      realmeaning2 = definitions[1];
      console.log(realmeaning2.definition);
      li2.innerText = realmeaning2.definition;
      ul.appendChild(li2);
    } else {
      li2.remove();
    }
  } catch (err) {
    playbtn.classList.remove("show");
    error.innerText = `We don't have explicit meaning for "${wordtosearch}"`;
    li1.remove();
    li2.remove();
  }
}
