document.addEventListener('DOMContentLoaded', async () => {
  const firstQuote = await getRandomQuote();
  refreshQuote(firstQuote);

  const refreshQuoteBtn = document.querySelector('#refresh-quote-btn');
  refreshQuoteBtn.addEventListener('click', async () => {
    await handleRefreshQuote(refreshQuoteBtn);
  });
});

async function handleRefreshQuote(button) {
  disableButton(button);

  const newQuote = await getRandomQuote();
  refreshQuote(newQuote);

  const stages = [20, 40, 60, 80, 99, 100];
  for (const stage of stages) {
    await updateButtonBackground(button, stage);
  }

  enableButton(button);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add('text-white');
}

function enableButton(button) {
  button.disabled = false;
  button.classList.remove('text-white');
}

async function updateButtonBackground(button, percentage) {
  await delay(400);
  button.className = button.className.replace(/background-loading-\d+-percent/g, '');
  button.classList.add('background-loading', `background-loading-${percentage}-percent`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data || getDefaultQuote();
  } catch (error) {
    console.error(error);
    return getDefaultQuote();
  }
}

function getDefaultQuote() {
  return {
    _id: "mH6airzttYXS",
    content: "Each man has his own vocation; his talent is his call. There is one direction in which all space is open to him.",
    author: "Ralph Waldo Emerson",
    tags: ["Famous Quotes"],
    authorSlug: "ralph-waldo-emerson",
    length: 112,
    dateAdded: "2020-04-14",
    dateModified: "2023-04-14"
  };
}

function refreshQuote(quote) {
  document.querySelector('#quote-paragraph').textContent = `"${quote.content}"`;
  document.querySelector('#quote-author-label').textContent = `By ${quote.author}`;
}
