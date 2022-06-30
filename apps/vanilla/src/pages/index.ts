// import { __values } from "tslib"
import { pagination } from "../global/pagination"
const count_anime_page = 30


const pagination_div: HTMLDivElement = document.querySelector('.pagination')!;
pagination(pagination_div, 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?', 30)
