// Select the HTML element with the ID 'grid-container'
const gridContainerEl = document.querySelector("#grid-container");

// Function to generate HTML based on provided data and linkTarget
const htmlExtraction = (dataOby, linkTarget) => {
  let htmlStr = "";
  // Iterate over each element in dataOby
  for (const timeFrames of dataOby) {
    // Construct HTML for each timeFrames entry
    htmlStr += `
      <article class="article">
          <div class="article container">
            <div class="activity-tab">
              <p class="activity">${timeFrames.title}</p>
              <img src="./images/icon-ellipsis.svg" alt="ellipsis more icon" />
            </div>
            <div class="time-tab">
              <p class="time">${timeFrames.timeframes[linkTarget].current}hrs</p>
              <p class="total-time">last week - ${timeFrames.timeframes[linkTarget].previous}hrs</p>
            </div>
          </div>
        </article>
      `;
  }

  return htmlStr;
};

// Fetch data from JSON file
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    // Define the base HTML structure
    let baseHTML = `<article class="article">
          <div class="report">
            <img src="./images/image-jeremy.png" alt="profile photo" />
            <p class="name">
              Report for <span class="span">jeremy robson</span>
            </p>
          </div>
          <div class="links">
            <a data-link="daily" class="link" href="#">daily</a>
            <a data-link="weekly" class="link" href="#">weekly</a>
            <a data-link="monthly" class="link" href="#">monthly</a>
          </div>
        </article>`;

    // Listen for click events on the window
    window.addEventListener("click", (e) => {
      // Initialize str with the base HTML
      let str = baseHTML; // Reset str to the base HTML

      // Check the data-link attribute of the clicked element
      if (e.target.dataset.link === "daily") {
        // Append HTML generated for the 'daily' link
        str += htmlExtraction(data, "daily");
      } else if (e.target.dataset.link === "weekly") {
        // Append HTML generated for the 'weekly' link
        str += htmlExtraction(data, "weekly");
      } else {
        // Append HTML generated for the 'monthly' link
        str += htmlExtraction(data, "monthly");
      }

      // Update the content of the gridContainerEl with the new HTML
      gridContainerEl.innerHTML = str;
    });
  });
