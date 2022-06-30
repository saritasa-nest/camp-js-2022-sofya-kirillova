import { pagination } from "../scripts/pagination";

// import { __values } from "tslib"
const COUNT_ANIME_PAGE = 30


const pagination_div = document.querySelector('.pagination');
if (pagination_div === null) {
    throw new Error('not element')
}
pagination(pagination_div, 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?', COUNT_ANIME_PAGE)

