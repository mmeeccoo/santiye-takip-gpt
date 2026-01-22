// Bağlantı bilgileri
const SUPABASE_URL = 'https://blntvxxvtmrehtmcdsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbnR2eHh2dG1yZWh0bWNkc20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjg2MTkwOCwiZXhwIjoyMDUyNDM3OTA4fQ.fNDOMx5k9dLhVhMPArcK-A_aXNc90c6';

// Supabase istemcisini oluştur
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fonksiyonu tarayıcıya tanıt (Pencere seviyesine çıkar)
window.login = async function() {
    const usernameInput = document.getElementById("username");
    const pinInput = document.getElementById("pin");
    const error = document.getElementById("error");

    const username = usernameInput.value.trim();
    const pin = pinInput.value.trim();

    if (!username || !pin) {
        error.textContent = "Kullanıcı adı ve PIN giriniz";
        return;
    }

    try {
        error.textContent = "Giriş yapılıyor...";
        
        const { data, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('pin', pin)
            .maybeSingle();

        if (dbError) {
            console.error('Veritabanı hatası:', dbError);
            error.textContent = "Bağlantı hatası!";
            return;
        }

        if (!data) {
            error.textContent = "Kullanıcı adı veya PIN hatalı";
            return;
        }

        // Başarılı giriş verilerini kaydet
        localStorage.setItem("loggedUser", data.username);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);

        // Yönlendir
        window.location.href = "worker-gpt.html";

    } catch (err) {
        console.error('Sistem hatası:', err);
        error.textContent = "Bir hata oluştu!";
    }
};
