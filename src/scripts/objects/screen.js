const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto de perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                <div class="followers-following-area">
                                    <div class="followers">
                                        <p><i class="fa-solid fa-user-group"></i> Seguidores</p>
                                        <p>${user.followers}</p>
                                    </div>
                                    <div class="following">
                                        <p><i class="fa-solid fa-users"></i> Seguindo</p>
                                        <p>${user.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>  
                                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                        <div class="repo-stats">
                                            <p><i class="fa-solid fa-code-fork" title="forks"></i>${repo.forks}</p>
                                            <p><i class="fa-solid fa-star" title="stargazers"></i>${repo.stargazers_count}</p>
                                            <p><i class="fa-solid fa-eye" title="watchers"></i>${repo.watchers_count}</p>
                                            <p><i class="fa-solid fa-laptop-code" title="language"></i>${repo.language}</p>
                                        </div>
                                    </li>`
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            <div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventsItens += `<li><p>${event.repo.name}<span class="commit-message">-${event.payload.commits[0].message}</span></p></li>`
            } else if (event.type === "CreateEvent") {
                eventsItens += `<li><p>${event.repo.name}<span class="commit-message">-${event.payload.ref_type}</span></p></li>`
            } else {

            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            <div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }