import HttpService from './http.service';
import { BuyerSearch } from '../types/buyer-search.type';
import * as fn from './listings.functions';
import { wait } from '../functions/wait';

// @COMMENT: In more complex searches and apps,
// there could be a redux layer that works to orchestrate mulitple queries
// and string them into a single payload
export default class ListingsService {
  constructor(private http: HttpService) {}

  async getListings(query: BuyerSearch) {
    // return this.http.get('', fn.searchToRequest(query)).then(fn.responseToValues);

    await wait(1000);

    return [];
  }
}
