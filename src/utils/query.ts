import queryString from 'query-string';

export interface QueryObject {
    section?: string;
    article?: string;
}

export function getQueryObject(): QueryObject {
    const query = window.location.search;
    return queryString.parse(query);
}
