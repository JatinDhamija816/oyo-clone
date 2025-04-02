import { CONFIG } from './config.js';

const setAuthCookies = (res, accessToken, refreshToken, role) => {
  if (!role || !['admin', 'hotelOwner', 'user'].includes(role)) {
    throw new Error(`Invalid role provided: ${role}`);
  }

  const { SECURE, SAME_SITE, DOMAIN } = CONFIG.COOKIE;

  const cookieOptions = {
    httpOnly: true,
    secure: SECURE,
    sameSite: SAME_SITE,
    // domain: DOMAIN,
    path: '/',
  };

  res.cookie(`${role}AccessToken`, accessToken, {
    ...cookieOptions,
    maxAge: CONFIG.JWT.ACCESS_EXPIRATION === '15m' ? 15 * 60 * 1000 : undefined,
  });

  res.cookie(`${role}RefreshToken`, refreshToken, {
    ...cookieOptions,
    maxAge:
      CONFIG.JWT.REFRESH_EXPIRATION === '10d'
        ? 10 * 24 * 60 * 60 * 1000
        : undefined,
  });
};

export default setAuthCookies;
