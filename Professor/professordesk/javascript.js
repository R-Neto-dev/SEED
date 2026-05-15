// Dados dos eventos (Provas, Prazos, Reuniões)
const eventsData = [];

let currentCalendarDate = new Date(2026, 3); // Abril 2026

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const container = document.getElementById('calendarDays');
    if (!container) return;
    let html = '';

    // dias vazios antes do mês
    for (let i = 0; i < firstDay; i++) html += '<div class="calendar-day"></div>';

    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dayEvents = eventsData.filter(ev => ev.date === dateStr);
        let eventClass = '';
        if (dayEvents.length) {
            eventClass = `has-event ${dayEvents[0].type}`;
        }
        const isToday = (dateStr === new Date().toISOString().slice(0,10));
        html += `<div class="calendar-day ${eventClass} ${isToday ? 'today' : ''}" 
                 onclick="alert('${dayEvents.map(e=>e.title).join('\\n') || 'Sem eventos'}')">${d}</div>`;
    }
    container.innerHTML = html;

    // atualiza cabeçalho do mês
    const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const headerTitle = document.querySelector('.calendar-card .card-header h2');
    if(headerTitle) headerTitle.innerHTML = `<i class='bx bx-calendar'></i> ${monthNames[month]} ${year}`;
}

// Preenchimento das listas completas

function fillTurmas() {
    const turmas = [
        { nome: "6º Ano", alunos: 32, media: 7.5 },
        { nome: "7º Ano", alunos: 30, media: 8.0 },
        { nome: "8º Ano", alunos: 32, media: 8.3 }
    ];

    const container = document.querySelector('#turmas-page .card');

    if (container) {
        container.innerHTML = `
            <div class="card-header"><h2>Turmas</h2></div>
            <div class="results-list">
                ${turmas.map(t => `
                    <div class="result-item">
                        <div class="result-info">
                            <div class="result-name">${t.nome}</div>
                            <div class="result-date">${t.alunos} alunos</div>
                        </div>
                        <div class="result-grade">${t.media}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Menu mobile
function mobileMenu() {
    const btn = document.getElementById('menuBtn');
    const sidebar = document.querySelector('.sidebar');
    btn?.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if(sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !btn?.contains(e.target))
            sidebar.classList.remove('open');
    });
}

// Navegação do calendário
function initCalendarNav() {
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev && next) {
        prev.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
        next.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }
}

function fillProvasTable() {
    const provas = [
        {
            nome: "Matemática - Prova Bimestral",
            turma: "9º Ano A",
            data: "15 Abr 2026",
            questoes: 20,
            participacao: "28/32",
            status: "Ativa"
        },
        {
            nome: "Matemática - Avaliação Diagnóstica",
            turma: "8º Ano B",
            data: "12 Abr 2026",
            questoes: 15,
            participacao: "30/30",
            status: "Encerrada"
        },
        {
            nome: "Matemática - Prova Mensal",
            turma: "7º Ano A",
            data: "22 Abr 2026",
            questoes: 10,
            participacao: "0/28",
            status: "Rascunho"
        },
        {
            nome: "Matemática - Prova 1",
            turma: "6º Ano C",
            data: "10 Abr 2026",
            questoes: 15,
            participacao: "35/35",
            status: "Encerrada"
        }
    ];

    const container = document.getElementById('provasTableBody');

    if(container) {
        container.innerHTML = provas.map(prova => {

            let statusClass = '';

            if(prova.status === 'Ativa') {
                statusClass = 'ativa';
            }

            else if(prova.status === 'Encerrada') {
                statusClass = 'encerrada';
            }

            else {
                statusClass = 'rascunho';
            }

            return `
                <tr>
                    <td>
                        <div class="prova-info">
                            <div class="prova-icon">
                                <i class='bx bx-file'></i>
                            </div>

                            <span>${prova.nome}</span>
                        </div>
                    </td>

                    <td>${prova.turma}</td>

                    <td>${prova.data}</td>

                    <td>${prova.questoes}</td>

                    <td>${prova.participacao}</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${prova.status}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function fillResultadosTable() {

    const resultados = [

    {
        turma: "6º Ano B",
        prova: "Prova Bimestral",
        media: "7.5",
        participacao: "30/32",
        status: "Regular"
    },

    {
        turma: "7º Ano C",
        prova: "Avaliação Final",
        media: "9.0",
        participacao: "30/30",
        status: "Excelente"
    },

    {
        turma: "8º Ano A",
        prova: "Prova Mensal",
        media: "7.5",
        participacao: "28/32",
        status: "Regular"
    }
];

    const container = document.getElementById('resultadosTableBody');

    if(container) {

        container.innerHTML = resultados.map(resultado => {

            let statusClass = '';

            if(resultado.status === 'Excelente') {
                statusClass = 'ativa';
            }

            else if(resultado.status === 'Regular') {
                statusClass = 'encerrada';
            }

            else {
                statusClass = 'rascunho';
            }

            return `
                <tr>

                    <td>${resultado.turma}</td>

                    <td>${resultado.prova}</td>

                    <td>${resultado.media}</td>

                    <td>${resultado.participacao}</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${resultado.status}
                        </span>
                    </td>

                </tr>
            `;

        }).join('');
    }
}

// Logout
function logout() {
    const userName = document.querySelector('.user-name')?.textContent.trim() || 'usuário';
    document.getElementById('logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Deseja sair da sua conta?')) alert(`Até logo, ${userName}!`);
    });
}

// Inicialização
function init() {
    renderCalendar();
    fillProvasTable();
    fillTurmas();
    fillResultadosTable();
    mobileMenu();
    initCalendarNav();
    logout();
}

init();