// 1. ADIM: Bağlantı Bilgileri (Sadece bir kez tanımlanmalı)
const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

// 2. ADIM: İstemciyi oluştur (Pencereye bağlıyoruz ki her yerden erişilsin)
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. ADIM: Login Fonksiyonu
async function login() {
    const username = document.getElementById("username").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const error = document.getElementById("error");

    if (!username || !pin) {
        error.textContent = "Kullanıcı adı ve PIN giriniz";
        return;
    }

    try {
        const { data, error: dbError } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('pin', pin)
            .single();

        if (dbError || !data) {
            error.textContent = "Kullanıcı adı veya PIN hatalı";
            console.error('Hata detayı:', dbError);
            return;
        }

        // Başarılı giriş
        localStorage.setItem("loggedUser", username);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);

        window.location.href = "worker-gpt.html";

    } catch (err) {
        console.error('Bağlantı Hatası:', err);
        error.textContent = "Sisteme bağlanılamadı.";
    }
}
