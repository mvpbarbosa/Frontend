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
              <img src="${post.photo}" alt="Imagem de perfil" />
              <div class="NameDate">
                <h3>${post.name}</h3>
                <h4>${post.dateHour}</h4>
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
            <img src="https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png" alt="Like" />
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

  console.log("Funcionando")

  chosenPostDiv.innerHTML = `
  <div class="PostListItem">
  <div class="PostListItem__Header">
    <div class="ProfileInfo">
      <img src="${post.photo}" alt="Imagem de perfil" />
      <div class="NameDate">
        <h3>${post.name}</h3>
        <h4>${post.dateHour}</h4>
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
    <img src="https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png" alt="Like" />
  </div>
  </div>`;

};

function openModal() {
  document.querySelector(".ModalOverlay").style.display = "flex"
}

function closeModal() {
  document.querySelector(".ModalOverlay").style.display = "none"
}

// function abrirModalDelete(id) {
//   document.querySelector("#overlay-delete").style.display = "flex";
// }

findAllPosts();
