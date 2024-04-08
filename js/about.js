const message = document.querySelector(".submission-message");
const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  message.textContent = "Form Sent Successfully";
  event.target.reset();

  setTimeout(() => {
    message.textContent = "";
  }, 3000);
});
