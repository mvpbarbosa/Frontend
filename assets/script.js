const baseUrl = "http://localhost:3002/posts";

async function findAllPosts() {
  const response = await fetch(`${baseUrl}/all-posts`);

  const posts = await response.json();

  posts.forEach((post) => {
    document.querySelector(".PostList").insertAdjacentHTML(
      "beforeend",
      `<div class="PostListItem">
          <div class="PostListItem__Header">
            <div class="ProfileInfo">
              <img src="${post.photo}" alt="Profile picture" />
              <div class="NameDate">
                <h3>${post.name}</h3>
                <h4 id="dateHour">${post.dateHour}</h4>
              </div>
            </div>

            <img class="Options" src="./assets/images/more-options.png" alt="Options" />
          </div>

          <div class="PostListItem__Main">
            <span>
              ${post.text}
            </span>
          </div>

          <div class="PostListItem__Footer">
            <img src="./assets/images/like-icon.png" alt="Like button" />
          </div>
        </div>`
    );
  });
}

const findByIdPost = async () => {
  const id = document.querySelector("#postId").value;

  const response = await fetch(`${baseUrl}/one-post/${id}`);

  const post = await response.json();

  const chosenPostDiv = document.querySelector("#OpenModal");

  chosenPostDiv.innerHTML = `
  <div class="ModalItem">
  <div class="ModalItem__Header">
    <div class="ProfileInfo__Modal">
      <img src="${post.photo}" alt="Profile picture" />
      <div class="NameDate__Modal">
        <h3>${post.name}</h3>
        <h4 id="dateHour">${post.dateHour}</h4>
      </div>
    </div>
  </div>

  <div class="ModalItem__Main">
    <span>
      ${post.text}
    </span>
  </div>

  <div class="ModalItem__Footer">
    <img src="./assets/images/like-icon.png" alt="Like button" />
  </div>
  </div>`;
};

async function createPost() {
  // Função para formatar 1 em 01
  const zeroFill = (n) => {
    return ("0" + n).slice(-2);
  };
  // Pega o horário atual
  const now = new Date();

  const monName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "agosto",
    "outubro",
    "novembro",
    "dezembro"
  );

  // Formata a data conforme dd/mm/aaaa hh:ii:ss
  const dateHour =
    now.getDate() +
    " de " +
    monName[now.getMonth()] +
    " de " +
    now.getFullYear() +
    " às " +
    zeroFill(now.getHours()) +
    ":" +
    zeroFill(now.getMinutes());

  const photo = document.querySelector("#photo").value;
  const name = document.querySelector("#name").value;
  const text = document.querySelector("#text").value;

  const post = {
    photo,
    name,
    dateHour,
    text,
  };

  const response = await fetch(`${baseUrl}/create-post`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(post),
  });

  const newPost = await response.json();

  const html = `<div class="PostListItem">
          <div class="PostListItem__Header">
            <div class="ProfileInfo">
              <img src="${newPost.photo}" alt="Profile picture" />
              <div class="NameDate">
                <h3>${newPost.name}</h3>
                <h4 id="dateHour">${newPost.dateHour}</h4>
              </div>
            </div>

            <img class="Options" src="./assets/images/more-options.png" alt="Options" />
          </div>

          <div class="PostListItem__Main">
            <span>
              ${newPost.text}
            </span>
          </div>

          <div class="PostListItem__Footer">
            <img src="./assets/images/like-icon.png" alt="Like button" />
          </div>
        </div>`;

  document.querySelector(".PostList").insertAdjacentHTML("afterbegin", html);

  closeModal();
}

function openModal() {
  document.querySelector(".ModalOverlay").style.display = "flex";
}

function closeModal() {
  document.querySelector(".ModalOverlay").style.display = "none";
}

function openCreateModal() {
  document.querySelector(".CreateModalOverlay").style.display = "flex";
}

function closeCreateModal() {
  document.querySelector(".CreateModalOverlay").style.display = "none";
}

findAllPosts();
