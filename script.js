
let oyunalani;
let slaytIndex = 0;
let metinIndex = 0;
let slide;
let metin;
let skip;
let skipAktif = true;
let skipHover = false;
let clickSound = new Audio("sound/click.mp3");
let skipSound = new Audio("sound/skip.mp3");
let girisMuzik = new Audio("sound/giris.mp3");
let odaMuzik = new Audio("sound/oda.mp3");
let meltdown = new Audio("sound/meltdown.mp3");
let mouseSesi = new Audio("sound/mouse.mp3");
let klavyeSesi = new Audio("sound/klavye.mp3");
let kafavurma = new Audio("sound/kafavurma.mp3");
let trink = new Audio("sound/trink.mp3");
let stars = new Audio("sound/stars.mp3");
let printer = new Audio("sound/printer.mp3");
let kagit = new Audio("sound/kagit.mp3");
let floatplay = new Audio("sound/floatplay.mp3");

let muzikBasladiMi = false;
let fadeAlpha = 1;
let fadeAktif = false;
let yuklenenResimSayisi = 0;

//---RİTİM OYUNU KISMI İÇİN:
let bg;
let logo;
let tutorialResmi;
let logoAktif = false;
let tutorialAktif = false;
let ritimSkor = 0;
let ritimKombo = 0;
let geriSayimSayisi = "";
let ritimBasladi = false;
let vurusSesi = new Audio("sound/vurus.mp3");
let lagtrain = new Audio("sound/lagtrain.mp3");
let gecisAlpha = 0;
let gecisBasladi = false;
let maxKombo = 0;
let sayacMukemmel = 0, sayacHarika = 0, sayacIyi = 0, sayacKotu = 0, sayacIska = 0;

// RİTİM OYUNU MOTOR DEĞİŞKENLERİ ----------
let notalar = [];
let hitlineX = 300; // Hitline'ın yatay konumu
let seritY = [200, 300, 400, 500]; // 0: Yukarı, 1: Sağ, 2: Aşağı, 3: Sol (Yatay eksendeki hizaları)

let ritimGeribildirim = ""; // "Mükemmel", "Iska" gibi yazıları tutuyo
let geribildirimZamani = 0; // Yazının ekranda kalma süresi

let okResimleri = [];
let okYollari = [
    "images/ok_yukari.png", 
    "images/ok_sag.png", 
    "images/ok_asagi.png", 
    "images/ok_sol.png"
];
for (let i = 0; i < 4; i++) {
    let img = new Image();
    img.src = okYollari[i];
    okResimleri.push(img);
}
//dans kareleri
let ayasa1, ayasa2, mc1, mc2;
mc1 = new Image(); mc1.src = "images/mc1.png";
mc2 = new Image(); mc2.src = "images/mc2.png";
ayasa1 = new Image(); ayasa1.src = "images/ayasa1.png";
ayasa2 = new Image(); ayasa2.src = "images/ayasa2.png";

let images = [
    "images/img0.png",
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png",
    "images/img6.png",
    "images/img7.png",
    "images/img8.png",
    "images/img9.png",
    "images/img10.png",
    "images/img11.png",
    "images/img12.png",
    "images/img13.png",
    "images/img14.png",
    "images/img15.png"
];

let preloadList = [
    // VN görselleri
    "images/img0.png",
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png",
    "images/img6.png",
    "images/img7.png",
    "images/img8.png",
    "images/img9.png",
    "images/img10.png",
    "images/img11.png",
    "images/img12.png",
    "images/img13.png",
    "images/img14.png",
    "images/img15.png",

    // Diğer görseller
    "images/skip.png",
    "images/bg.png",
    "images/logo.png",
    "images/tutorial.png",
    "images/skor.png",

    // Oklar
    "images/ok_yukari.png",
    "images/ok_sag.png",
    "images/ok_asagi.png",
    "images/ok_sol.png",

    // Dans spriteları
    "images/mc1.png",
    "images/mc2.png",
    "images/ayasa1.png",
    "images/ayasa2.png"
];

