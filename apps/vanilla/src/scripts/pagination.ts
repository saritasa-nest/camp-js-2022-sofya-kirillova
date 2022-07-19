import { ButtonParameters, PaginationLimitOptions, PaginationParameters } from './interfaces';

/**
 * Render pagination on the page.
 * @param paginationParameters Parameters for pagination.
 */
export function renderPagination(paginationParameters: PaginationParameters): void {
  const rangePlaceholder = document.createElement('span');
  rangePlaceholder.textContent = '...';
  const maxStepsSelectedPage = 3;
  const firstPageNumber = 1;
  const buttonParameters = {
    startPage: paginationParameters.startPage,
    returnCurrentPage: paginationParameters.returnCurrentPage,
  };
  const paginationLimitOptions = {
    pagesCount: paginationParameters.pagesCount,
    paginationContainer: paginationParameters.paginationContainer,
  };
  const numberOfDisplayedPages = returnSmallestValue(paginationParameters.pagesCount, maxStepsSelectedPage * 2);
  paginationParameters.paginationContainer.innerHTML = '';

  if (paginationParameters.startPage !== firstPageNumber) {
    paginationParameters.paginationContainer.append(createButton({
      label: '&#9668;',
      value: 'previous_page',
      ...buttonParameters,
    }));
  }

  if (paginationParameters.startPage < numberOfDisplayedPages) {
    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      paginationParameters.paginationContainer.append(createButton({
        label: i,
        ...buttonParameters,
      }));
    }

    if (numberOfDisplayedPages !== paginationParameters.pagesCount) {
      addPaginationLimit(
        { ...paginationLimitOptions, isLeftLimit: false },
        { ...buttonParameters, label: paginationParameters.pagesCount },
      );
    }
  } else if (paginationParameters.pagesCount - paginationParameters.startPage <= numberOfDisplayedPages - 1) {
    addPaginationLimit(
      { ...paginationLimitOptions, isLeftLimit: true },
      { ...buttonParameters, label: firstPageNumber },
    );

    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      const numberPage = paginationParameters.pagesCount + i - numberOfDisplayedPages;
      paginationParameters.paginationContainer.append(createButton({
        label: numberPage,
        ...buttonParameters,
      }));
    }
  } else {
    addPaginationLimit(
      { ...paginationLimitOptions, isLeftLimit: true },
      { ...buttonParameters, label: firstPageNumber },
    );

    for (let i = -maxStepsSelectedPage; i <= maxStepsSelectedPage; i++) {
      const numberPage = paginationParameters.startPage + i;
      paginationParameters.paginationContainer.append(createButton({
        label: numberPage,
        ...buttonParameters,
      }));
    }

    addPaginationLimit(
      { ...paginationLimitOptions, isLeftLimit: false },
      { ...buttonParameters, label: paginationParameters.pagesCount },
    );
  }

  if (paginationParameters.startPage !== paginationParameters.pagesCount) {
    paginationParameters.paginationContainer.append(createButton({
      label: '&#9658;',
      value: 'next_page',
      ...buttonParameters,
    }));
  }
}

/**
 * Create a button according to the parameters.
 * @param parameters Parameters for button.
 */
function createButton(parameters: ButtonParameters): HTMLButtonElement {
  const value = parameters.value ?? parameters.label;
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = String(parameters.label);
  buttonElement.addEventListener('click', event => addListenersToPagination(
    event,
    parameters.startPage,
    parameters.returnCurrentPage,
  ));
  buttonElement.value = String(value);
  buttonElement.className = parameters.label === parameters.startPage ?
    'pagination__page pagination__page--current' :
    'pagination__page';

  return buttonElement;
}

/**
 * @param event The pressed button.
 * @param startPage The page from which the pagination begins.
 * @param returnCurrentPage Return the current page number.
 */
function addListenersToPagination(
  event: Event,
  startPage: number,
  returnCurrentPage: (currentPage: number) => void,
): void {
  let currentPage = startPage;
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
  returnCurrentPage(currentPage);
}

/**
 * Compares two numbers.
 * @param firstNumber The first number.
 * @param secondNumber The second number.
 */
function returnSmallestValue(firstNumber: number, secondNumber: number): number {
  if (firstNumber < secondNumber) {
    return firstNumber;
  }
  return secondNumber;
}

/**
 * Add additional elements to the pagination block.
 * @param paginationLimitOptions Parameters for pagination limit.
 * @param buttonParameters Parameters for button.
 */
function addPaginationLimit(
  paginationLimitOptions: PaginationLimitOptions,
  buttonParameters: ButtonParameters,
): void {
  const rangePlaceholder = document.createElement('span');
  rangePlaceholder.textContent = '...';
  if (paginationLimitOptions.isLeftLimit === true) {
    paginationLimitOptions.paginationContainer.append(createButton({
      ...buttonParameters,
    }));
    paginationLimitOptions.paginationContainer.append(rangePlaceholder.cloneNode(true));
  } else {
    paginationLimitOptions.paginationContainer.append(rangePlaceholder.cloneNode(true));
    paginationLimitOptions.paginationContainer.append(createButton({
      ...buttonParameters,
    }));
  }
}
