document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})

document.getElementById('search_button').addEventListener('click', async () => {
    document.getElementById('search_response').innerHTML = document.getElementById('search_bar').value;
})

// function to handle searching for a meal
async function handleSearch() {
    //
}