let metinler1 = [
  "*Her şey çok sıkıcı.",
  "*Her günüm hemen hemen aynı geçiyor:",
  "*Sabah kalkıp hazırlanıyorum, okula gidiyorum, bütün sıkıcı dersleri atlattıktan sonra tekrar eve dönüyorum, ödevlerimi yapıp tekrardan yatıyorum…",
  "*Hayatım çoğu zaman oldukça renksiz ve karanlık hissettiriyor.",
  "*Ama tam da böyle zorlandığınız zamanlarda, insanın hayata tutunduğu bir şey olur. Ya da en azından tutunacak bir şey arar…",
  "*Ve işte benimkisi ise..",
  "*..Ayasa",
  "*Kendisi çok popüler bir internet idolü, şarkıcı ve dansçı.",
  "*Çıkan her bir şarkısıyla interneti çalkalayan, upuzun bebe mavisi saçlara ve renkli gözlere sahip, sesiyle herkesin dikkatini çeken sıradışı bir robot.",
  "*Bazıları onun gerçek olmadığını, internetteki rastgele birinin sırf eğlence olsun diye oluşturduğu kurgusal bir karakterden ibaret olduğunu söylüyor.",
  "*Youtube kanalına sadece müzik videolarını atıp fanlarının hiçbir yorumuna veya mesajına cevap vermediği düşünüldüğünde kulağa pek de mantıksız gelmiyor aslında.",
  "*Ama bu sadece halk efsanelerinden biri, ben buna inanmıyorum.",
  "*Ne zaman kötü hissetsem onun şarkılarını açıp dinlerim.",
  "*Ne kadar kötü bir gün geçirirsem geçireyim, ne kadar her şeyden yorulmuş hissedersem hissedeyim… Ayasa’nın sesi her seferinde bana huzur vermeyi başarıyor.",
  "*Şarkıları bana her zaman devam etmemde yardımcı oldu.",
  "*O benim kurtarıcım.",
  "*Ama son zamanlarda nedense... bir şey oldu.",
  "*Kimse nedenini bilmiyor. Ama Ayasa bir anda gizemli bir şekilde ortadan kayboldu.",
  "*Artık ne yeni videolar yüklüyor ne de ondan bir haber alabiliyoruz. İnternette onu kendi gözleriyle gördüğünü iddia eden bazı kişiler de var. Fakat kimsenin pek inandığı söylenemez. Çoğu kişi onun gerçek bir birey olduğuna bile inanmıyor sonuçta.",
  "*Ne oldu bilmiyorum… Ama umarım her şey yolundadır.",
  "", //20
  "",
  ".....",
  "Of...",
  "Belki de biraz mola vermeliyim.",
  "Ayasa yeni video atmış mıdır acaba",
  "", //26
  "Hayır.",
  "Tabii ki de hayır.",
  "**iç çeker*",
  "Mouse ile Paint’ten bir şeyler mi karalasam bari", //30
  "",
  "",
  ".....",
  "heh.", //34
  "...",
  "Keşke cidden Ayasa’dan bir imza alabilme şansım olsaydı.",
  "",
  "",
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.....", //39
  "Acaba başına ne geldi..",
  "Bir yıldan fazla bir süredir kanalı tamamen sessiz.",
  "...",
  "..gerçekten zevk aldığım tek bir şey vardı onu da kaybettim galiba.",
  "", //44
  "zzzzz...",
  "**trink!*",
  "...... hm?",
  "", //48
  "...ne",
  "",
  "A... Ayasa..?",
  "AAAHH!!",
  "", //53
  "",
  "Ayasa: Merhaba! ^^",
  "M..Merhaba.. Sen...",
  "Ayasa!?! Buna inanamıyorum!!! Ben nerede… Sen nasıl…",
  "Ayasa: Hehhehe.. Oradan gözüme çok mutsuz görünmüştün. Ben de bir bakmaya karar verdim. Bu şekilde yapabileceğim şeyler biraz kısıtlı, ama en azından moralini birazcık da olsa düzeltebilmeyi çok isterim.",
  "Ayasa: Şarkı söylemeyi sever misin?", //59
  "......Hayır. Sesimin pek iyi olduğu söylenemez.",
  "Oh! Ama dans etmeyi severim.",
  "Ayasa: Harika! O zaman, bugünlük bana eşlik etmeye ne dersin?",
  "NEEEEEE??!" //63
];

