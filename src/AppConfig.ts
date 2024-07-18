// Note: update the SPA name
const SPA_NAME = 'my-app';

function getHighbondUrlParts(currentUrl: string) {
  const highbondUrlPattern = new RegExp(
    `(?<protocol>http|https)?:\\/\\/(?<subdomain>[\\w-]+)\\.${SPA_NAME}(-?)(?<region>.*)\\.(?<domain>highbond-gov|highbond-gov2|highbond|highbond-gov3|highbond-mil)?(?<domainSuffix>-\\w+)?\\.(?<tld>local|com|mil)$`,
  );
  const highbondMatch = currentUrl.match(highbondUrlPattern);
  if (highbondMatch === null) return {};

  const protocol = highbondMatch?.groups?.protocol || '';
  const subdomain = highbondMatch?.groups?.subdomain || '';
  const region = highbondMatch?.groups?.region || '';
  const domain = highbondMatch?.groups?.domain || '';
  const domainSuffix = highbondMatch?.groups?.domainSuffix || '';
  const tld = highbondMatch?.groups?.tld;

  return { protocol, subdomain, domain, domainSuffix, region, tld };
}

const isLocal = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const protocol = isLocal ? 'http' : 'https';
const isGovCloud =
  window.location.origin.includes('highbond-gov') ||
  window.location.origin.includes('highbond.mil') ||
  window.location.origin.includes('highbond-mil');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { domain, region, domainSuffix, tld, subdomain: _subdomain } = getHighbondUrlParts(window.location.origin);
const appRegion = region === '' ? 'us' : region;
const host = isLocal ? 'localhost' : `${domain}${domainSuffix}.${tld}`;
const isScoped = host === 'highbond-s3.com' && region; // on s3 the region is the scope
const isStaging = domainSuffix === '-s1';
const regionSuffix = region && !isScoped ? `-${region}` : '';

const AppConfig = {
  // Note: update api endpoint
  apiEndpoint: `${protocol}://${SPA_NAME}${regionSuffix}.${host}`,
  loginUrl: `${protocol}://accounts.${host}/login`,
  tokenRefreshUrl: `${protocol}://accounts.${host}/api/token/refresh`,
  pendoMonitorScript: `${protocol}://monitor${regionSuffix}.${host}/v1/monitor.js`,
  isLocal,
  isStaging,
  appRegion,
  isGovCloud,
  microFrontends: {
    'hb-global-navigator': {
      url: `${protocol}://web-components${regionSuffix}.${host}/global-navigator/index.js`,
    },
  },
};

export default AppConfig;
