const SUPABASE_URL = 'https://dehztodijllyjjlslxvi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaHp0b2RpamxseWpqbHNseHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NjY3MzEsImV4cCI6MjA4NDU0MjczMX0.u9f2FWTfzapPgEo9KJMDkx2hofUAOT0Q6vX0bisx7Dk';

// İstemciyi pencereye (window) bağlayarak tanımlıyoruz
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.login = async function() {
    const userBox = document.getElementById("username");
    const pinBox = document.getElementById("pin");
    const errorDisplay = document.getElementById("error");

    const uName = userBox.value.trim();
    const uPin = pinBox.value.trim();

    if (!uName || !uPin) {
        errorDisplay.textContent = "Kullanıcı adı ve PIN giriniz";
        return;
    }

    try {
        errorDisplay.textContent = "Kontrol ediliyor...";
        
        // Veritabanında tam eşleşme arıyoruz
        const { data, error } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('username', uName)
            .eq('pin', uPin)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            // Bilgiler doğruysa kaydet ve git
            localStorage.setItem("loggedUser", data.username);
            localStorage.setItem("userRole", data.role);
            window.location.href = "worker-gpt.html";
        } else {
            errorDisplay.textContent = "Kullanıcı adı veya PIN hatalı";
        }
    } catch (err) {
        console.error(err);
        errorDisplay.textContent = "Bağlantı hatası oluştu.";
    }
};