let metinler2 = [
    "Ayasa: Bugun bana katıldığın için teşekkür ederim ^^ Umarım şimdi kendini biraz daha iyi hissediyorsundur",
    "Evet, şimdi çok daha iyiyim. Çok teşekkür ederim",
    "Ama dur! Bekle, sen...",
    "Çok uzun bir süredir yoktun, ve… Her şey yolundadır umarım..? Sen iyisin değil mi?",
    "Ayasa: ... *güler*",
    "Ayasa: Sen benim için endişelenme, şu an daha önce hiç olamayacağım kadar mutluyum ben.",
    "Ayasa: Hiçbirinizi bırakmadım. Ben her zaman burada, sizlerle olacağım. Her şey ne kadar karanlık olursa olsun, dünya ne kadar korkunç bir yer olursa olsun.. Hepiniz benim için çok değerlisiniz.",
    "Ayasa: Lütfen, kendine çok fazla yüklenme. Ve kendine iyi bak.",
    "", //8
    "ne",
    "Ah, uyuyakalmışım.",
    "Hepsi sadece bir rüyaydı sanırsam.",
    "...",
    ".. :)",
    "Yine de yüz yıl düşünsem, rüya bile olsa, Ayasa ile bir performans sergileyebileceğim asla aklımdan bile geçmezdi.",
    "Ayasa ileride kanalına geri dönmeyecek olsa bile, umarım şu an olduğu yerde mutlu ve iyidir.",
    "Hm.?",
    "", //17
    "Printerım...",
    "",
    "NEEEEEEEEEEEEEEEEEEE"
];

let metinler = metinler1; // Başlangıçta metinler1'i kullanıyoruz o yüzden, 2. kısımda metinler2 dicez

const STATES = { //4 farklı aşama var
    VN1: "VN1",
    RITIM: "RITIM",
    VN2: "VN2",
    SON: "SON"
};

window.addEventListener('keydown', function(event) {
    if (currentGameState === STATES.RITIM && ritimBasladi) {
        // Tuşa basıldığında sayfanın aşağı kaymasını engellemek için:
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.key) > -1) {
            event.preventDefault();
        }
        // 0: Yukarı, 1: Sağ, 2: Aşağı, 3: Sol
        if (event.key === "ArrowUp") notaVur(0);
        else if (event.key === "ArrowRight") notaVur(1);
        else if (event.key === "ArrowDown") notaVur(2);
        else if (event.key === "ArrowLeft") notaVur(3);
    }
});

let currentGameState = STATES.VN1; // Oyun VN1 ile başliyo!!!!!!

setInterval(function() { //RİTİM OYUNUNDA NOTALARIN SÜREKLİ KAYMASI İÇİN SAYAYI OTOMATİK YENİDEN ÇİZİYO
    drawScene(); 
}, 16);

// Tüm resimler yüklendiğinde oyunu başlat
function preloadImages() {
    for (let i = 0; i < preloadList.length; i++) {
        let img = new Image();

        img.onload = function() {
            yuklenenResimSayisi++;

            if (yuklenenResimSayisi === preloadList.length) {
                startGame();
            }
        };

        img.src = preloadList[i];
    }
}

