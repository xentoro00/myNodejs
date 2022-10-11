const header = document.getElementsByTagName("h1")[0]
const body = document.getElementsByTagName("p")[0];
const input = document.getElementById("searchInput")
const button = document.getElementById("searchButton")
var data;
async function main() {
    await fetch('http://localhost:3000/data')
    .then(response =>  response.json())
    .then(json =>  data = json);
header.innerText = data.titleSong;
body.innerText = data.bodySong;
}

main();
button.addEventListener("click", () => {
    if(input.value == "") return
    let data = {
        inputText: input.value.toString()
    }
    console.log(JSON.stringify(data));
    fetch('http://localhost:3000/searchSong', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
})