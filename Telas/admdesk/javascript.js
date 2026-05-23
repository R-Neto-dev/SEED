const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

const months = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// evita quebra total do JS
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
// itens nav
const navItems = document.querySelectorAll(".nav-item");

const pages = document.querySelectorAll(".page-content");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        // remove active
        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const page = item.dataset.page;

        // esconde todas
        pages.forEach(p => {
            p.style.display = "none";
        });

        // mostra página clicada
        const selectedPage = document.getElementById(`${page}-page`);

        if(selectedPage) {
            selectedPage.style.display = "block";
        }
                if (page === "alunos") {
            renderStudents();
        }
                if (page === "provas") {
            renderProvas();
        }

        if (page === "dashboard") {
            renderCalendar(currentDate);
        }

    });

});
/*ALUNOS*/
const students = [
    {
        initials: "JS",
        name: "João Silva",
        email: "joao.silva@aluno.se.gov.br",
        matricula: "2026001",
        turma: "9º Ano A",
        escola: "E.E. João Alves",
        status: "Ativo"
    },

    {
        initials: "MO",
        name: "Maria Oliveira",
        email: "maria.oliveira@aluno.se.gov.br",
        matricula: "2026002",
        turma: "9º Ano A",
        escola: "E.E. João Alves",
        status: "Ativo"
    },

    {
        initials: "PS",
        name: "Pedro Santos",
        email: "pedro.santos@aluno.se.gov.br",
        matricula: "2026003",
        turma: "8º Ano B",
        escola: "E.E. Maria do Carmo",
        status: "Ativo"
    },

    {
        initials: "AC",
        name: "Ana Costa",
        email: "ana.costa@aluno.se.gov.br",
        matricula: "2026004",
        turma: "7º Ano A",
        escola: "E.E. Dom José Thomaz",
        status: "Inativo"
    },

    {
        initials: "LF",
        name: "Lucas Ferreira",
        email: "lucas.ferreira@aluno.se.gov.br",
        matricula: "2026005",
        turma: "6º Ano C",
        escola: "E.E. Tobias Barreto",
        status: "Ativo"
    },

    {
        initials: "JL",
        name: "Juliana Lima",
        email: "juliana.lima@aluno.se.gov.br",
        matricula: "2026006",
        turma: "9º Ano B",
        escola: "E.E. João Alves",
        status: "Ativo"
    },

    {
        initials: "MS",
        name: "Marcos Souza",
        email: "marcos.souza@aluno.se.gov.br",
        matricula: "2026007",
        turma: "8º Ano A",
        escola: "E.E. Maria do Carmo",
        status: "Ativo"
    },

    {
        initials: "CM",
        name: "Carla Mendes",
        email: "carla.mendes@aluno.se.gov.br",
        matricula: "2026008",
        turma: "7º Ano B",
        escola: "E.E. Dom José Thomaz",
        status: "Ativo"
    }
];

const studentsList = document.getElementById("students-list");

function renderStudents() {

    const studentsList = document.getElementById("students-list");

    if (!studentsList) {
        console.log("students-list ainda não existe");
        return;
    }

    studentsList.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("div");
        row.classList.add("student-row");

        row.innerHTML = `
            <div class="student-info">
                <div class="student-avatar">${student.initials}</div>
                <div>
                    <strong>${student.name}</strong>
                    <div class="student-email">${student.email}</div>
                </div>
            </div>

            <div>${student.matricula}</div>

            <div><span class="class-badge">${student.turma}</span></div>

            <div>${student.escola}</div>

            <div>
                <span class="${student.status === "Ativo" ? "status-active" : "status-inactive"}">
                    ${student.status}
                </span>
            </div>

            <div class="action-menu">
                <i class='bx bx-dots-vertical-rounded'></i>
            </div>
        `;

        studentsList.appendChild(row);
    });
}
/*PROVAS*/

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