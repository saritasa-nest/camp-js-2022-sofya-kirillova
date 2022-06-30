import { anime_table_output } from "../pages/anime_table"
import { api } from "./api"
/**
 * 
 * 
 * @param {Element} position where is the pagination located
 * @param {string} https API
 * @param {number} size number of results to return per page.
 * @param {number} step pages before and after current
 * @param {number} current_page current page
 */
export const pagination = ((position: Element, https: string, size = 25, step = 3, current_page = 1): void => {
    position.addEventListener('click', event => onClick(event))
    const select_element = document.querySelector("#sort-anime-table")
    if (select_element === null) {
      throw new Error('not element')
  }
    let ordering = 'title_eng'
    select_element.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement
      sort(target.value)
    })
  
    console.log(select_element)
    const start = ((api_address = `${https}limit=${size}&offset=${(current_page - 1) * size}&ordering=${ordering},id`) => {
      const anime_promise = api(api_address, 'GET')
      anime_table_output(anime_promise)
      anime_promise.then(anime_data => {
        const count_page = Math.ceil(anime_data.count / size);
        rendering(anime_data.previous, anime_data.next, count_page)
  
      })
    })
    /**
     * 
     * @param {string} value selected sorting type
     */
    const sort = ((value: string)=>{
      ordering = value
      start()
    })
    /**
     * 
     * @param previous api of the previous page
     * @param next api of the next page
     * @param count_page count pages
     */
    const rendering = ((previous: string, next: string, count_pages: number) => {
      let div_HTML = ``
      if (current_page < step + 3) {
        for (let i = 1; i < step * 2 + 3; i++) {
          div_HTML += `
            <button>${i}</button>`
        }
        div_HTML += `
            <span>...</span>
            <button>${count_pages}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`
        position.innerHTML = div_HTML
      }
      else if (count_pages - current_page < step + 3) {
        const count_view_number_page = step * 2
  
        div_HTML += `
            <button id='previous_page' value='${previous}'>&#9668;</button>
            <button>1</button>
            <span>...</span>`
        for (let i = 0; i <= count_view_number_page; i++) {
          const number_page = count_pages + i - count_view_number_page
          div_HTML += `
            <button>${number_page}</button>`
        }
        position.innerHTML = div_HTML
      }
      else {
        div_HTML += `
            <button id='previous_page' value='${previous}'>&#9668;</button>
            <button>1</button>
            <span>...</span>`
        for (let i = -step; i <= step; i++) {
          const number_page = +current_page + +i
          div_HTML += `
            <button>${number_page}</button>`
        }
        div_HTML += `
            <span>...</span>
            <button>${count_pages}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`
        position.innerHTML = div_HTML
      }
      highlighting()
    })
    /**
     * highlights the selected page
     */
    const highlighting = (() => {
      const button_pagination = Array.from(position.children)
      for (let elem of button_pagination) {
        if (+elem.innerHTML == +current_page){
          elem.className = 'current-page'
        }
      }
    })
    /**
     * 
     * 
     * @param {Event} event the pressed button
     */
    const onClick = ((event: Event) => {
      scrollTo(0,0)
      const target = event.target as HTMLButtonElement
      if (target.value) {
        target.id == 'next_page' ? current_page++ : current_page--
        start(target.value)
      } else {
        current_page = +target.innerHTML
        start();
      }
    })
  
  
    start()
  
  })