let searchBtn = document.querySelector("#search-btn");
let currentUser;

document.querySelector("#card-container").style.display = "none";

const URL = "https://api.github.com";
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let data = await getFetch(URL);
    if(data === undefined) return;
    if(data.status === "404") alert(data.message);

    console.log(data);
    createCard(data);

})

async function getFetch(){
    let nameField = document.querySelector("#user-name");
    currentUser = nameField.value;
    nameField.value = "";

    if(currentUser === "") return;

    let request = await fetch(`${URL}/users/${currentUser}`);
    let data = await request.json();

    return data;
}

function createCard(data){
    let container = document.querySelector("#card-container");
    container.style.display = "block"

    let userName = (data.name === null) ? "Немає даних" : data.name;
    let userEmail = (data.email === null) ? "Немає даних" : data.email;
    let userBio = (data.name === null) ? "Немає даних" : data.bio;
    let createdDate = data.created_at.split("T")[0];

    container.innerHTML = `
        <div class="row justify-content-center">
            <div class="col">
                <div class="row justify-content-center">
                    <div class="col d-flex justify-content-center align-items-center">
                        <img src="${data.avatar_url}" class="rounded-circle img-thumbnail" width="100px" height="100px">
                    </div>

                    <div class="col">
                        <h1 class="userLogin">${data.login}</h1>
                        <p><span class="info">Name:</span> ${userName}</p>
                        <p><span class="info">Email:</span> ${userEmail}</p>
                        <p><span class="info">Bio:</span> ${userBio}</p>
                    </div>

                    <div class="col d-flex justify-content-end">
                        <p class="fw-bold fs-6">${createdDate}</p>
                    </div>
                </div>
            </div>

            <div class="row justify-content-end">
                <div class="col d-flex justify-content-center">
                    <button class="btn btn-primary w-100 mt-4" id="user-repo">Get repo</button>
                </div>
            </div>
        </div>
    `;

    let getUserRepo = document.querySelector("#user-repo");
    getUserRepo.addEventListener("click", (e) => getRepo(e));
}

async function getRepo(e){
    let request = await fetch(`${URL}/users/${currentUser}/repos?per_page=100&sort=updated`);
    let data = await request.json();

    console.log(data);
}