fetch('https://moons-tools-production-api.up.railway.app/api/latest-quote')
  .then(response => response.json())
  .then(data => {
    document.getElementById('quotetext').innerHTML = `<strong>&ldquo;${data.content}&ldquo;</strong>`;
    document.getElementById('quoteauthor').innerHTML = `<i>~ ${data.author}</i>`;
    console.log('"${data.content}" - ${data.author}')
  })
  .catch(error => {
    console.error('quote said not today:', error);
  });