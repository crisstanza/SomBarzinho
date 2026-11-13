import { BackgroundRandomizer } from "./classes/BackgroundRandomizer.mjs";
import { Utils } from "./classes/Utils.mjs";
import { HTML, SEARCH_IN, SORT_BY, SORT_DIRECTION } from "./enums/enums.mjs";
import { collection } from "./songs/song-collection.mjs";
import { Song } from "./types/types.mjs";

const utils = new Utils();
const backgroundRandomizer = new BackgroundRandomizer();

const searchTerm = document.getElementById("searchTerm") as HTMLInputElement;
const clearSearch = document.getElementById("clearSearch") as HTMLButtonElement;

const search = document.getElementById("search") as HTMLElement;
const sort = document.getElementById("sort") as HTMLElement;
const sortDirection = document.getElementById("sortDirection") as HTMLElement;

const index = document.getElementById("index") as HTMLElement;
const songs = document.getElementById("songs") as HTMLElement;
const total = document.getElementById("total") as HTMLElement;

setListenners();
showSongs();

function setListenners() {
  const sortByClick = (event: Event) => {
    const current = sort.querySelector("a.current");
    if (current) {
      current.classList.remove(HTML.CLASS_NAMES.CURRENT);
    }
    const target = event.target as HTMLElement;
    target.classList.add(HTML.CLASS_NAMES.CURRENT);
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
      if (target.classList.contains(HTML.CLASS_NAMES.CURRENT)) {
        if (currents.length > 1) {
          target.classList.remove(HTML.CLASS_NAMES.CURRENT);
        }
      } else {
        target.classList.add(HTML.CLASS_NAMES.CURRENT);
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

  if (sortDirection) {
    const sortDirectionClick = (event: Event) => {
      const current = sortDirection.querySelector("a.current");
      if (current) {
        current.classList.remove(HTML.CLASS_NAMES.CURRENT);
      }
      const target = event.target as HTMLElement;
      target.classList.add(HTML.CLASS_NAMES.CURRENT);
      showSongs();
    };
    const sortDirectionLinks = sortDirection.querySelectorAll("a");
    sortDirectionLinks.forEach((link) => link.addEventListener("click", sortDirectionClick));
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
  const sortDirectionCurrent = sortDirection?.querySelector("a.current") as HTMLAnchorElement | null;
  const direction = sortDirectionCurrent?.hash === SORT_DIRECTION.Z_A ? -1 : 1;
  songsToSort.sort((song1, song2) => direction * getDynamicFriendlySongIdentifier(song1, sortBy).localeCompare(getDynamicFriendlySongIdentifier(song2, sortBy)));
  return sortBy;
}

function showSongs() {
  const term = searchTerm?.value.trim().toLowerCase() ?? "";
  const searchFields = search ? Array.from(search.querySelectorAll("a.current")).map((link) => (link as HTMLAnchorElement).hash) : [];
  const filteredSongs = collection.songs.filter((song) => {
    if (!term) {
      return true;
    }
    return (searchFields.includes(SEARCH_IN.NAME) && song.name.toLowerCase().includes(term)) || (searchFields.includes(SEARCH_IN.ARTIST) && song.author.toLowerCase().includes(term)) || (searchFields.includes(SEARCH_IN.LYRICS) && song.content.toLowerCase().includes(term));
  });
  if (filteredSongs.length == collection.songs.length) {
    total.innerHTML = ` (${filteredSongs.length})`;
  } else {
    total.innerHTML = ` (${filteredSongs.length}/${collection.songs.length})`;
  }
  const sortBy = sortSongs(filteredSongs);
  utils.removeAllChildren(songs);
  utils.removeAllChildren(index);
  filteredSongs.forEach((song) => {
    index.classList.remove(HTML.CLASS_NAMES.NO_RESULTS);
    const itemLi = document.createElement("li");
    itemLi.innerHTML = `<a href="#${utils.normalize(song.author, song.name)}">${getDynamicFriendlySongIdentifier(song, sortBy, term, searchFields)}</a>`;
    index.appendChild(itemLi);

    const title = document.createElement("h3");
    title.id = utils.normalize(song.author, song.name);
    title.innerHTML = `${getFriendlySongIdentifier(song, term, searchFields)} <a href="#musicas">(topo)</a>`;

    const content = document.createElement("span");
    content.innerHTML = getSongContent(song, term, searchFields);

    const itemPre = document.createElement("pre");
    itemPre.appendChild(title);
    itemPre.appendChild(content);

    songs.appendChild(itemPre);
    songs.appendChild(document.createElement("hr"));
    songs.appendChild(document.createElement("br"));
  });
  if (filteredSongs.length == 0) {
    const itemLi = document.createElement("li");
    itemLi.innerText = `Nenhum resultado encontrado.`;
    index.appendChild(itemLi);
    index.classList.add(HTML.CLASS_NAMES.NO_RESULTS);
  }
  backgroundRandomizer.apply();
}
