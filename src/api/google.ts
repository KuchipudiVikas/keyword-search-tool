import {getGoogleSuggestions} from '../utils/helperFunctions'
// import JSDOM from 'jsdom'

export const GoogleService = {
  async getSuggestions(userQuery: string){
    const data = await getGoogleSuggestions(userQuery)
    const result = data.map(suggestion => (suggestion|| ''));
    console.log('from get suggesions google ',result)
    return result
  },

  async multiSearch(keywordList: Array<string>) {
    const searchList = keywordList.slice(1)
    const allKeywords = await Promise.all(searchList.map(keyword => this.getSuggestions(keyword)));
    return Array.from(new Set(keywordList.concat(...allKeywords)))
  },


  async getKeywordResults(keyword: string): Promise<number> {
    const res = await fetch(`https://www.google.com/search?q=${keyword}`)
    let html = await res.text();
    console.log(html.length)
    let ind = html.indexOf(`id="result-stats"`)
    let stat_html = html.slice(ind,ind+40)
    let result = Number(stat_html.replace(/\D/g,''))
    console.log(typeof result)
    return result;
  }

}