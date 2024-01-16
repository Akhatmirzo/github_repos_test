

async function githubRespoAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

githubRespoAPI("https://api.github.com/users/Akhatmirzo").then(res => {
    console.log(res);
}) 

githubRespoAPI("https://api.github.com/users/Akhatmirzo/repos").then(res => {
    console.log(res);
})