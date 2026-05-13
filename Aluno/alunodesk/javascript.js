// Dados dos eventos (Provas, Prazos, Reuniões)
const eventsData = [
    { date: "2026-04-15", type: "exam", title: "Matemática - Prova Bimestral" },
    { date: "2026-04-18", type: "exam", title: "Português - Avaliação" },
    { date: "2026-04-22", type: "exam", title: "História - Prova" },
    { date: "2026-04-10", type: "deadline", title: "Entrega de Trabalho" },
    { date: "2026-04-20", type: "deadline", title: "Prazo de Inscrição" },
    { date: "2026-04-25", type: "meeting", title: "Reunião de Pais" }
];

// Dados completos dos resultados (movido para fora da função)
const allResultsData = [
    { name: "Matemática - Prova Bimestral", date: "15/04/2026", grade: 8.5, status: "aprovado", year: 2026 },
    { name: "Português - Avaliação", date: "10/04/2026", grade: 7.0, status: "aprovado", year: 2026 },
    { name: "Ciências - Prova 1", date: "05/04/2026", grade: 9.0, status: "aprovado", year: 2026 },
    { name: "História - Prova", date: "28/03/2026", grade: 6.5, status: "aprovado", year: 2026 },
    { name: "Geografia - Avaliação", date: "20/03/2026", grade: 5.5, status: "reprovado", year: 2026 },
    { name: "Física - Prova", date: "15/03/2026", grade: 8.0, status: "aprovado", year: 2026 },
    { name: "Matemática - Prova Parcial", date: "10/03/2026", grade: 7.5, status: "aprovado", year: 2026 },
    { name: "Português - Redação", date: "05/03/2026", grade: 9.5, status: "aprovado", year: 2026 },
    { name: "História - Trabalho", date: "25/02/2026", grade: 6.0, status: "recuperacao", year: 2026 },
    { name: "Química - Prova", date: "20/02/2026", grade: 4.5, status: "reprovado", year: 2026 },
    { name: "Inglês - Avaliação", date: "10/02/2026", grade: 8.5, status: "aprovado", year: 2026 },
    { name: "Matemática - Final", date: "05/12/2025", grade: 7.0, status: "aprovado", year: 2025 },
    { name: "Português - Final", date: "01/12/2025", grade: 6.5, status: "aprovado", year: 2025 }
];

let currentCalendarDate = new Date(2026, 3); // Abril 2026
let currentResultFilter = "all";
let currentSearchTerm = "";
let chartInstance = null;

// FUNÇÕES DO CALENDÁRIO 
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

// FUNÇÕES DE NAVEGAÇÃO 
function setupPages() {
    const navLinks = document.querySelectorAll('.nav-item[data-page]');
    const pages = ['dashboard', 'minhas-provas', 'resultados', 'calendario', 'configuracoes'];

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            pages.forEach(p => {
                const el = document.getElementById(`${p}-page`);
                if(el) el.style.display = 'none';
            });
            const activePage = document.getElementById(`${pageId}-page`);
            if(activePage) activePage.style.display = 'block';
            
            if(pageId === 'resultados') {
                renderFullResults();
                setupChart();
            }
        });
    });
    
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

// FUNÇÕES DE RESULTADOS
function getStatusText(status) {
    const statusMap = {
        'aprovado': 'Aprovado',
        'reprovado': 'Reprovado',
        'recuperacao': 'Recuperação'
    };
    return statusMap[status] || status;
}

function renderFullResults() {
    let filteredResults = [...allResultsData];
    
    if (currentResultFilter !== "all") {
        filteredResults = filteredResults.filter(r => r.status === currentResultFilter || r.year.toString() === currentResultFilter);
    }
    
    if (currentSearchTerm) {
        filteredResults = filteredResults.filter(r => 
            r.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
    }
    
    const container = document.getElementById('allResultsList');
    if(container) {
        container.innerHTML = filteredResults.map(r => `
            <div class="result-row">
                <div class="result-name">${r.name}</div>
                <div class="result-date">${r.date}</div>
                <div class="result-grade ${r.grade >= 7 ? 'good' : (r.grade >= 5 ? 'average' : 'bad')}">${r.grade.toFixed(1)}</div>
                <div class="result-status ${r.status}">${getStatusText(r.status)}</div>
            </div>
        `).join('');
    }
}

function setupResultFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentResultFilter = btn.getAttribute('data-filter');
            renderFullResults();
        });
    });
    
    const searchInput = document.getElementById('searchResult');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            renderFullResults();
        });
    }
    
    const periodSelect = document.getElementById('chartPeriod');
    if (periodSelect) {
        periodSelect.addEventListener('change', (e) => {
            setupChart(e.target.value);
        });
    }
}

function setupChart(months = 6) {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const chartData = {
        labels: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
        notas: [7.2, 7.5, 6.8, 7.8, 8.0, 8.5, 8.2]
    };
    
    if (months === 12) {
        chartData.labels = ['Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
        chartData.notas = [6.5, 6.8, 7.2, 7.5, 6.8, 7.8, 8.0, 8.5, 8.2, 8.4, 8.3, 8.5];
    } else if (months === 'all') {
        chartData.labels = ['2024-1', '2024-2', '2025-1', '2025-2', '2026-1'];
        chartData.notas = [6.2, 6.8, 7.2, 7.8, 8.2];
    }
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    if (typeof Chart !== 'undefined') {
        chartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Média das Notas',
                    data: chartData.notas,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 11 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `Nota: ${ctx.raw}`
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        title: { display: true, text: 'Nota', font: { size: 11 } }
                    }
                }
            }
        });
    } else {
        canvas.style.display = 'none';
        canvas.parentNode.innerHTML += '<p class="chart-fallback">Carregando gráfico...</p>';
    }
}

// FUNÇÕES DE PROVAS
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

function initExamButtons() {
    document.querySelectorAll('.btn-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('🚀 Iniciando simulado/prova. Função em desenvolvimento.');
        });
    });
}

// ========== FUNÇÕES GERAIS ==========
function mobileMenu() {
    const btn = document.getElementById('menuBtn');
    const sidebar = document.querySelector('.sidebar');
    btn?.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if(sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !btn?.contains(e.target))
            sidebar.classList.remove('open');
    });
}

function logout() {
    document.getElementById('logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        if(confirm('Deseja sair da sua conta?')) alert('Até logo, João!');
    });
}

// ========== INICIALIZAÇÃO ==========
function init() {
    renderCalendar();
    setupPages();
    fillFullExams();
    renderFullResults();
    setupResultFilters();
    setupChart();
    mobileMenu();
    initExamButtons();
    initCalendarNav();
    logout();
}

// Carregar Chart.js dinamicamente
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
script.onload = () => {
    if (document.getElementById('performanceChart')) {
        setupChart();
    }
};
document.head.appendChild(script);

// Iniciar tudo
init();