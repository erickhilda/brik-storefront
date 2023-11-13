import fetchMethods from "./fetchMethods";

function makeFetcher() {
  return fetchMethods();
}

const fetcher = makeFetcher();
export default fetcher;