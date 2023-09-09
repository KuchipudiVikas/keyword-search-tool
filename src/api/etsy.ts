import axios from 'axios';
import { load } from 'cheerio';

export const EtsyService = {
    async getSuggestions(userQuery: string) {
        const { data } = await axios.get(`https://www.etsy.com/suggestions_ajax.php?search_query=${userQuery}&search_type=all`)
        const result = data.results.map(suggestion => (suggestion.query || ''));
        console.log('from get suggesions',result)
        return result.slice(0, result.length - 1);
    },


    async multiSearch(keywordList: Array<string>) {
        const searchList = keywordList.slice(1)
        const allKeywords = await Promise.all(searchList.map(keyword => this.getSuggestions(keyword)));
        return Array.from(new Set(keywordList.concat(...allKeywords)))
    },


    async getKeywordResults(keyword: string): Promise<number> {
        const url = `https://www.etsy.com/in-en/search?q=${keyword}&ref=search_bar`;
    
        const response = await axios.get(url);
    
        if (response.status === 200) {
            const html = response.data;
            const $ = load(html);
    
            const jsonScript = $('script[type="application/ld+json"]').html();
            return JSON.parse(jsonScript).numberOfItems;
        }
        return 0;
    }
}