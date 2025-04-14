export class Utils {

    #cleanStr(str) {
        return str
            .replace(/\s/g, '-')
            .normalize('NFD').replace(/[\p{Mn}]+/gu, '');
        ;
    }

    clean(author, title) {
        const parts = [];
        parts.push(this.#cleanStr(author));
        parts.push('_');
        parts.push(this.#cleanStr(title));
        return parts.join('');
    }

    highlight(str) {
        return this.#highlightInSquareBrackets(this.#highlightInCurlyBrackets(str));
    }

    #highlightInSquareBrackets(str) {
        return str.replace(/\[([^\]]+)\]/g, '<b>[$1]</b>');
    }

    #highlightInCurlyBrackets(str) {
        return str.replace(/\{([^\}]+)\}/g, '<i>{$1}</i>');
    }
}
