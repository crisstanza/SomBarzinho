import { RandomUtils } from "./classes/RandomUtils.mjs";
import { Utils } from "./classes/Utils.mjs";
import { SEARCH_IN, SORT_BY } from "./enums/enums.mjs";
import { songsCollection } from "./songs/songsCollection.mjs";
import { Song } from "./types/types.mjs";

const utils = new Utils();
const randomUtils = new RandomUtils();

const searchTerm = document.getElementById("searchTerm") as HTMLInputElement;
const clearSearch = document.getElementById("clearSearch") as HTMLButtonElement;

const search = document.getElementById("search") as HTMLElement;
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

  if (searchTerm) {
    searchTerm.addEventListener("input", showSongs);
    searchTerm.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        showSongs();
      }
    });

    const searchInClick = (event: Event) => {
      const currents = search.querySelectorAll("a.current");
      const target = event.target as HTMLElement;
      if (target.classList.contains("current")) {
        if (currents.length > 1) {
          target.classList.remove("current");
        }
      } else {
        target.classList.add("current");
      }
      showSongs();
    };
    const searchLinks = search.querySelectorAll("a");
    searchLinks.forEach((link) => link.addEventListener("click", searchInClick));

    const clearSearchClick = (event: Event) => {
      searchTerm.value = "";
      showSongs();
    };
    clearSearch.addEventListener("click", clearSearchClick);
  }
}

function getDynamicFriendlySongIdentifier(song: Song, sortBy: HTMLAnchorElement, term = "", searchFields: string[] = []) {
  const author = searchFields.includes(SEARCH_IN.ARTIST) ? utils.highlightBoldSearch(song.author, term) : song.author;
  const name = searchFields.includes(SEARCH_IN.NAME) ? utils.highlightBoldSearch(song.name, term) : song.name;
  if (SORT_BY.ARTIST == sortBy.hash) {
    return `${author} - ${name}`;
  } else {
    return `${name} - ${author}`;
  }
}

function getFriendlySongIdentifier(song: Song, term: string, searchFields: string[]) {
  const author = searchFields.includes(SEARCH_IN.ARTIST) ? utils.highlightItalicSearch(song.author, term) : song.author;
  const name = searchFields.includes(SEARCH_IN.NAME) ? utils.highlightItalicSearch(song.name, term) : song.name;
  return `${author} - ${name}`;
}

function getSongContent(song: Song, term: string, searchFields: string[]): string {
  const content = utils.highlightChords(song.content);
  return searchFields.includes(SEARCH_IN.LYRICS) ? utils.highlightItalicSearch(content, term) : content;
}

function sortSongs(songsToSort: Song[]) {
  const sortBy = sort.querySelector("a.current") as HTMLAnchorElement;
  songsToSort.sort((song1, song2) => getDynamicFriendlySongIdentifier(song1, sortBy).localeCompare(getDynamicFriendlySongIdentifier(song2, sortBy)));
  return sortBy;
}

function showSongs() {
  const term = searchTerm?.value.trim().toLowerCase() ?? "";
  const searchFields = search ? Array.from(search.querySelectorAll("a.current")).map((link) => (link as HTMLAnchorElement).hash) : [];
  const filteredSongs = songsCollection.songs.filter((song) => {
    if (!term) {
      return true;
    }
    return (searchFields.includes(SEARCH_IN.NAME) && song.name.toLowerCase().includes(term)) || (searchFields.includes(SEARCH_IN.ARTIST) && song.author.toLowerCase().includes(term)) || (searchFields.includes(SEARCH_IN.LYRICS) && song.content.toLowerCase().includes(term));
  });
  if (filteredSongs.length == songsCollection.songs.length) {
    total.innerHTML = ` (${filteredSongs.length})`;
  } else {
    total.innerHTML = ` (${filteredSongs.length}/${songsCollection.songs.length})`;
  }
  const sortBy = sortSongs(filteredSongs);
  utils.removeAllChildren(songs);
  utils.removeAllChildren(index);
  filteredSongs.forEach((song) => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="#${utils.normalize(song.author, song.name)}">${getDynamicFriendlySongIdentifier(song, sortBy, term, searchFields)}</a>`;
    index.appendChild(item);
  });
  filteredSongs.forEach((song) => {
    const title = document.createElement("h3");
    title.id = utils.normalize(song.author, song.name);
    title.innerHTML = `${getFriendlySongIdentifier(song, term, searchFields)} <a href="#musicas">(topo)</a>`;

    const content = document.createElement("span");
    content.innerHTML = getSongContent(song, term, searchFields);

    const item = document.createElement("pre");
    item.appendChild(title);
    item.appendChild(content);

    songs.appendChild(item);
    songs.appendChild(document.createElement("hr"));
    songs.appendChild(document.createElement("br"));
  });
  randomBackground();
}

function randomBackground() {
  const min = 0;
  const max = 3;
  const body = document.body;
  const bgIndex = Number(body.getAttribute("bg"));
  const currentClass = `bg-${bgIndex}`;
  let newBgIndex = randomUtils.randBetween(min, max);
  while (newBgIndex == bgIndex) {
    newBgIndex = randomUtils.randBetween(min, max);
  }
  body.classList.add(`bg-${newBgIndex}`);
  body.setAttribute("bg", newBgIndex.toString());
  body.classList.remove(currentClass);
}
