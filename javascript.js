// Dados dos eventos (Provas, Prazos, Reuniões)
const eventsData = [
    { date: "2026-04-15", type: "exam", title: "Matemática - Prova Bimestral" },
    { date: "2026-04-18", type: "exam", title: "Português - Avaliação" },
    { date: "2026-04-22", type: "exam", title: "História - Prova" },
    { date: "2026-04-10", type: "deadline", title: "Entrega de Trabalho" },
    { date: "2026-04-20", type: "deadline", title: "Prazo de Inscrição" },
    { date: "2026-04-25", type: "meeting", title: "Reunião de Pais" }
];

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

// Troca de páginas
function setupPages() {
    const navLinks = document.querySelectorAll('.nav-item[data-page]');
    const pages = ['dashboard', 'provas', 'turmas', 'banco', 'resultados', 'calendario', 'configuracoes'];

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            // ativar classe active
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // esconder todas as páginas
            pages.forEach(p => {
                const el = document.getElementById(`${p}-page`);
                if(el) el.style.display = 'none';
            });
            const activePage = document.getElementById(`${pageId}-page`);
            if(activePage) activePage.style.display = 'block';
        });
    });
    // Botões "Ver todas" redirecionam
    document.querySelectorAll('.view-all-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-page');
            if(target) {
                document.querySelector(`.nav-item[data-page="${target}"]`).click();
            }
        });
    });
}

// Preenchimento das listas completas
function fillFullExams() {
    const examsFull = [
        { name: "Matemática - Prova Bimestral", turma: "7º Ano", done: 30, total: 32 },
        { name: "Matemática - Avaliação", turma: "8º Ano", done: 25, total: 30 },
        { name: "Matemática - Prova 1", turma: "6º Ano", done: 20, total: 29 }
    ];

    const container = document.getElementById('allExamsList');

    if (container) {
        container.innerHTML = examsFull.map(ex => {
            const percent = Math.round((ex.done / ex.total) * 100);

            return `
            <div class="exam-item">
                <div class="exam-info">
                    <div class="exam-name">${ex.name}</div>
                    <div class="exam-date">${ex.turma}</div>

                    <div class="mini-bar">
                        <div style="width: ${percent}%"></div>
                    </div>

                    <div class="exam-date">${ex.done}/${ex.total} alunos</div>
                </div>

                <span class="exam-progress">${percent}%</span>
            </div>
            `;
        }).join('');
    }
}

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

function fillFullResults() {
    const container = document.getElementById('allResultsList');
    if (container) {
        container.innerHTML = "<p style='padding:20px'>Nenhum resultado ainda</p>";
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

// Logout
function logout() {
    document.getElementById('logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        if(confirm('Deseja sair da sua conta?')) alert('Até logo, João!');
    });
}

// Inicialização
function init() {
    renderCalendar();
    setupPages();
    fillFullExams();
    fillTurmas();
    fillFullResults();
    mobileMenu();
    initCalendarNav();
    logout();
}

init();