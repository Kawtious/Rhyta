export class PageSelection {
    take: number = 10;
    maxDisplayedPagesLeft: number = 2;
    maxDisplayedPagesRight: number = 2;
    showingAllRightPages: boolean = false;
    showingAllLeftPages: boolean = false;
    selectedPage: number = 1;
    selectedFirstPage: boolean = true;
    selectedLastPage: boolean = true;
    previousPages: number[] = [];
    nextPages: number[] = [];

    constructor() {}
}
