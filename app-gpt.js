const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

// İsim çakışmasını önlemek için 'mySupabase' ismini kullanıyoruz
let mySupabase;

window.onload = () => {
    if (window.supabase) {
        // Burada kütüphaneyi başlatıyoruz
        mySupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Sistem bağlantısı kuruldu.");
    } else {
        console.error("Supabase kütüphanesi yüklenemedi. İnternet bağlantınızı kontrol edin.");
    }
};

window.login = async function() {
    const errorDisplay = document.getElementById("error");
    const uName = document.getElementById("username").value.trim();
    const uPin = document.getElementById("pin").value.trim();

    if (!mySupabase) {
        errorDisplay.textContent = "Sistem henüz hazır değil, 1 saniye sonra tekrar deneyin.";
        return;
    }

    if (!uName || !uPin) {
        errorDisplay.textContent = "Kullanıcı adı ve PIN giriniz";
        return;
    }

    try {
        errorDisplay.textContent = "Giriş yapılıyor...";
        
        const { data, error } = await mySupabase
            .from('users')
            .select('*')
            .eq('username', uName)
            .eq('pin', uPin)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            console.log("Giriş başarılı!");
            localStorage.setItem("loggedUser", data.username);
            localStorage.setItem("userRole", data.role);
            window.location.href = "worker-gpt.html";
        } else {
            errorDisplay.textContent = "Kullanıcı adı veya PIN hatalı";
        }
    } catch (err) {
        console.error("Hata detayı:", err);
        errorDisplay.textContent = "Sunucuya ulaşılamıyor. Lütfen internetinizi kontrol edin.";
    }
};
