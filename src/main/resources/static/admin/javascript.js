const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

const months = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// ==========================
// CALENDÁRIO
// ==========================

if (calendarDays && monthYear && prevMonth && nextMonth) {

    function renderCalendar(date) {

        calendarDays.innerHTML = "";

        const year = date.getFullYear();
        const month = date.getMonth();

        monthYear.textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const today = new Date();

        for (let i = 0; i < firstDay; i++) {

            const empty = document.createElement("div");

            calendarDays.appendChild(empty);
        }

        for (let day = 1; day <= lastDate; day++) {

            const dayElement = document.createElement("div");

            dayElement.classList.add("calendar-day");

            dayElement.textContent = day;

            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayElement.classList.add("today");
            }

            calendarDays.appendChild(dayElement);
        }
    }

    prevMonth.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar(currentDate);
    });

    nextMonth.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
}

// ==========================
// NAVEGAÇÃO
// ==========================

const navItems = document.querySelectorAll(".nav-item");

const pages = document.querySelectorAll(".page-content");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const page = item.dataset.page;

        pages.forEach(p => {
            p.style.display = "none";
        });

        const selectedPage = document.getElementById(`${page}-page`);

        if (selectedPage) {
            selectedPage.style.display = "block";
        }

        //if (page === "alunos") {
        //    carregarAlunos();
        //}

        if (page === "escolas") {
            carregarEscolas();
        }

        if (page === "turmas") {
            carregarTurmas();
        }

        if (page === "provas") {
            renderProvas();
        }

        if (page === "dashboard") {
            renderCalendar(currentDate);
        }
    });
});

// ==========================
// ALUNOS (BACKEND REAL)
// ==========================

let students = [];

async function carregarAlunos() {

    try {

        const response = await fetch("http://localhost:27641/alunos");

        if (!response.ok) {
            throw new Error("Erro ao buscar alunos");
        }

        students = await response.json();

        renderStudents();

    } catch (error) {

        console.error("Erro:", error);

    }
}

function renderStudents() {

    const studentsList = document.getElementById("students-list");

    if (!studentsList) {
        return;
    }

    studentsList.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("div");

        row.classList.add("student-row");

        row.innerHTML = `

            <div class="student-info">

                <div class="student-avatar">
                    ${student.nome ? student.nome.charAt(0) : "A"}
                </div>

                <div>
                    <strong>${student.nome || "Sem nome"}</strong>

                    <div class="student-email">
                        ${student.email || "Sem email"}
                    </div>
                </div>

            </div>

            <div>
                ${student.matricula || "-"}
            </div>

            <div>
                <span class="class-badge">
                    ${student.turma || "-"}
                </span>
            </div>

            <div>
                ${student.escola || "-"}
            </div>

            <div>

                <span class="${student.status === "Inativo" ? "status-inactive" : "status-active"}">

                    ${student.status || "Ativo"}

                </span>

            </div>

            <div class="action-menu">

                <i class='bx bx-dots-vertical-rounded'></i>

            </div>

        `;

        studentsList.appendChild(row);
    });
}

// ==========================
// PROVAS
// ==========================

const provas = [

    {
        titulo: "SAESE 2026 - 1º Bimestre",
        status: "Em Andamento",
        escolas: "245 escolas",
        alunos: "85 600 alunos",
        data: "15 Abr 2026",
        participacao: 78,
        media: 72
    },

    {
        titulo: "Avaliação Diagnóstica - Matemática",
        status: "Concluída",
        escolas: "245 escolas",
        alunos: "42 800 alunos",
        data: "10 Abr 2026",
        participacao: 95,
        media: 68
    },

    {
        titulo: "Simulado ENEM 2026",
        status: "Agendada",
        escolas: "120 escolas",
        alunos: "28 500 alunos",
        data: "25 Abr 2026",
        participacao: 0,
        media: 0
    },

    {
        titulo: "SAESE 2025 - 4º Bimestre",
        status: "Concluída",
        escolas: "240 escolas",
        alunos: "82 000 alunos",
        data: "15 Nov 2025",
        participacao: 92,
        media: 74
    }

];

