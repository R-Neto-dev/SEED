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
    const pages = ['dashboard', 'minhas-provas', 'resultados', 'calendario', 'configuracoes'];

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
        { name: "Matemática - Prova Bimestral", date: "15/04/2026 08:00", status: "pendente" },
        { name: "Português - Avaliação", date: "18/04/2026 10:00", status: "pendente" },
        { name: "História - Prova", date: "22/04/2026 14:00", status: "pendente" },
        { name: "Geografia - Final", date: "10/03/2026", status: "realizada", grade: "8.5" },
        { name: "Ciências - Prova", date: "05/03/2026", status: "realizada", grade: "7.8" }
    ];
    const container = document.getElementById('allExamsList');
    if(container) {
        container.innerHTML = examsFull.map(ex => `
            <div class="exam-item" style="justify-content:space-between;">
                <div><strong>${ex.name}</strong><br><span style="font-size:12px;">${ex.date}</span></div>
                ${ex.status === 'pendente' ? '<button class="btn-start">Iniciar</button>' : `<span class="result-grade good">Nota: ${ex.grade}</span>`}
            </div>
        `).join('');
    }
}

function fillFullResults() {
    const allResults = [
        { name: "Matemática Parcial", date: "15/03/2026", grade: 8.5 },
        { name: "Português Redação", date: "10/03/2026", grade: 9.0 },
        { name: "História Trabalho", date: "05/03/2026", grade: 7.5 },
        { name: "Física - Laboratório", date: "25/02/2026", grade: 9.2 }
    ];
    const container = document.getElementById('allResultsList');
    if(container) {
        container.innerHTML = allResults.map(r => `
            <div class="result-item" style="justify-content:space-between;">
                <div><strong>${r.name}</strong><br><span>${r.date}</span></div>
                <div class="result-grade good">${r.grade}</div>
            </div>
        `).join('');
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

// Iniciar prova
function initExamButtons() {
    document.querySelectorAll('.btn-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('🚀 Iniciando simulado/prova. Função em desenvolvimento.');
        });
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
    fillFullResults();
    mobileMenu();
    initExamButtons();
    initCalendarNav();
    logout();
}

init();