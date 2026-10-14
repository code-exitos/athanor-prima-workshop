// Routing: #/ (new pass), #/log (entry log). A verify link carries the token in the query
// string (?p=<token>). The old #/verify?p=<token> form is still understood.

export type Route =
  | { readonly name: 'pass' }
  | { readonly name: 'log' }
  | { readonly name: 'verify'; readonly token: string | null }
  | { readonly name: 'not-found' };

export function parseRoute(hash: string, search = ''): Route {
  const queryToken = new URLSearchParams(search).get('p');
  const [path = '', query = ''] = hash.replace(/^#/, '').split('?');
  switch (path) {
    case '':
    case '/':
      return queryToken === null ? { name: 'pass' } : { name: 'verify', token: queryToken };
    case '/log':
      return { name: 'log' };
    case '/verify':
      return { name: 'verify', token: new URLSearchParams(query).get('p') ?? queryToken };
    default:
      return { name: 'not-found' };
  }
}
