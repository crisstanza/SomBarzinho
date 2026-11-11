export class Utils {
  #normalizeStr(str: string) {
    return str
      .replace(/\s/g, "-")
      .normalize("NFD")
      .replace(/[\p{Mn}]+/gu, "");
  }

  #escapeStr(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  normalize(author: string, title: string) {
    const parts = [];
    parts.push(this.#normalizeStr(author));
    parts.push("_");
    parts.push(this.#normalizeStr(title));
    return parts.join("");
  }

  highlightChords(str: string) {
    return this.#highlightInSquareBrackets(this.#highlightInCurlyBrackets(str));
  }

  highlightBoldSearch(str: string, term: string) {
    if (!term) {
      return str;
    }
    return str.replace(new RegExp(this.#escapeStr(term), "gi"), (match) => `<b>${match}</b>`);
  }

  highlightItalicSearch(str: string, term: string) {
    if (!term) {
      return str;
    }
    return str.replace(new RegExp(this.#escapeStr(term), "gi"), (match) => `<i class="result">${match}</i>`);
  }

  #highlightInSquareBrackets(str: string) {
    return str.replace(/\[([^\]]+)\]/g, "<b>[$1]</b>");
  }

  #highlightInCurlyBrackets(str: string) {
    return str.replace(/\{([^\}]+)\}/g, "<i>{$1}</i>");
  }

  removeAllChildren(node: HTMLElement) {
    while (node.firstChild) {
      node.removeChild(node.lastChild as Node);
    }
  }
}
