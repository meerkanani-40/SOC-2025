let qr;

const qrContainer = document.getElementById("qrcode");
const text = document.getElementById("qrText").value.trim();
const btn = document.querySelector(".btn");

btn.addEventListener("click", generateQR);

function generateQR(text) {

  qrContainer.innerHTML = "";

  if (!text) {
    alert("Please enter some text or URL");
    return;
  }

  qr = new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}