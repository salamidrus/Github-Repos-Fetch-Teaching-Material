// run : json-server --watch db.json

// to load page quickly after user first arrives
document.addEventListener("DOMContentLoaded", () => {
  function fetchData() {
    fetch("http://localhost:3000/repo")
      .then((response) => response.json())
      .then((data) => renderRepos(data));
  }

  function renderRepos(data) {
    for (const r of data) {
      // Find the container where we attach everything to
      const repoUL = document.querySelector("#repo-list");

      // Create all necessary elements
      const repoLi = document.createElement("li");
      const blockRepo = document.createElement("blockrepo");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const footer = document.createElement("footer");
      const br = document.createElement("br");
      const hr = document.createElement("hr");
      // Create the dislikes button
      const dislikesBtn = document.createElement("button");

      // Add appropriate classes and ids. Grab data and insert if needed.
      // these are for styling purpose
      repoUL.className = "repo-card";
      blockRepo.className = "blockquote";
      p1.className = "mb-0";
      p2.className = "mb-0";
      footer.className = "blockquote-footer";
      repoLi.dataset.id = r.id;

      // Grab data and insert it into created elements
      p1.innerHTML = r.name;
      p2.innerHTML = r.description;
      footer.innerHTML = r.url;

      // Append everything to maintain container
      blockRepo.append(p1, p2, footer, dislikesBtn, br, hr);
      repoLi.append(blockRepo);
      repoUL.append(repoLi);

      // Attach all the necessary attributes to delete button
      dislikesBtn.innerHTML = "Delete";
      dislikesBtn.className = "btn-danger"; // for styling
      dislikesBtn.name = r.id;
      dislikesBtn.addEventListener("click", () => deleteRepo());

      // Build a callback function
      function deleteRepo() {
        const url = `http://localhost:3000/repo/${r.id}`;
        const reqObj = {
          method: "DELETE",
        };
        fetch(url, reqObj).then(repoLi.remove());
      }
    }
  }

  // form to post
  const form = document.querySelector("#new-repo-form");
  form.addEventListener("submit", (e) => postRepo(e));

  function postRepo(e) {
    e.preventDefault();

    const newName = document.querySelector("#name-repo").value;
    const urlRepo = document.querySelector("#url-repo").value;
    const description = document.querySelector("#desc-repo").value;

    const url = "http://localhost:3000/repo";
    const reqObj = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        url: urlRepo,
        description: description,
      }),
    };

    fetch(url, reqObj)
      .then((response) => response.json())
      .then((repo) => {
        renderRepos(repo);
      });
  }

  // Call the function that will automatically run renderQuote()
  fetchData();
});
