export function copyText(data: string) {
  if (!data) return;
  const el = document.createElement('textarea');
  el.value = data;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  if (document.body) document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  if (document.body) document.body.removeChild(el);
}
