document.addEventListener('DOMContentLoaded', async () => {
  const firstQuote = await getRandomQuote();
  refreshQuote(firstQuote);

  const refreshQuoteBtn = document.querySelector('#refresh-quote-btn');
  refreshQuoteBtn.addEventListener('click', async () => {
    refreshQuoteBtn.disabled = true;

    const newQuote = await getRandomQuote();
    refreshQuote(newQuote);

    refreshQuoteBtn.disabled = false;
  });
});

async function getRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (null === data) {
      return {
        _id: "mH6airzttYXS",
        content: "Each man has his own vocation; his talent is his call. There is one direction in which all space is open to him.",
        author: "Ralph Waldo Emerson",
        tags: [
          "Famous Quotes"
        ],
        authorSlug: "ralph-waldo-emerson",
        length: 112,
        dateAdded: "2020-04-14",
        dateModified: "2023-04-14"
      }
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

function refreshQuote(quote) {
  const quoteParagraph = document.querySelector('#quote-paragraph');
  quoteParagraph.textContent = '"' + quote.content + '"';
  const quoteAuthorLabel = document.querySelector('#quote-author-label');
  quoteAuthorLabel.textContent = 'By ' + quote.author;
}
