const calendarDays = document.getElementById("calendarDays");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const calendarTitle = document.getElementById("calendarTitle");

let currentDate = new Date();

function renderCalendar(date) {
    calendarDays.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    const months = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];

    // Atualiza título
    calendarTitle.innerHTML = `<i class='bx bx-calendar'></i> ${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    // espaços vazios antes do início do mês
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("calendar-day", "empty");
        calendarDays.appendChild(empty);
    }

    // dias do mês
    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");
        dayElement.textContent = day;

        // marcar dia atual
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

// botões
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// iniciar
renderCalendar(currentDate);
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

    });

});
/* =========================
   ALUNOS
========================= */

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

    studentsList.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("div");

        row.classList.add("student-row");

        row.innerHTML = `

            <div class="student-info">

                <div class="student-avatar">
                    ${student.initials}
                </div>

                <div>
                    <strong>${student.name}</strong>
                    <div class="student-email">
                        ${student.email}
                    </div>
                </div>

            </div>

            <div>${student.matricula}</div>

            <div>
                <span class="class-badge">
                    ${student.turma}
                </span>
            </div>

            <div>${student.escola}</div>

            <div>

                <span class="${
                    student.status === "Ativo"
                    ? "status-active"
                    : "status-inactive"
                }">

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

renderStudents();