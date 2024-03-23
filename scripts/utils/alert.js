export const notification = (text, timeout, sucess = false) => {
  const divEl = document.createElement('div');
  divEl.textContent = text;
  document.body.appendChild(divEl);
  // style
  divEl.style.padding = '8px 16px';
  divEl.style.background = (!sucess ? 'rgb(116, 5, 5)' : 'rgb(2, 100, 4)');
  divEl.style.color = 'white';
  divEl.style.position = 'fixed';
  divEl.style.left = '50%';
  divEl.style.bottom = '30px';
  divEl.style.transform = 'translateX(-50%)';
  divEl.style.borderRadius = '50px'
  divEl.style.fontSize = '15px';
  divEl.style.opacity = '1';
  divEl.style.display = 'block';
  divEl.style.transition = 'opacity .4s';

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    divEl.remove();
  }, 2600)
}