function renderProvas() {

    const provasList = document.getElementById("provas-list");

    if (!provasList) return;

    provasList.innerHTML = "";

    provas.forEach(prova => {

        let statusClass = "";

        if (prova.status === "Em Andamento") {
            statusClass = "status-andamento";
        }

        if (prova.status === "Concluída") {
            statusClass = "status-concluida";
        }

        if (prova.status === "Agendada") {
            statusClass = "status-agendada";
        }

        const card = document.createElement("div");

        card.classList.add("prova-card");

        card.innerHTML = `

            <div class="prova-top">

                <div>

                    <div class="prova-title">

                        <h2>${prova.titulo}</h2>

                        <span class="status-badge ${statusClass}">
                            ${prova.status}
                        </span>

                    </div>

                    <div class="prova-meta">

                        <span>
                            <i class='bx bx-buildings'></i>
                            ${prova.escolas}
                        </span>

                        <span>
                            <i class='bx bx-group'></i>
                            ${prova.alunos}
                        </span>

                        <span>
                            <i class='bx bx-calendar'></i>
                            ${prova.data}
                        </span>

                    </div>

                </div>

                <div class="prova-actions">

                    <button class="prova-btn">

                        <i class='bx bx-show'></i>

                        Detalhes

                    </button>

                    <button class="prova-btn">

                        <i class='bx bx-bar-chart-alt-2'></i>

                        Relatório

                    </button>

                </div>

            </div>

            ${
                prova.status !== "Agendada"
                ?
                `
                <div class="progress-row">

                    <div class="progress-item">

                        <p>
                            Participação ${prova.participacao}%
                        </p>

                        <div class="progress-bar">

                            <div class="progress-fill"
                                style="width:${prova.participacao}%">
                            </div>

                        </div>

                    </div>

                    <div class="progress-item">

                        <p>
                            Média Estadual ${prova.media}%
                        </p>

                        <div class="progress-bar">

                            <div class="progress-fill"
                                style="width:${prova.media}%">
                            </div>

                        </div>

                    </div>

                </div>
                `
                :
                ""
            }

        `;

        provasList.appendChild(card);

    });
}

    // ==========================
// ESCOLAS
// ==========================

// ==========================
// TURMAS
// ==========================

const turmaForm = document.getElementById("turma-form");

const turmasList = document.getElementById("turmas-list");

const adicionarAlunoForm =
    document.getElementById("adicionar-aluno-form");

const escolaForm = document.getElementById("escola-form");

const escolasList = document.getElementById("escolas-list");

// LISTAR ESCOLAS
async function carregarEscolas() {

    try {

        const response = await fetch("http://localhost:27641/escolas");

        const escolas = await response.json();

        escolasList.innerHTML = "";

        escolas.forEach(escola => {

            const row = document.createElement("div");

            row.classList.add("student-row");

            row.innerHTML = `
                <div>${escola.id}</div>
                <div>${escola.nome}</div>
                <div>${escola.endereco}</div>
                <div>${escola.telefone}</div>
            `;

            escolasList.appendChild(row);

        });

    } catch (error) {

        console.error("Erro ao carregar escolas:", error);

    }
}

// CADASTRAR ESCOLA
if (escolaForm) {

    escolaForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nome = document.getElementById("nomeEscola").value;

        const endereco = document.getElementById("enderecoEscola").value;

        const telefone = document.getElementById("telefoneEscola").value;

        const email = document.getElementById("emailEscola").value;

        const escola = {

            nome,
            endereco,
            telefone,
            email

        };

        try {

            const response = await fetch("http://localhost:27641/escolas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(escola)

            });

            if (!response.ok) {

                throw new Error("Erro ao cadastrar escola");

            }

            alert("Escola cadastrada com sucesso!");

            escolaForm.reset();

            carregarEscolas();

        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar escola");

        }

    });

}

// LISTAR TURMAS
async function carregarTurmas() {

    try {

        const response =
            await fetch("http://localhost:27641/turmas");

        const turmas = await response.json();

        if (!turmasList) return;

        turmasList.innerHTML = "";

        turmas.forEach(turma => {

            const row = document.createElement("div");

            row.classList.add("student-row");

            row.innerHTML = `
                <div>${turma.id}</div>
                <div>${turma.nome}</div>
                <div>${turma.serie}</div>
                <div>
                    ${
                        turma.alunos && turma.alunos.length > 0
                        ? turma.alunos.map(aluno => aluno.nome).join(", ")
                        : "Sem alunos"
                    }
                </div>
            `;

            turmasList.appendChild(row);

        });

    } catch (error) {

        console.error("Erro ao carregar turmas:", error);

    }
}

// CRIAR TURMA
if (turmaForm) {

    turmaForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nome =
            document.getElementById("nomeTurma").value;

        const serie =
            document.getElementById("serieTurma").value;

        const turma = {
            nome,
            serie
        };

        try {

            const response = await fetch(
                "http://localhost:27641/turmas",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(turma)
                }
            );

            if (!response.ok) {

                throw new Error("Erro ao criar turma");

            }

            alert("Turma criada com sucesso!");

            turmaForm.reset();

            carregarTurmas();

        } catch (error) {

            console.error(error);

            alert("Erro ao criar turma");

        }

    });

}

// ADICIONAR ALUNO NA TURMA
if (adicionarAlunoForm) {

    adicionarAlunoForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const usuarioId =
            document.getElementById("usuarioId").value;

        const turmaId =
            document.getElementById("turmaId").value;

        try {

            const response = await fetch(

                `http://localhost:27641/api/usuarios/${usuarioId}/turma/${turmaId}`,

                {
                    method: "PUT"
                }

            );

            if (!response.ok) {

                throw new Error("Erro ao adicionar aluno");

            }

            alert("Aluno adicionado na turma!");

            adicionarAlunoForm.reset();

            carregarTurmas();

        } catch (error) {

            console.error(error);

            alert("Erro ao adicionar aluno");

        }

    });

}

// INICIAR LISTA
carregarEscolas();
carregarTurmas();


// ==========================
// INICIAR
// ==========================

//carregarAlunos();