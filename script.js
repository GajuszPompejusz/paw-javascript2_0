(function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");

  example.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", function () {
    answer.innerHTML = "Loading...";
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((array) => {
        answer.innerHTML = "";
        for (let post of array) {
          answer.innerHTML += `<div style="font-weight: 900;">${post.title}</div><div>${post.body}</div><br><hr><br>`;
        }
      });
  });

  cw2.addEventListener("click", function () {
    answer.innerHTML = "Loading...";
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 99) + 1}`,
    )
      .then((response) => response.json())
      .then((post) => {
        answer.innerHTML = "";
        answer.innerHTML += `<div style="font-weight: 900;">${post.title}</div><div>${post.body}</div><br><hr><br>`;
      });
  });

  cw3.addEventListener("click", function () {
    answer.innerHTML = "Processing...";
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
      .then((json) => {
        answer.innerHTML = `Dodano nowy post o ID = ${json.id}<br>`;
        answer.innerHTML += `<div style="font-weight: 900;">${json.title}</div><div>${json.body}</div><br><hr><br>`;
      });
  });
})();
