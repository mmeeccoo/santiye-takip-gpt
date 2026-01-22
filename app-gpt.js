const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

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
