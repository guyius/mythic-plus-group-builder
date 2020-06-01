export const DO_SEARCH = 'DO_SEARCH'
export const SEARCH_SUCCEED = 'SEARCH_SUCCEED'
export const SEARCH_FAILED = 'SEARCH_FAILED'

export const doSearch = (query) => {
  return {
    type: DO_SEARCH,
    query
  }
}
export const searchSucceed = (results) => {
  return {
    type: SEARCH_SUCCEED,
    results
  }
}

export const searchFailed = (error) => {
  return {
    type: SEARCH_FAILED,
    error
  }
}