function startGame() {
    oyunalani = {
        canvas: document.createElement("canvas"),
        start: function() {
            this.canvas.width = 1280;
            this.canvas.height = 720;
            this.context = this.canvas.getContext("2d");
            document.body.appendChild(this.canvas);

            this.canvas.addEventListener("click", clickleme);
            this.canvas.addEventListener("mousemove", function(e) {
                let rect = oyunalani.canvas.getBoundingClientRect();
                let mouseX = e.clientX - rect.left;
                let mouseY = e.clientY - rect.top;

                skipHover = //mouse üstündeyse skip hover efekt oluşcak
                skipAktif &&
                mouseX >= skip.x &&
                mouseX <= skip.x + skip.width &&
                mouseY >= skip.y &&
                mouseY <= skip.y + skip.height;
                //buradaki drawScene'i sildim çünkü bug oluyodu
            });

        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    oyunalani.start();

    slide = new component(1280, 720, images[slaytIndex], 0, 0);
    skip = new component(120, 60, "images/skip.png", 1145, 647, "image");
}

function clickleme(event) {
    
    let rect = oyunalani.canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    //RİTİM OYUNU KISMI İÇİN
    if (currentGameState === STATES.RITIM) {
        
        if (logoAktif) { //ekrana tıklandığında logo aktifse onu kapatıp tut resmini açıyo
            clickSound.currentTime = 0;
            clickSound.play();
            logoAktif = false;
            tutorialAktif = true;
            drawScene();
            return;
        }

        if (tutorialAktif) { //aynı şekilde ama tam tersi kinda
            clickSound.currentTime = 0;
            clickSound.play();
            tutorialAktif = false;
            geriSayim();
            return;
        }

        return; // Oyunun asıl kısmı başladığında buraya tuş basışları gelecek
    }

    if (currentGameState === STATES.SON){
        return; //oyun bitmişse artık her şey kilitlenecek tıklanmayacak
    }

    //VN KISIMLARI İÇİN
    if (!muzikBasladiMi) {
        floatplay.pause(); //arada buga giriyo tekrar oynarken ondan sondaki müzigi susturuyorum iyice
        floatplay.currentTime = 0;
        girisMuzik.currentTime = 0;
        girisMuzik.loop = true;
        girisMuzik.play();

        muzikBasladiMi = true;
    }

    // skip butonu için
    if (skipAktif &&
        mouseX >= skip.x &&
        mouseX <= skip.x + skip.width &&
        mouseY >= skip.y &&
        mouseY <= skip.y + skip.height)
        {
            if(currentGameState === STATES.VN1){
                girisMuzik.pause();
                odaMuzik.pause();
                if(metinIndex < 54) meltdown.play(); //oyuncu erkenden skiplemişse meltdown çalsın tut sahnesnde
                skipSound.currentTime = 0;
                skipSound.play();
                metinIndex = metinler.length;
                nextMetin();
                return;
            }
            else if(currentGameState === STATES.VN2){
                odaMuzik.pause();
                skipSound.currentTime = 0;
                skipSound.play();
                metinIndex = metinler.length;
                nextMetin();
                return;
            }
        
    }

    // skip degilse normal tıklama
    //if(currentGameState === STATES.RITIM) return; BOZULURSA GERİ ALIRSIN BURAYI
    clickSound.currentTime = 0;
    clickSound.play();
    nextMetin();
}

function component(width, height, src, x, y) {
    this.image = new Image();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.image.onload = () => {
        drawScene();
    };

    this.image.src = src;

    this.update = function() {
      let ctx = oyunalani.context;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function drawScene() {

    let ctx = oyunalani.context;
    oyunalani.clear();

    if (currentGameState === STATES.VN1 || currentGameState === STATES.VN2) {
        drawVN(ctx);
    } else if (currentGameState === STATES.RITIM) {
        drawRitim(ctx);
    } else if(currentGameState === STATES.SON){
        drawSon(ctx);
    }
}

function drawVN(ctx){

    // arka plan fade
    ctx.save();
    ctx.globalAlpha = fadeAlpha;
    slide.update();
    ctx.restore();

  if(metinIndex<metinler.length){

    //textbox gelcek ben gradyan seçtim
    const grad=ctx.createLinearGradient(0,0,1280,0);
    grad.addColorStop(1, "#b370ff");
    grad.addColorStop(0, "#ffaa65");
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(10,510,1260,200);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(9,510,1260,200);
    ctx.globalAlpha = 1.0; // geri sıfırlıyosun opaklığı

    ctx.save(); //sadece yazılarda gölge olması için!!!!

    // yazı ayarları
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 9;

    ctx.fillStyle = "white";

    let text = metinler[metinIndex];
    if (text.startsWith("*")) { //YAZIYI İTALİK YAPMAK İÇİN
      ctx.font = "italic bold 40px Gabriola";
      text = text.slice(1); // baştaki * işaretini kaldırıyoz
    } 
    else {
    ctx.font = "bold 40px Gabriola";
    } 

    // yazı
     wrapText(
        ctx,
        text, //text dedim çünkü metinler[metinIndex] diyince * koyuyo lol..
        50,      // x
        570,     // y başlangıç
        1180,    // max genişlik (kutudan biraz küçük)
        45       // satır aralığı
    );

    ctx.restore(); //gölge efektini silmek için yoksa dikdörtgenlere de ekliyor

    if (skipHover)
        ctx.globalAlpha = 1; 
    else 
        ctx.globalAlpha = 0.7;
    
    skip.update(); //skip butonunu en sona koydum ki en üste çizsin
    ctx.globalAlpha = 1;
   }
}

//ritim oyununun kodlarını hep aşağılara yazdım drawRitim startRitim falan haberin olsun

function fadeIn(hiz = 0.1) { //eğer ben aksini söylemezsem hızı hep 0.1 yapacak demek
    fadeAlpha = 0;
    fadeAktif = true;

    let interval = setInterval(function() {
        fadeAlpha += hiz;

        if (fadeAlpha >= 1) {
            fadeAlpha = 1;
            fadeAktif = false;
            clearInterval(interval);
        }

        drawScene();
    }, 30); // 30ms
}

function fadeOut(callback) {
    fadeAlpha = 1;
    fadeAktif = true;

    let interval = setInterval(function() {
        fadeAlpha -= 0.15;

        if (fadeAlpha <= 0) {
            fadeAlpha = 0;
            fadeAktif = false;
            clearInterval(interval);

            // Eğer bir sonraki adım tanımlıysa onu çalıştırıyor
            if (callback)
                callback();
            }

        drawScene();
    }, 30); // 30ms
}


function wrapText(ctx, text, x, y, maxWidth, lineHeight) { //sığmayan satırları alta indirmek için
    let words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let metrics = ctx.measureText(testLine); //canvas'ın uzunluk ölçme fonksiyonu imiş
        let testWidth = metrics.width; //test genişliği yazının genişkiği kadar yapıyor

        // taşma kontrolü
        if (testWidth > maxWidth && i > 0) { //"satır genişliği max genişlikten uzunsa ve ilk kelime değilse satırı kır"
            ctx.fillText(line, x, y);
            line = words[i] + " "; //yeni satır bu kelimeyle başliyo
            y += lineHeight; //bir satır atlattı
        } else {
            line = testLine; //test ettiğimiz line'ı gerçek line'a atadık
        }
    }

    ctx.fillText(line, x, y);
    
}

function nextMetin(){
    if (fadeAktif) return;
    metinIndex++;

    if (metinIndex >= metinler.length) { //OYUN BURDA BAŞLIYACAK!!!
        
        if (currentGameState === STATES.VN1) {
            skipAktif = false;
            fadeOut(startRitim); // Fade bitince ritim oyununa geç
        } 
        else if (currentGameState === STATES.VN2) {
            skipAktif = false;
            fadeOut(son);
        }
        return;
    }

  if(currentGameState === STATES.VN1){
    if (metinIndex === 1) {
        slaytIndex = 1;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        fadeIn();
        return;
    }

    if (metinIndex === 3) {
        slaytIndex = 2;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 4) {
        slaytIndex = 0;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 6) {
        slaytIndex = 3;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 8) {
        slaytIndex = 4;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 12) {
        slaytIndex = 5;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 13) {
        slaytIndex = 6;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 15) {
        slaytIndex = 7;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 16) {
        slaytIndex = 0;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 20) {
        girisMuzik.pause();
        slide = new component(1280, 720, images[0], 0, 0);
        return;
    }

    if (metinIndex === 21) {
        slaytIndex = 8;
        girisMuzik.pause();
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        fadeIn();
        odaMuzik.currentTime = 0;
        odaMuzik.loop = true;
        odaMuzik.play();
        return;
    }

    if (metinIndex === 26) {
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        mouseSesi.play();
        klavyeSesi.play();
        return;
    }

    if (metinIndex === 31) {
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        mouseSesi.play();
        return;
    }

    if (metinIndex === 32) {
        slaytIndex = 9;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 37) {
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        kafavurma.play();
        return;
    }

    if (metinIndex === 38) {
        slaytIndex = 10;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 44) {
        fadeOut();
        return;
    }

    if (metinIndex === 46) {
        slide = new component(1280, 720, images[0], 0, 0);
        trink.play();
        return;
    }

    if (metinIndex === 48) {
        slaytIndex = 11;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        stars.play();
        fadeIn();
        return;
    }

    if (metinIndex === 50) {
        slaytIndex = 12;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        return;
    }

    if (metinIndex === 52) {
        slaytIndex = 13;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        stars.play();
        return;
    }


    if (metinIndex === 53) {
        odaMuzik.pause();
        fadeOut();
        return;
    }

    if (metinIndex === 54) {
        slaytIndex = 14;
        odaMuzik.pause();
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        fadeIn();
        meltdown.currentTime = 0;
        meltdown.loop = true;
        meltdown.play();
        return;
    }
   }
   else if(currentGameState === STATES.VN2){
    if (metinIndex === 1) {
        slide = new component(1280, 720, images[0], 0, 0);
        return;
    }
    if (metinIndex === 8) {
        slaytIndex = 8;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        odaMuzik.currentTime = 0;
        odaMuzik.loop = true;
        odaMuzik.play();
        fadeIn();
        return;
    }
    if (metinIndex === 17) {
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        printer.play();
        return;
    }
    if (metinIndex === 19) {
        slaytIndex = 15;
        slide = new component(1280, 720, images[slaytIndex], 0, 0);
        kagit.play();
        fadeIn();
        return;
    }
   }
    drawScene();
}

//RİTİM OYUNUUUUU !!!!!!!!!!!!!!!!!!!!!!!!!!

function startRitim() {
    currentGameState = STATES.RITIM;
    logoAktif = true;
    tutorialAktif = false;
    ritimSkor = 0;
    ritimKombo = 0;
    bg = new component(1280, 720, "images/bg.png", 0, 0);
    logo = new component(600, 600, "images/logo.png", 340, 60);
    tutorialResmi = new component(600, 700, "images/tutorial.png", 340, 10);
    // Logonun fade ile girmesi için
    fadeAlpha = 0;
    fadeIn(0.02); 
}

function drawRitim(ctx) {

    if (bg) { //arka planı her zaman en arkaya çizecek
        ctx.save();
        ctx.globalAlpha = fadeAlpha;
        bg.update();

        let vurusIndex = Math.floor(lagtrain.currentTime / 0.408) % 2; //dans animasyonları için

        let mcDans = (vurusIndex === 0) ? mc1 : mc2;
        ctx.drawImage(mcDans, -50, 340, 360, 480);

        let ayasaDans = (vurusIndex === 0) ? ayasa1 : ayasa2;
        ctx.drawImage(ayasaDans, 950, 340, 360, 480);

        ctx.restore();
    }

    if (!ritimBasladi) {
        ctx.save();
        ctx.globalAlpha = 0.4; 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1280, 720); // logo ve geri sayım gözüksün diye tüm ekranı kaplayan karartma efekti
        ctx.restore();
    }

    if (logoAktif) {
        ctx.save();
        ctx.globalAlpha = fadeAlpha;
        logo.update();

        ctx.fillStyle = "#962a00";
        ctx.font = "bold 50px Gabriola";
        ctx.fillText(" ★ by paprikagndz ★", 465, 630);

        ctx.restore();
    }

    if (tutorialAktif) {
        tutorialResmi.update();
    }

    if (geriSayimSayisi !== "") {
        ctx.fillStyle = "white";
        ctx.font = "bold 100px Ink Free";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // Tam ortaya hizalamak için
        ctx.fillText(geriSayimSayisi, 640, 360);
    }

    if (ritimBasladi) {
        //şerit yollar çizimi
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
        ctx.lineWidth = 5; // Tel kalınlığı
    
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            //ekranın en sağından başlayıp hitline çizgisine kadar
            ctx.moveTo(1280, seritY[i]); 
            ctx.lineTo(hitlineX, seritY[i]);
            ctx.stroke();
        }

        ctx.restore();

        // HITLINE ÇİZİMİ
        for (let i = 0; i < 4; i++) {
            ctx.save();
        
            // yuvarlak
            ctx.beginPath();
            ctx.arc(hitlineX, seritY[i], 40, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.globalAlpha = 0.6;
            ctx.fill();
        
            // Outline
            ctx.strokeStyle = "#ff697d";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();

            // saydam ok resmi
            ctx.globalAlpha = 0.3; 
            ctx.drawImage(okResimleri[i], hitlineX - 35, seritY[i] - 35, 70, 70);
        
            ctx.restore();
        }

        // AKAN NOTALARI ÇİZME VE HAREKET ETTİRME
        for (let i = notalar.length - 1; i >= 0; i--) {
            let nota = notalar[i];
        
            // Notaları sağdan sola doğru kaydırma (Hız = 15)
            nota.x -= 15; 
            // Notayı ekrana çizme
            ctx.drawImage(okResimleri[nota.serit], nota.x - 35, seritY[nota.serit] - 35, 70, 70);

            // Nota hitline'ı çok fazla geçerse ıska
            if (nota.x < hitlineX - 100) {
                ritimKombo = 0;
                ritimSkor -= 50;
                sayacIska++;
                geribildirim("ISKA", "gray");
                notalar.splice(i, 1); // Notayı silme
            }
        }

        // GERİBİLDİRİM YAZISI
        if (geribildirimZamani > 0) {
            ctx.fillStyle = ritimGeribildirim.renk;
            ctx.font = "bold 40px Ink Free";
            ctx.textAlign = "center";
            ctx.fillText(ritimGeribildirim.metin, hitlineX + 115, 100); // Hitline'ın biraz sağına
            geribildirimZamani--; // Süreyi azalt
        }

        //oyun bitince En üstte kararma efekti
        if (gecisBasladi) {
            gecisAlpha += 0.02; // Kararma hızı
            ctx.fillStyle = `rgba(0, 0, 0, ${gecisAlpha})`;
            ctx.fillRect(0, 0, 1280, 720);

            // Ekran tamamen siyah olduğunda VN2'ye geç
            if (gecisAlpha >= 1) {
            gecisBasladi = false;
            gecisAlpha = 0; // Bir sonraki geçiş için sıfırla
            finishRitim(); 
            }
        }
    }

    //skorlar en tepede
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.font = "bold 30px Lucida Console";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Skor: " + ritimSkor, 30, 40);
    ctx.fillText("Kombo: " + ritimKombo, 30, 90);
    ctx.strokeText("Skor: " + ritimSkor, 30, 40);
    ctx.strokeText("Kombo: " + ritimKombo, 30, 90);
}

function geriSayim() {
    meltdown.pause();
    let sayilar = ["3", "2", "1", "Başla!"];
    let sira = 0;

    geriSayimSayisi = sayilar[sira]; //3'ü gösterip direk ses çıkarcak
    vurusSesi.currentTime = 0;
    vurusSesi.play();
    drawScene();
    sira++;

    let sayacInterval = setInterval(() => {
        if (sira < sayilar.length) {
            geriSayimSayisi = sayilar[sira];
            vurusSesi.currentTime = 0;
            vurusSesi.play();
            sira++;
            drawScene();
        } 
        else {
            geriSayimSayisi = ""; 
            clearInterval(sayacInterval);
            ritimBasladi = true;
            drawScene();
            gercekOyunuBaslat();
        }
    }, 1000);
}

function gercekOyunuBaslat() {
    lagtrain.currentTime = 0;
    lagtrain.play();
    // Buradan sonrası nota üretim olacak
    // BPM'e göre nota üretimi (60.000 / 147 BPM = ~408ms)
    notaUretici();
    drawRitim(); //notaüretici bittiğinde drawRitim'deki geçişBasladı'yı aktiflicek
}

function notaUretici() {
    // Ritim bittiyse veya şarkı 111. saniyeyi geçtiyse üretimi durdur
    if (!ritimBasladi || lagtrain.currentTime >= 111) {
        return; 
    }

    // Şarkı bittiğinde
    lagtrain.onended = function() {
        gecisBasladi = true; // Karartma efektini tetikle
        return;
    };

    // Nota üretme
    let rastgeleSerit = Math.floor(Math.random() * 4);
    notalar.push({
        x: 1280,
        serit: rastgeleSerit
    });

    // Hız karar(zorluk ayarı)
    let suAnkiSaniye = lagtrain.currentTime;
    let ms = 816.32653; //hız (yavaş)

    // Örnek: 30-100 saniyeler arası ve 130-150 saniyeler arası nakarat
    if ((suAnkiSaniye >= 19 && suAnkiSaniye <= 33) || 
        (suAnkiSaniye >= 58 && suAnkiSaniye < 109)) {
        ms = 408.16326; //(hızlı)
    }
    // Belirlenen gecikme süresiyle kendini tekrar çağırıyo
    setTimeout(notaUretici, ms);
}

function notaVur(seritIndex) {
    let enYakinNota = null;
    let enKucukMesafe = 9999;
    let notaIndex = -1;

    // şeritteki en yakın notayı bulma
    for (let i = 0; i < notalar.length; i++) {
        if (notalar[i].serit === seritIndex) {
            let mesafe = Math.abs(notalar[i].x - hitlineX); //abs mutlak değer alıyomuş
            if (mesafe < enKucukMesafe) {
                enKucukMesafe = mesafe;
                enYakinNota = notalar[i];
                notaIndex = i; //splice için lazım. Hangisini sileceğini söylicek
            }
        }
    }

    // Eğer basılan tuşun şeridinde vurulacak bir nota varsa ve 100 piksel(tolerans) içindeyse
    if (enYakinNota && enKucukMesafe < 100) {
        //Her 50 komboda 2'ye katlanır. 
        let carpan = Math.pow(2, Math.floor(ritimKombo / 50)); // Örn: 49/50=0 -> 2^0=1 veya 50/50=1 -> 2^1=2 veya 100/50=2 -> 2^2=4 gibi.

        if (enKucukMesafe <= 25) {  // MÜKEMMEL
            ritimSkor += 100 * carpan;
            ritimKombo++;
            sayacMukemmel++;
            geribildirim("MÜKEMMEL!", "#57008a");
        } 
        else if (enKucukMesafe <= 50) { // HARİKA
            ritimSkor += 80 * carpan;
            ritimKombo++;
            sayacHarika++;
            geribildirim("HARİKA", "#eb8d00");
        } 
        else if (enKucukMesafe <= 75) { // İYİ
            ritimSkor += 50 * carpan;
            ritimKombo++;
            sayacIyi++;
            geribildirim("İYİ", "#138dd3");
        } 
        else { // KÖTÜ
            ritimKombo = 0;
            sayacKotu++;
            geribildirim("KÖTÜ", "#c21f7e");
        }

        if (ritimKombo > maxKombo) maxKombo = ritimKombo;
        // Vurulan notayı diziden (ekrandan) sil
        notalar.splice(notaIndex, 1); //array'den eleman siliyo. notaIndex nerden silmeye başliyim? diyor, 1 de 1 tane diyor
    }
}

// Ekranda çıkacak "Mükemmel", "Iska" gibi yazıları ayarlıyor
function geribildirim(yazi, renk) {
    ritimGeribildirim = { metin: yazi, renk: renk };
    geribildirimZamani = 30; // Yaklaşık yarım saniye ekranda kalır
}

function finishRitim() {
    notalar = []; //notaları tamamen temizledik
    ritimBasladi = false;

    currentGameState = STATES.VN2;
    metinler = metinler2; // Artık ikinci kısım metinlerini kullan
    metinIndex = 0;       // İndeksi sıfırla
    skipAktif = true;
    
    // VN 2'nin ilk görselini ayarla
    slaytIndex = 0; 
    slide = new component(1280, 720, images[slaytIndex], 0, 0);
    fadeAlpha = 0;
    fadeIn(0.1);
    drawScene();
}

function son(){
    odaMuzik.pause();
    floatplay.currentTime = 0;
    floatplay.loop = true;
    floatplay.play();
    currentGameState = STATES.SON; //BURADA SKOR TABLOSU FALAN GÖSTERECEK
    slide = new component(496, 701, "images/skor.png", 392, 9);
    fadeAlpha = 0;
    fadeIn(0.02);
}

function drawSon(ctx) {
    //Önce arka plan resmi
    ctx.save();
    ctx.globalAlpha = fadeAlpha;
    if (slide) slide.update();

    ctx.font = "bold 35px Bradley Hand ITC";
    ctx.textAlign = "left";

    ctx.fillStyle = "#57008a";
    ctx.fillText(sayacMukemmel, 530, 40); 

    ctx.fillStyle = "#eb8d00";
    ctx.fillText(sayacHarika, 530, 90);

    ctx.fillStyle = "#138dd3";
    ctx.fillText(sayacIyi, 530, 140);

    ctx.fillStyle = "#c21f7e";
    ctx.fillText(sayacKotu, 530, 190);

    ctx.fillStyle = "#632a2a";
    ctx.fillText(sayacIska, 530, 240);

    ctx.fillStyle = "#004d7a";
    ctx.font = "bold 50px Gabriola";
    ctx.fillText(ritimSkor, 730, 97);

    ctx.fillStyle = "#5c2a00";
    ctx.font = "bold 50px Gabriola";
    ctx.fillText(maxKombo, 730, 207);

    ctx.font = "bold 33px Gabriola";
    ctx.fillStyle = "#eb2f00";
    ctx.fillText("Oynadığınız için teşekkürler! ^^", 910, 335);
    ctx.fillStyle = "#61b3ff";
    ctx.font = "25px Gabriola";
    ctx.fillText("(Tekrar oynamak için sayfayı yenilemen yeterli!)", 900, 435);
    ctx.font = "italic 100px Gabriola";
    ctx.fillStyle = "#ecbaff";
    ctx.fillText("Son", 120, 370);

    ctx.restore();
}
