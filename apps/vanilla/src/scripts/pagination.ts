import { ButtonParameters } from './interfaces';

/** Pagination. */
export class Pagination {

  /** The block where the pagination is located. */
  public readonly paginationContainer: Element;

  /** The page from which the pagination begins. */
  public readonly startPage: number;

  /** Total number of pages in pagination. */
  public readonly pagesCount: number;

  /** Send the current page number. */
  public readonly sendCurrentPage: Function;

  public constructor(paginationContainer: Element, startPage: number, pagesCount: number, sendCurrentPage: Function) {
    this.paginationContainer = paginationContainer;
    this.startPage = startPage;
    this.pagesCount = pagesCount;
    this.sendCurrentPage = sendCurrentPage;
  }

  /** Render pagination on the page. */
  public renderPagination(): void {
    const rangePlaceholder = document.createElement('span');
    rangePlaceholder.textContent = '...';
    const maxStepsSelectedPage = 2;
    const reportStart = 1;
    const numberOfDisplayedPages = maxStepsSelectedPage * 2;
    this.paginationContainer.innerHTML = '';
    if (this.pagesCount === 1) {
      return;
    }
    if (this.startPage !== reportStart) {
      this.paginationContainer.append(this.createButton({ content: '&#9668;', value: 'previous_page' }));
    }
    if (this.startPage < numberOfDisplayedPages) {
      for (let i = 1; i <= numberOfDisplayedPages; i++) {
        if (i <= this.pagesCount) {
          this.paginationContainer.append(this.createButton({ content: i }));
        } else {
          break;
        }
      }
      if (this.pagesCount > numberOfDisplayedPages) {
        this.paginationContainer.append(rangePlaceholder);
        this.paginationContainer.append(this.createButton({ content: this.pagesCount }));
      }

    } else if (this.pagesCount - this.startPage < numberOfDisplayedPages - 1) {
      this.paginationContainer.append(this.createButton({ content: reportStart }));
      this.paginationContainer.append(rangePlaceholder);
      for (let i = 1; i <= numberOfDisplayedPages; i++) {
        const numberPage = this.pagesCount + i - numberOfDisplayedPages;
        this.paginationContainer.append(this.createButton({ content: numberPage }));
      }

    } else {
      this.paginationContainer.append(this.createButton({ content: reportStart }));
      this.paginationContainer.append(rangePlaceholder);
      for (let i = -maxStepsSelectedPage; i <= maxStepsSelectedPage; i++) {
        const numberPage = this.startPage + i;
        this.paginationContainer.append(this.createButton({ content: numberPage }));
      }
      this.paginationContainer.append(rangePlaceholder.cloneNode(true));
      this.paginationContainer.append(this.createButton({ content: this.pagesCount }));
    }
    if (this.startPage !== this.pagesCount && this.pagesCount > numberOfDisplayedPages) {
      this.paginationContainer.append(this.createButton({ content: '&#9658;', value: 'next_page' }));
    }

  }

  /**
   * Create a button according to the parameters.
   * @param parameters Parameters for button.
   */
  private createButton(parameters: ButtonParameters): HTMLButtonElement {
    const value = parameters.value ?? parameters.content;
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = String(parameters.content);
    buttonElement.addEventListener('click', event => this.addListenersToPagination(event));
    buttonElement.value = String(value);
    if (parameters.content === this.startPage) {
      buttonElement.className = 'pagination__page--current';
    }
    return buttonElement;
  }

  /**
   * Add a click event to the button.
   * @param event The pressed button.
   */
  private addListenersToPagination(event: Event): void {
    let currentPage = this.startPage;
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    scrollTo(0, 0);
    const selectedPageContainer = event.target;
    if (selectedPageContainer.value === 'next_page') {
      currentPage++;
    } else if (selectedPageContainer.value === 'previous_page') {
      currentPage--;
    } else if (isNaN(Number(selectedPageContainer.value))) {
      throw new Error('Page number not found.');
    } else {
      currentPage = Number(selectedPageContainer.value);
    }
    this.sendCurrentPage(currentPage);
  }

}
