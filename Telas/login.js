function fazerLogin() {
    const emailValue = document.getElementById('email').value.trim();
    const senhaValue = document.getElementById('senha').value.trim();

    if (!emailValue || !senhaValue) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const dados = {
        email: emailValue,
        senha: senhaValue
    };

    fetch('http://localhost:27641/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.ok) return response.json();
            if (response.status === 401) throw new Error("E-mail ou senha incorretos.");
            throw new Error("Erro ao conectar com o servidor.");
        })
        .then(data => {

            alert(`Bem-vindo, ${data.nome}! Cargo: ${data.cargo}`);

        switch (data.cargo) {
            case 'ADMIN':
                window.location.href = "admdesk/admin.html";
                break;
            case 'ALUNO':
                // Como agora está na mesma pasta, não precisa de "Aluno/alunodesk/"
                window.location.href = "Aluno/aluno.html";
                break;
            case 'COORDENADOR':
                window.location.href = "Coordenacao/coord.html";
                break;
            case 'PROFESSOR':
                // O arquivo do professor se chama index.html
                window.location.href = "professor/index.html";
                break;
            default:
                alert("Cargo não reconhecido: " + data.cargo);
        }
        })
        .catch(error => {
            alert(error.message);
        });
}