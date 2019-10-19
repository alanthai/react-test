// @COMMENT: This file hosts functions that transforms search form to the shape of API contracts
// Useful for when the backend changes to keep good separation from the UI layer

import { BuyerSearch } from '../types/buyer-search.type';
import { ListingRequest } from '../types/listing-request.type';

export function searchToRequest(query: BuyerSearch): ListingRequest {
  return query;
}

export function responseToValues() {}
