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

  const stages = [1, 2, 3, 4];
  for (const stage of stages) {
    await updateButtonBackground(button, stage);
  }

  enableButton(button);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.remove('bg-white');
}

function enableButton(button) {
  button.disabled = false;
}

async function updateButtonBackground(button, stage) {
  await delay(1000);
  switch (stage) {
    case 1:
      button.classList.add('bg-gray-200');
      break;
    case 2:
      button.classList.remove('bg-gray-200');
      button.classList.add('bg-gray-500');
      break;
    case 3:
      button.classList.add('bg-gray-200');
      button.classList.remove('bg-gray-500');
      break;
    default:
      button.classList.remove('bg-gray-200');
      button.classList.add('bg-white');
      break;

  }

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
