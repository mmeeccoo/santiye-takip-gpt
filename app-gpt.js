const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

let supabase;

// Sayfa yüklendiğinde Supabase'i hazırla
window.onload = () => {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase bağlantısı hazır.");
    } else {
        console.error("Supabase kütüphanesi yüklenemedi!");
    }
};

window.login = async function() {
    const errorDisplay = document.getElementById("error");
    const uName = document.getElementById("username").value.trim();
    const uPin = document.getElementById("pin").value.trim();

    if (!supabase) {
        errorDisplay.textContent = "Sistem henüz hazır değil, lütfen bekleyin...";
        return;
    }

    if (!uName || !uPin) {
        errorDisplay.textContent = "Kullanıcı adı ve PIN giriniz";
        return;
    }

    try {
        errorDisplay.textContent = "Giriş yapılıyor...";
        
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', uName)
            .eq('pin', uPin)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            localStorage.setItem("loggedUser", data.username);
            localStorage.setItem("userRole", data.role);
            window.location.href = "worker-gpt.html";
        } else {
            errorDisplay.textContent = "Kullanıcı adı veya PIN hatalı";
        }
    } catch (err) {
        console.error("Detaylı Hata:", err);
        // Hata ERR_NAME_NOT_RESOLVED ise buraya düşer
        errorDisplay.textContent = "Sunucuya ulaşılamıyor. İnternetinizi kontrol edin.";
    }
};
