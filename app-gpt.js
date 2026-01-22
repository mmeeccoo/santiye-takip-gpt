// Geçici (fake) kullanıcılar
const users = [
  { username: "isci1", pin: "1234" },
  { username: "isci2", pin: "1111" },
  { username: "usta", pin: "2222" }
];

function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;
  const error = document.getElementById("error");

  const user = users.find(
    u => u.username === username && u.pin === pin
  );

  if (user) {
    alert("Giriş başarılı! (Sonraki adım: Ana ekran)");
    // ileride burada worker.html'e yönlendireceğiz
  } else {
    error.textContent = "Kullanıcı adı veya PIN hatalı";
  }
}
