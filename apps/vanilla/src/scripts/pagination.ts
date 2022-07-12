import { ButtonParameters } from './interfaces';

export class Pagination{
  public paginationContainer: Element;
  public startPage: number;
  public pagesCount: number;
  public changeCurrentPage: Function
  public constructor(paginationContainer: Element, startPage: number, pagesCount: number, changeCurrentPage: Function) {
    this.paginationContainer = paginationContainer;
    this.startPage = startPage;
    this.pagesCount = pagesCount;
    this.changeCurrentPage = changeCurrentPage;
  }
  /**
 * Render pagination on the page.
 * @param paginationOptions Parameters for pagination.
 */
  public renderPagination(): void {
    const rangePlaceholder = document.createElement('span');
    rangePlaceholder.textContent = '...'
    const maxStepsSelectedPage = 3
    // let paginationContent = ``;
    const reportStart = 1;
    const numberOfDisplayedPages = maxStepsSelectedPage * 2;
    this.paginationContainer.innerHTML = ''

    if (this.startPage !== reportStart) {
      this.paginationContainer.append(this.createButton({ content: '&#9668;', value: 'previous_page' }))
    }
    if (this.startPage < numberOfDisplayedPages) {
      for (let i = 1; i <= numberOfDisplayedPages; i++) {
        this.paginationContainer.append(this.createButton({ content: i }));
      }
      this.paginationContainer.append(rangePlaceholder)
      this.paginationContainer.append(this.createButton({ content: this.pagesCount }));

    } else if (this.pagesCount - this.startPage < numberOfDisplayedPages - 1) {
      this.paginationContainer.append(this.createButton({ content: reportStart }));
      this.paginationContainer.append(rangePlaceholder)
      for (let i = 1; i <= numberOfDisplayedPages; i++) {
        const numberPage = this.pagesCount + i - numberOfDisplayedPages;
        this.paginationContainer.append(this.createButton({ content: numberPage }));
      }

    } else {
      this.paginationContainer.append(this.createButton({ content: reportStart }));
      this.paginationContainer.append(rangePlaceholder)
      for (let i = -maxStepsSelectedPage; i <= maxStepsSelectedPage; i++) {
        const numberPage = this.startPage + i;
        this.paginationContainer.append(this.createButton({ content: numberPage }));
      }
      this.paginationContainer.append(rangePlaceholder.cloneNode(true))
      this.paginationContainer.append(this.createButton({ content: this.pagesCount }));
    }
    if (this.startPage !== this.pagesCount) {
      this.paginationContainer.append(this.createButton({ content: '&#9658;', value: 'next_page' }));
    }

  }
  /**
 * Return a string with a button in the form of HTML.
 * @param parameters Parameters for button.
 */
  private createButton(parameters: ButtonParameters): HTMLButtonElement {
    const value = parameters.value || parameters.content
    const buttonElement = document.createElement('button')
    buttonElement.innerHTML = String(parameters.content)
    buttonElement.addEventListener('click', event => addListenersToPagination(event, this.startPage, this.changeCurrentPage))
    buttonElement.value = String(value)
    if (parameters.content === this.startPage){
      buttonElement.className = 'pagination__page--current'
    }
    return buttonElement;
  }

}

  /**
     * Page rendering on click.
     * @param event The pressed button.
     */
  function addListenersToPagination(event: Event, currentPage: number,changeCurrentPage: Function): void {
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
    changeCurrentPage(currentPage);
  }