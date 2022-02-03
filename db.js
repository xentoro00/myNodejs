const Genius = require("genius-lyrics");
const Client = new Genius.Client("ubAWlnbeJusuu8P4w9gPbLPOeRgE9M_eFKoWGCnRMj8gVnIbziYRFS0UeAAsRHt0");

// DON'T FORGET TO LOAD THE REQUIRED JS MODULES
const express = require("express");
const { useTreblle } = require("treblle");
 
const app = express();
app.use(express.json());
 
useTreblle(app, {
    apiKey: "RdZB9gXbPEVktubCfsNBwaRIwwEJDYtl",
    projectId: "ySSIsMGrPVE2aQbO"
});

async function main() {  
    const songToFind = "FORT I FORTE - BUTA - FREESTYLE";
    // clear the title (remove: x ft. feat. - ( ) . In the title)
    let clearedTitle = songToFind.split("x ").join("");
    clearedTitle = clearedTitle.split("ft. ").join("");
    clearedTitle = clearedTitle.split("feat. ").join("");
    clearedTitle = clearedTitle.split("- ").join("");
    clearedTitle = clearedTitle.split("(").join("");
    clearedTitle = clearedTitle.split(")").join("");
    
    // Get the song from the cleared title
    const searches = await Client.songs.search(clearedTitle);
 
    // clear the searched song
    let searchedSongTitle = searches[0].title.split("by").join("");
    searchedSongTitle = searchedSongTitle.split("-").join("");

    // Confirm that it is the correct song
    let correctArtist = checkArtist(clearedTitle, searches[0].artist.name)
    let correctSong = checkTitle(clearedTitle, searchedSongTitle) && correctArtist;


    // If it is the correct song the get the lyrics
    if(correctSong){
        const lyrics = await searches[0].lyrics();
        console.log("Lyrics of the Song:\n", lyrics, "\n");
    }
};
main();

function checkTitle (toFindSong, searchedSong) {
    let r = false;
    toFindSong.split(" ").forEach(e => {
        let doesntIncludeCounter = 0;
        searchedSong.split(" ").forEach(x => {
            if (!e.toLowerCase().includes(x.toLowerCase())){
                doesntIncludeCounter++;
            };
        });
        if(doesntIncludeCounter < searchedSong.split(" ").length) {r = true;}
    })
    return r;
}
function checkArtist(title, artist) {
    let r =false;
    let artists = artist.split(" & ");
    artists.forEach(e => {
        if(title.split(" ").includes(e)){
            r = true;
        };
    })
    return r;
}