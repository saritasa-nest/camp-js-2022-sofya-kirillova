import { anime_table_output } from "../pages/anime_table"
import { api } from "./api"
/**
 * 
 * @param position 
 * @param https 
 * @param size 
 * @param step 
 * @param current_page 
 */
export const pagination = ((position: HTMLDivElement, https: string, size: number = 25, step: number = 3, current_page: number = 1) => {
    // const div_element = document.querySelector(".pagination")!
    position.addEventListener('click', event => onClick(event))
    const select_element = document.querySelector("#sort-anime-table")!
    let ordering = 'title_eng'
    select_element.addEventListener('change', event => sort(event))
  
    console.log(select_element)
    const start = ((api_address: string | undefined = `${https}limit=${size}&offset=${(current_page - 1) * size}&ordering=${ordering}`) => {
      const anime_promise = api(api_address, 'GET')
      anime_table_output(anime_promise)
      anime_promise.then(anime_data => {
        const count_page = Math.ceil(anime_data.count / size);
        rendering(anime_data.previous, anime_data.next, count_page)
  
      })
    })
    const sort = ((event: any)=>{
      ordering = event.target.value
      start()
    })
    const rendering = ((previous: string, next: string, count_page: number) => {
      let div_HTML = ``
      if (current_page < step + 3) {
        for (let i = 1; i < step * 2 + 3; i++) {
          div_HTML += `
            <button>${i}</button>`
        }
        div_HTML += `
            <span>...</span>
            <button>${count_page}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`
        position.innerHTML = div_HTML
      }
      else if (count_page - current_page < step + 3) {
        const count_view_number_page = step * 2
  
        div_HTML += `
            <button id='previous_page' value='${previous}'>&#9668;</button>
            <button>1</button>
            <span>...</span>`
        for (let i = 0; i <= count_view_number_page; i++) {
          const number_page = count_page + i - count_view_number_page
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
            <button>${count_page}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`
        position.innerHTML = div_HTML
      }
      finish()
    })
    const finish = (() => {
      const button_pagination = position.children
      for (let elem of <any>button_pagination) {
        if (+elem.innerHTML == +current_page){
          elem.className = 'current-page'
        }
      }
    })
    const onClick = ((event: any) => {
      scrollTo(0,0)
      let target = event.target;
      if (target.value) {
        target.id == 'next_page' ? current_page++ : current_page--
        start(target.value)
      } else {
        current_page = target.innerHTML
        start();
      }
    })
  
  
    start()
  
  })