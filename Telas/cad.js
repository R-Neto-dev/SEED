function realizarCadastro() {
    // .trim() remove espaços que você pode ter digitado sem querer
    const nome = document.getElementById('cad-nome').value.trim();
    const email = document.getElementById('cad-email').value.trim();
    const senha = document.getElementById('cad-senha').value.trim();
    const perfilId = document.getElementById('cad-perfil').value;

    const dados = {
        nome: nome,
        email: email,
        senha: senha,
        perfilId: parseInt(perfilId)
    };

    // Cole exatamente esta URL, sem mudar nada:
    const url = 'http://localhost:27641/api/usuarios';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) return response.text();
        return response.text().then(text => { throw new Error(text) });
    })
    .then(msg => {
        alert(msg);
        window.location.href = "login.html";
    })
    .catch(err => alert("Erro: " + err.message));
}