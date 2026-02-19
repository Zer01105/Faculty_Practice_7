// scripts/validation.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  const fullname = document.getElementById("fullname");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const agreement = document.getElementById("agreement");

  // Очистка ошибок при вводе
  [fullname, phone, email, message].forEach((el) => {
    el.addEventListener("input", () => clearError(el));
  });
  agreement.addEventListener("change", () => clearError(agreement));

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // отменяем перезагрузку страницы  [oai_citation:2‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)

    // Сбрасываем прошлые ошибки
    [fullname, phone, email, message, agreement].forEach((el) => clearError(el));

    let isValid = true;

    // 1) ФИО: не пустое, минимум 2 слова  [oai_citation:3‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
    const fullnameValue = fullname.value.trim();
    const words = fullnameValue.split(" ").filter((w) => w.length > 0);
    if (fullnameValue === "" || words.length < 2) {
      showError(fullname, "Введите ФИО минимум из двух слов (например: Иванов Иван).");
      isValid = false;
    }

    // 2) Телефон: минимум 10 цифр (только цифры считаем)  [oai_citation:4‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
    const phoneValue = phone.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");
    if (phoneValue === "") {
      showError(phone, "Введите номер телефона.");
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showError(phone, "Введите минимум 10 цифр номера телефона.");
      isValid = false;
    }

    // 3) Email: базовая проверка формата  [oai_citation:5‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      showError(email, "Введите email.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(email, "Введите корректный email (пример: name@mail.ru).");
      isValid = false;
    }

    // 4) Сообщение: необязательное, но если есть — максимум 500 символов (из методички)  [oai_citation:6‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
    const messageValue = message.value.trim();
    if (messageValue.length > 500) {
      showError(message, "Сообщение не должно превышать 500 символов.");
      isValid = false;
    }

    // 5) Согласие: обязательно
    if (!agreement.checked) {
      showError(agreement, "Необходимо согласие на обработку персональных данных.");
      isValid = false;
    }

    // Если всё ок — диспатчим кастомное событие с данными  [oai_citation:7‡Практическое занятие 10.pdf](sediment://file_000000006b2072469b98ff73a2a5b714)
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        phone: phoneValue,
        email: emailValue,
        message: messageValue || "(не заполнено)",
      };

      document.dispatchEvent(new CustomEvent("formValid", { detail: formData }));
      alert("Форма отправлена! Данные выведены в консоль.");

      // опционально: очистить форму
      form.reset();
    }
  });

  // --- helpers (Bootstrap-friendly) ---

  function showError(input, text) {
    // Для checkbox у Bootstrap другой UX
    if (input.type === "checkbox") {
      input.classList.add("is-invalid");
      const holder = input.closest(".form-check");
      if (!holder) return;
      holder.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
      const div = document.createElement("div");
      div.className = "invalid-feedback d-block";
      div.textContent = text;
      holder.appendChild(div);
      return;
    }

    input.classList.add("is-invalid");
    const parent = input.parentElement;
    if (!parent) return;

    parent.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
    const div = document.createElement("div");
    div.className = "invalid-feedback";
    div.textContent = text;
    parent.appendChild(div);
  }

  function clearError(input) {
    input.classList.remove("is-invalid");

    if (input.type === "checkbox") {
      const holder = input.closest(".form-check");
      if (!holder) return;
      holder.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
      return;
    }

    const parent = input.parentElement;
    if (!parent) return;
    parent.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
  }
});