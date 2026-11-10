import { Utils } from "./classes/Utils.mjs";
import { SORT_BY } from "./enums/enums.mjs";
import { songsCollection } from "./songs/songsCollection.mjs";
import { Song } from "./types/types.mjs";

const utils = new Utils();

const sort = document.getElementById("sort") as HTMLElement;
const index = document.getElementById("index") as HTMLElement;
const songs = document.getElementById("songs") as HTMLElement;
const total = document.getElementById("total") as HTMLElement;

setListenners();
showSongs();

function setListenners() {
  const sortByClick = (event: Event) => {
    const current = sort.querySelector("a.current");
    if (current) {
      current.classList.remove("current");
    }
    const target = event.target as HTMLElement;
    target.classList.add("current");
    showSongs();
  };
  const sortLinks = sort.querySelectorAll("a");
  sortLinks.forEach((link) => link.addEventListener("click", sortByClick));
}

function getSongIdentifier(song: Song, sortBy: HTMLAnchorElement) {
  if (SORT_BY.ARTIST == sortBy.hash) {
    return `${song.author} - ${song.name}`;
  } else {
    return `${song.name} - ${song.author}`;
  }
}

function sortSongs() {
  const sortBy = sort.querySelector("a.current") as HTMLAnchorElement;
  songsCollection.songs.sort((song1, song2) => getSongIdentifier(song1, sortBy).localeCompare(getSongIdentifier(song2, sortBy)));
  return sortBy;
}

function showSongs() {
  total.innerHTML = ` (${songsCollection.songs.length})`;
  const sortBy = sortSongs();
  utils.removeAllChildren(songs);
  utils.removeAllChildren(index);
  songsCollection.songs.forEach((song) => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="#${utils.clean(song.author, song.name)}">${getSongIdentifier(song, sortBy)}</a>`;
    index.appendChild(item);
  });
  songsCollection.songs.forEach((song) => {
    const title = document.createElement("h3");
    title.id = utils.clean(song.author, song.name);
    title.innerHTML = `${song.author} - ${song.name} <a href="#musicas">(topo)</a>`;

    const content = document.createElement("span");
    content.innerHTML = `${utils.highlight(song.content)}`;

    const item = document.createElement("pre");
    item.appendChild(title);
    item.appendChild(content);

    songs.appendChild(item);
    songs.appendChild(document.createElement("hr"));
    songs.appendChild(document.createElement("br"));
  });
}
