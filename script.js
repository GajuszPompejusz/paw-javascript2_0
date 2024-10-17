(function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const cw4 = document.getElementById("cw4");
  const answer = document.getElementById("answer");
  const popup = document.getElementById("popup");

  function displayLoading(show = true, msg = "Loading...") {
    popup.innerText = msg;
    popup.style.display = show ? "flex" : "none";
    popup.style.top = `calc(50% - ${popup.clientHeight / 2}px)`;
    popup.style.left = `calc(50% - ${popup.clientWidth / 2}px)`;
  }

  example.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", function () {
    displayLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((array) => {
        displayLoading(false);
        answer.innerHTML = "";
        for (let post of array) {
          answer.innerHTML += `<div class="post">
              <div class="title">${post.title}</div>
              <div class="message">${post.body}</div>
            </div>`;
          console.log(`Title: ${post.title}\nBody: ${post.body}`);
        }
      });
  });

  cw2.addEventListener("click", function () {
    displayLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 99) + 1}`,
    )
      .then((response) => response.json())
      .then((post) => {
        displayLoading(false);
        answer.innerHTML = "";
        answer.innerHTML += `<div class="post">
            <div class="title">${post.title}</div>
            <div class="message">${post.body}</div>
          </div>`;
        console.log(`Title: ${post.title}\nBody: ${post.body}`);
      });
  });

  cw3.addEventListener("click", function () {
    displayLoading(true, "Processing...");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((post) => {
        displayLoading(false);
        answer.innerHTML = `Dodano nowy post o ID = ${post.id}<br>`;
        answer.innerHTML += `<div class="post">
            <div class="title">${post.title}</div>
            <div class="message">${post.body}</div>
          </div>`;
        console.log(`Title: ${post.title}\nBody: ${post.body}`);
      });
  });
  cw4.addEventListener("click", function () {
    displayLoading(true);
    fetch("db.json") // https://my-json-server.typicode.com/GajuszPompejusz/paw-javascript2_0/db
      .then((response) => response.json())
      .then((array) => {
        displayLoading(false);
        answer.innerHTML = "";
        for (let post of array) {
          answer.innerHTML += `<div class="post">
              <div class="title">${post.title}</div>
              <div class="message">${post.body}</div>
            </div>`;

          for (let comment of post.comments) {
            answer.innerHTML += `
          <div class="post comment">
            <div class="title">${comment.title}</div>
            <div class="message">${comment.body}</div>
          </div>
          `;
          }

          console.log(`Title: ${post.title}\nBody: ${post.body}`);
        }
      });
  });
})();
