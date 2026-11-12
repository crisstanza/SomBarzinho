import { HTML } from "../enums/enums.mjs";
import { RandomUtils } from "./RandomUtils.mjs";

export class BackgroundRandomizer {
  private readonly randomUtils: RandomUtils;

  private static readonly MIN = 0;
  private static readonly MAX = 3;

  constructor() {
    this.randomUtils = new RandomUtils();
  }

  apply() {
    const body = document.body;
    const bgIndex = Number(body.getAttribute(HTML.ATTRIBUTE_NAMES.BG));
    const currentClass = HTML.CLASS_NAMES.BG_X(bgIndex);
    let newBgIndex = this.newRandomIndex();
    while (newBgIndex == bgIndex) {
      newBgIndex = this.newRandomIndex();
    }
    body.classList.add(HTML.CLASS_NAMES.BG_X(newBgIndex));
    body.setAttribute(HTML.ATTRIBUTE_NAMES.BG, newBgIndex.toString());
    body.classList.remove(currentClass);
  }

  private newRandomIndex() {
    return this.randomUtils.randBetween(BackgroundRandomizer.MIN, BackgroundRandomizer.MAX);
  }
}
