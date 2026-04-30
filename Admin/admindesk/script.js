// Seletores
const daysContainer = document.querySelector(".calendar-days");
const monthTitle = document.querySelector(".calendar-header h3");
const prevBtn = document.querySelector(".nav-btn:first-child");
const nextBtn = document.querySelector(".nav-btn:last-child");

// Data atual
let currentDate = new Date();

// Função para renderizar calendário
function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Nome do mês
    const monthNames = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];

    monthTitle.textContent = `${monthNames[month]} ${year}`;

    daysContainer.innerHTML = "";

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1).getDay();

    // Último dia do mês
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Último dia do mês anterior
    const prevLastDate = new Date(year, month, 0).getDate();

    // Dias do mês anterior (muted)
    for (let i = firstDay; i > 0; i--) {
        const div = document.createElement("div");
        div.classList.add("day", "muted");
        div.textContent = prevLastDate - i + 1;
        daysContainer.appendChild(div);
    }

    // Dias do mês atual
    const today = new Date();

    for (let i = 1; i <= lastDate; i++) {
        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = i;

        // Marca o dia atual
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            div.classList.add("active");
        }

        // Clique no dia
        div.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
            div.classList.add("active");
        });

        daysContainer.appendChild(div);
    }

    // Completar com dias do próximo mês
    const totalDays = daysContainer.children.length;
    const nextDays = 42 - totalDays;

    for (let i = 1; i <= nextDays; i++) {
        const div = document.createElement("div");
        div.classList.add("day", "muted");
        div.textContent = i;
        daysContainer.appendChild(div);
    }
}

// Botões
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Inicializa
renderCalendar(currentDate);

const links = document.querySelectorAll(".menu a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const notif = document.querySelector(".notifications");
const badge = document.querySelector(".badge");

notif.addEventListener("click", () => {
  badge.style.display = "none";
});const searchInput = document.querySelector(".search-bar input");
const items = document.querySelectorAll(".list-item");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(value) ? "flex" : "none";
  });
});


document.querySelectorAll(".action-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Função em desenvolvimento");
  });
});
