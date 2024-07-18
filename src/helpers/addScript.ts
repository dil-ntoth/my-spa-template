export default function addScript(url: string) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return;
  }

  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.crossOrigin = 'use-credentials';
  scriptTag.src = url;
  document.head.appendChild(scriptTag);
}
