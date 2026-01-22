// SUPABASE BAĞLANTISI
const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

// Supabase client oluştur
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Login fonksiyonu
async function login() {
  const username = document.getElementById("username").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const error = document.getElementById("error");

  // Boş kontrol
  if (!username || !pin) {
    error.textContent = "Kullanıcı adı ve PIN giriniz";
    return;
  }

  try {
    // Supabase'den kullanıcıyı sorgula
    const { data, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('pin', pin)
      .single();

    if (dbError || !data) {
      error.textContent = "Kullanıcı adı veya PIN hatalı";
      console.error('Supabase hatası:', dbError);
      return;
    }

    // Başarılı giriş
    localStorage.setItem("loggedUser", username);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem("userId", data.id);

    // Yönlendirme
    window.location.href = "worker-gpt.html";

  } catch (err) {
    console.error('Hata:', err);
    error.textContent = "Bağlantı hatası, tekrar deneyin";
  }
}
