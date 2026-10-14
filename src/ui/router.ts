// Hash routing: #/ (resident), #/log (entry log), #/verify?p=<token>.

export type Route =
  | { readonly name: 'resident' }
  | { readonly name: 'log' }
  | { readonly name: 'verify'; readonly token: string | null }
  | { readonly name: 'not-found' };

export function parseRoute(hash: string): Route {
  const [path = '', query = ''] = hash.replace(/^#/, '').split('?');
  switch (path) {
    case '':
    case '/':
      return { name: 'resident' };
    case '/log':
      return { name: 'log' };
    case '/verify':
      return { name: 'verify', token: new URLSearchParams(query).get('p') };
    default:
      return { name: 'not-found' };
  }
}
