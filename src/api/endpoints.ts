/** Endpoint paths. Param paths are built where they are used, from the base entries (Movies, Sessions, Holds, Orders). */
export const Endpoint = {
  Register: '/register',
  Login: '/login',
  Logout: '/logout',
  Me: '/me',
  Profile: '/profile',
  FilterOptions: '/filter-options',
  Search: '/search',
  Movies: '/movies',
  NowPlaying: '/movies/now-playing',
  ComingSoon: '/movies/coming-soon',
  Featured: '/movies/featured',
  Sessions: '/sessions',
  Holds: '/holds',
  Orders: '/orders',
  Tickets: '/tickets',
} as const
