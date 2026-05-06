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