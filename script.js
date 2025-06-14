let quotes = [];

document.addEventListener("DOMContentLoaded", () => {
  // Fetch all necessary elements from HTML
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const quoteTag = document.getElementById("quote-tag");
  const famousQuotesBtn = document.getElementById("famous-quotes-btn");
  const inspirationalBtn = document.getElementById("inspirational-btn");
  const newQuoteBtn = document.getElementById("new-quote");
  const shareQuoteBtn = document.getElementById("share-quote");
  let currentFilter = "all"; // Default filter
  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      quotes = data;
      displayRandomQuote();
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);
    });

    function getFilteredQuotes(){
      if(!currentFilter || currentFilter === "all") {
        return quotes; // Return all quotes if no filter is applied
      }
      return quotes.filter(quote =>quote.tags.includes(currentFilter))
    }

  function displayRandomQuote() {
    // Function to display a random quote
    // console.log("Displaying a random quote");
   // console.log(quotes); // i have three things in quotes --> author , quote,tags
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length === 0) {
      quoteText.textContent = "No quotes available for the selected filter.";
      quoteAuthor.textContent = "";
      quoteTag.textContent = "";
      return;
    }
     const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    let randomQuote = filteredQuotes[randomIndex];
    quoteText.textContent = randomQuote.quote;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
  }

  newQuoteBtn.addEventListener("click", displayRandomQuote);
  shareQuoteBtn.addEventListener("click", () => {
    // Function to share quote
    const textToShare = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(textToShare)
    .then(() => {
     
      const originalContent = shareQuoteBtn.innerHTML;
      shareQuoteBtn.innerHTML = "Copied!";
      setTimeout(() => {
        shareQuoteBtn.innerHTML = originalContent;
      }, 2000); // Reset button text after 2 seconds
    }).catch(() => {
      alert("Failed to copy quote to clipboard.");
    })

  });
  famousQuotesBtn.addEventListener("click", () => {
    // Filter or show famous quotes
    currentFilter = "famous";
    displayRandomQuote(); // Display a random quote after filtering
  });
  inspirationalBtn.addEventListener("click", () => {
    // Filter or show inspirational quotes
    currentFilter = "inspiration";
    displayRandomQuote(); // Display a random quote after filtering
  });
});