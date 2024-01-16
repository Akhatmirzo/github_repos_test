const githubUserInfo = document.getElementById('githubUserInfo');
const reposWrapper = document.getElementById('reposWrapper');
const serchForm = document.getElementById('serchForm');

async function githubRespoAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function renderEl(where, data) {

    switch (where) {
        case "userInfo":
            const { avatar_url, login, bio, html_url } = data;

            githubUserInfo.innerHTML = "Loading...";

            const template = `
                <div class="bg-light shadow-lg rounded-3 p-3 d-flex align-items-center  gap-3 ">
                    <img class="object-fit-cover rounded-circle " width="150" height="150" src="${avatar_url}" alt="github user photo">

                    <div>
                        <h1>Name: ${login}</h1>
                        <p>
                            <b>Bio:</b> ${bio || "Bio Mavjud emas!"}
                        </p>

                        <a href="${html_url}" target="_blank" class="btn btn-primary ">More</a>
                    </div>
                </div>
            `

            githubUserInfo.innerHTML = template;

            break;
        case "repos":
            reposWrapper.innerHTML = "Loading...";

            data.forEach(repos => {
                const template = `
                    <div class="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between ">
                        <h3>Project Name: <span class="h5">${repos.name}</span></h3>
                        <a href="${repos.html_url}" target = "_blank" class="btn btn-info">Information</a>
                    </div>
                `

                reposWrapper.innerHTML += template;
            });

            break;
    }
}

serchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = e.target[0];

    githubRespoAPI(`https://api.github.com/users/${name.value}`).then(userInfo => {

        renderEl("userInfo", userInfo);
        console.log(userInfo);
    }).catch(err => {
        console.log(err);
    })

    githubRespoAPI(`https://api.github.com/users/${name.value}/repos`).then(repos => {
        console.log(repos);

        renderEl("repos", repos);
    }).catch(err => {
        console.log(err);
    })
})



