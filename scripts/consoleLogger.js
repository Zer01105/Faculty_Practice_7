// scripts/consoleLogger.js
document.addEventListener("DOMContentLoaded", () => {
  // Слушаем событие formValid (его диспатчит validation.js)  [oai_citation:8‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
  document.addEventListener("formValid", (event) => {
    const data = event.detail;

    console.clear(); // опционально
    console.log("ФИО:", data.fullname);
    console.log("Телефон:", data.phone);
    console.log("Email:", data.email);
    console.log("Сообщение:", data.message);

    const timestamp = new Date().toLocaleString();
    console.log("Время отправки:", timestamp);
  });
});