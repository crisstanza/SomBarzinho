export class Utils {
  #cleanStr(str: string) {
    return str
      .replace(/\s/g, "-")
      .normalize("NFD")
      .replace(/[\p{Mn}]+/gu, "");
  }

  clean(author: string, title: string) {
    const parts = [];
    parts.push(this.#cleanStr(author));
    parts.push("_");
    parts.push(this.#cleanStr(title));
    return parts.join("");
  }

  highlight(str: string) {
    return this.#highlightInSquareBrackets(this.#highlightInCurlyBrackets(str));
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
