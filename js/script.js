const formulario = document.querySelector("#formulario");
const botonEnviar = document.querySelector(".btn-enviar");

const nameContact = document.getElementsByName("name_contact")[0];
const email = document.getElementsByName("email_contact")[0];
const phone = document.getElementsByName("tel_contact")[0];
const topic = document.getElementById("select");
const commit = document.getElementsByName("commit_contact")[0];

const errorsList = document.getElementById("error");

function showError(element, message) {
  element.classList.toggle("error");
  errorsList.innerHTML += `<li>${message}</li>`;
}

function cleanErrors() {
  errorsList.innerHTML = "";
}

const url =
  "https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email";

async function sendMail(nameContact, email, phone, topic, commit) {
  // TODO: Enviar datos a API usando fetch, siguiendo la estructura indicada
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      contentType: "application/json"
    },
    body: JSON.stringify({ nameContact, email, phone, topic, commit })
  });
  const contenido = await response.json();
  // console.log(contenido);
  if (Object.keys(contenido.errors).length > 0) {
    alert("Error al enviar datos");
  } else {
    alert("correo enviado correctamente");
  }
}

botonEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  cleanErrors();
  let hasErrors = false;

  // TODO: validar nombre y apellido acá
  const sanitizedName = nameContact.value.trim();
  if ((sanitizedName.length = 0 || sanitizedName.indexOf(" ") < 0)) {
    showError(sanitizedName, "El nombre y apeellido no deben estar vacios.");
    hasErrors = true;
  }

  const mailRe = /^\w+@\w+\.\w{2,7}$/;
  if (!mailRe.exec(email.value)) {
    showError(email, "El correo debe seguir un formato válido.");
    hasErrors = true;
  }

  const phoneRe = /^\+?\d{7,15}$/;
  const sanitizedPhone = phone.value.replace("", "");
  if (!phoneRe.exec(sanitizedPhone)) {
    showError(phone, "Número de teléfono debe tener entre 7 y 15 dígitos.");
    hasErrors = true;
  }
  const sanitizedCommit = commit.value.trim();
  if (sanitizedCommit.length < 20) {
    showError(commit, "El mensaje debe ser de al menos 20 caracteres .");
  }
  // TODO: Validar comentario acá

  // TODO: Enviar consulta a API en caso de que el formulario esté correcto
  if (!hasErrors) {
    sendMail(
      sanitizedName,
      email.value,
      sanitizedPhone,
      topic.value,
      sanitizedCommit
    );
  }
});
