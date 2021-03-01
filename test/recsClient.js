import { fetchedRec } from './mocks';

export default class RecommendationsClient {
  constructor() {}
  fetchPreconfigured() {
    return fetchedRec;
  }
}
