## **!! Projede kod yazarken canvası ortalama ve fade-in efekti gibi estetik dokunuşlar, javascript'i daha iyi anlama ve yanlış çalışan koddaki hatayı bulma gibi konularda yardımcı olması için ChatGPT ve Gemini'dan faydalandım. Bunun dışında hikaye olsun, çizimler ve müzikler olsun, oyun fikri olsun, hiçbirinde katiyen yapay zeka araçlarına başvurulmamıştır.**

Yazdığım prompt'lar ve aldığım yanıtlar:

### ***- htmlde 1080'e 720 boyutlarındaki canvasımı nasıl ekranda ortalayabilirim?***

HTML’de bir `<canvas>` elementini ekranda ortalamanın en temiz yolu **CSS ile hizalamaktır**. 1080×720 gibi sabit boyutlarda çalışıyorsan birkaç farklı yöntem var; en yaygın ve doğru yaklaşım Flexbox.

### 1. Flexbox ile tam ortalama (önerilen)

Hem yatay hem dikey ortalar:

```html
<!DOCTYPE html>
<html>
<head>
<style>
    body {
        margin: 0;
        height: 100vh;              /* ekran yüksekliği */
        display: flex;
        justify-content: center;    /* yatay ortalama */
        align-items: center;        /* dikey ortalama */
        background-color: #222;
    }

    canvas {
        border: 1px solid white;
    }
</style>
</head>
<body>

<canvas width="1080" height="720"></canvas>

</body>
</html>
```

Bu yöntem modern ve en sorunsuz olanıdır.

---

### 2. Sadece yatay ortalama (eski yöntem)

Eğer sadece ortalamak istersen:

```css
canvas {
    display: block;
    margin: 0 auto;
}
```

Ama bu sadece **yatay** ortalar, dikey değil.

---

### 3. Absolute + transform (alternatif)

Biraz daha “manual” yöntem:

```css
canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

Bu da hem yatay hem dikey ortalar.

---

### Hangisini seçmelisin?

* Yeni proje → **Flexbox**
* Basit yatay hizalama → `margin: auto`
* Özel pozisyon kontrolü → `absolute + transform`

---

### Küçük ama önemli not

1080×720 sabit bir canvas:

* Küçük ekranlarda (örneğin laptop) **taşabilir**
* Eğer responsive yapmak istersen CSS ile scale etmen gerekir

İstersen onu da nasıl yapacağını gösterebilirim.


---
---
---

### ***- js'te neden if'te 3 tane = var? C dilinde 2 taneydi burda neden 3***

İyi yakalamışsın. Bu fark **C ile JavaScript arasındaki önemli bir ayrım**.

---

## 🔍 Kısa cevap

* `==` → değerleri karşılaştırır (gevşek karşılaştırma)
* `===` → **hem değer hem tür (type)** karşılaştırır (katı karşılaştırma)

---

## 🧠 Detaylı açıklama

### 🔸 `==` (gevşek eşitlik)

JavaScript burada **tip dönüşümü yapar**.

```js
5 == "5"   // true 😬
```

Neden?
→ `"5"` string → number’a çevrilir
→ 5 == 5 olur

---

### 🔸 `===` (katı eşitlik)

Hiçbir dönüşüm yapmaz.

```js
5 === "5"   // false ✔️
```

Çünkü:

* biri number
* biri string

---

## 📊 Karşılaştırma tablosu

```js
0 == false     // true 😬
0 === false    // false ✔️

"" == 0        // true 😬
"" === 0       // false ✔️

null == undefined   // true 😬
null === undefined  // false ✔️
```
---

## 🔧 C ile farkı

C dilinde:

```c
if (a == 2)
```

→ çünkü C’de:

* tip dönüşümü bu kadar “gevşek” değil
* `==` zaten daha katı çalışır

JavaScript’te ise:

* dil çok esnek (bazen fazla)
* o yüzden `===` kullanmak daha güvenli

---

## ⚠️ Genel kural

👉 Modern JavaScript’te:

> **Her zaman `===` kullan**
> (`==` kullanma, özel bir sebep yoksa)

---

## 🎯 Özet

* `==` → “benzer mi?” (gevşek)
* `===` → “aynı mı?” (katı)

---

İstersen sana JavaScript’te **en tehlikeli `==` tuzaklarını** da gösterebilirim (gerçekten kafa karıştırıcı şeyler var).

---
---
---

### ***- bana js'te arrow function anlatır mısın?***

Arrow function (ok fonksiyonu), JavaScript’te fonksiyon yazmanın daha kısa ve daha “modern” bir yoludur. ES6 (ES2015) ile geldi.

---

## 1. Temel yazım

Normal fonksiyon:

```js
function topla(a, b) {
    return a + b;
}
```

Arrow function:

```js
const topla = (a, b) => {
    return a + b;
};
```

Daha kısa hali (tek satır):

```js
const topla = (a, b) => a + b;
```

👉 Eğer süslü parantez yoksa, `return` otomatik kabul edilir.

---

## 2. Tek parametre varsa

Parantez bile sadeleşebilir:

```js
const kare = x => x * x;
```

---

## 3. Parametre yoksa

Boş parantez zorunlu:

```js
const selamla = () => "Merhaba";
```

---

## 4. Arrow function vs normal function (en önemli fark)

### 1. `this` davranışı

Arrow function kendi `this`’ini oluşturmaz, dış scope’tan alır.

Normal function:

```js
const obj = {
    isim: "Ali",
    yaz: function() {
        console.log(this.isim);
    }
};
```

Arrow function:

```js
const obj = {
    isim: "Ali",
    yaz: () => {
        console.log(this.isim);
    }
};
```

⚠️ Burada `this.isim` genelde `undefined` olur çünkü arrow function `this` bağlamını “yakalamaz”, dışarıdan alır.

👉 Bu yüzden:

* Object methodlarında genelde **normal function**
* Callback / kısa işlemlerde **arrow function**

---

## 5. Callback kullanımında çok yaygın

```js
const sayilar = [1, 2, 3];

const kareler = sayilar.map(x => x * x);
```

Eski hali:

```js
const kareler = sayilar.map(function(x) {
    return x * x;
});
```

---

## 6. return vs süslü parantez farkı

```js
const f1 = x => x + 1;   // return var (implicit)

const f2 = x => {
    return x + 1;        // explicit return
};
```

⚠️ Şu yanlış:

```js
const f3 = x => {
    x + 1; // return yok → undefined döner
};
```

---

## 7. Ne zaman kullanmalısın?

✔ Kullan:

* map / filter / reduce
* kısa fonksiyonlar
* callback’ler
* event handler’lar (bazı durumlarda)

❌ Kullanma:

* object methodları (`this` önemliyse)
* constructor fonksiyonlar (`new` ile kullanılamaz)

---

## Özet

Arrow function = daha kısa fonksiyon yazımı + farklı `this` davranışı

```js
(a, b) => a + b
```

---

İstersen sana canvas oyunu için arrow function’ları nasıl “temiz kod” yapısına sokabileceğini de gösterebilirim (özellikle event + animation loop kısmı çok işine yarar).

---

### ***- farklı this davranışını anlamadım.***

Bu konu JavaScript’te en çok kafa karıştıran yerlerden biri, normal.

## Önce temel fikir: `this` ne?

`this`, “o anda fonksiyonu kim çağırıyorsa o” demektir.

Ama kritik nokta şu:

> **Arrow function kendi `this`’ini oluşturmaz. Dış ortamdan alır (lexical this).**

Normal function ise:

> **this’i çağrıldığı yere göre belirler.**

---

# 1. Normal function nasıl çalışır?

```js id="n1"
const kisi = {
    isim: "Ali",
    selamla: function () {
        console.log(this.isim);
    }
};

kisi.selamla();
```

### Çıktı:

```
Ali
```

### Neden?

Çünkü fonksiyonu çağıran şey `kisi`:

```js
kisi.selamla()
```

👉 Bu yüzden `this = kisi`

---

# 2. Arrow function olursa ne değişir?

```js id="n2"
const kisi = {
    isim: "Ali",
    selamla: () => {
        console.log(this.isim);
    }
};

kisi.selamla();
```

### Çıktı:

```
undefined
```

---

## Neden undefined?

Çünkü arrow function şunu yapar:

> “Benim kendi this’im yok. Dışarıdaki scope neyse onu kullanırım.”

Burada dış scope genelde:

* window (browser)
* veya undefined (strict mode)

👉 Yani `kisi` objesini **asla this olarak almaz**

---

# 3. Basit benzetme

### Normal function:

> “Beni kim çağırıyorsa, ben onun içindeyim.”

### Arrow function:

> “Ben bulunduğum ortamın parçasıyım, çağıran kim umrumda değil.”

---

# 4. Pratik örnek (daha net)

## setTimeout ile fark

### Normal function:

```js id="n3"
const kisi = {
    isim: "Ali",
    selamla: function () {
        setTimeout(function () {
            console.log(this.isim);
        }, 1000);
    }
};

kisi.selamla();
```

👉 Çıktı:

```
undefined
```

Çünkü `setTimeout` içindeki function artık global çalışır.

---

### Arrow function ile:

```js id="n4"
const kisi = {
    isim: "Ali",
    selamla: function () {
        setTimeout(() => {
            console.log(this.isim);
        }, 1000);
    }
};

kisi.selamla();
```

👉 Çıktı:

```
Ali
```

---

## Neden düzeldi?

Arrow function burada `this`’i **selamla() fonksiyonundan miras aldı**.

Yani:

```
selamla() → this = kisi
arrow function → aynı this'i kullanır
```

---

# 5. Kısa özet

| Özellik                | Normal function | Arrow function        |
| ---------------------- | --------------- | --------------------- |
| this                   | çağırana bağlı  | dış scope’tan gelir   |
| object method          | uygun           | riskli                |
| callback               | değişken        | çok uygun             |
| setTimeout içinde this | bozulabilir     | genelde doğru çalışır |

---

# 6. En önemli kural

👉 Eğer “this’i kontrol etmek istiyorsan”:

* Arrow function kullan

👉 Eğer “this çağırana göre değişsin istiyorsan”:

* Normal function kullan

---

İstersen sana bunu **canvas oyununda (örneğin tıklama event’i + oyuncu objesi)** üzerinden de gösterebilirim, orada çok net oturuyor.

---
---
---

```js
let oyunalani;
let slaytIndex = 0;
let metinIndex = 0;
let slide;
let metin;

let images = [
    "images/img0.png",
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png"
];

let metinler = [
  burada metinler var
];

function startGame() {
    oyunalani = {
        canvas: document.createElement("canvas"),
        start: function() {
            this.canvas.width = 1280;
            this.canvas.height = 720;
            this.context = this.canvas.getContext("2d");
            document.body.appendChild(this.canvas);

            this.canvas.addEventListener("click", nextMetin);
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    oyunalani.start();

    slide = new component(1280, 720, images[slaytIndex]);
    metin = ctx.fillText(metinler[metinIndex],10,80);
}

function component(width, height, src) {
    this.image = new Image();
    this.width = width;
    this.height = height;

    this.image.onload = () => {
        drawScene();
    };

    this.image.src = src;

    this.update = function() {
        let ctx = oyunalani.context;
        ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
}

function drawScene() {
    let ctx = oyunalani.context;

    oyunalani.clear();

    // arka plan
    slide.update();

    //textbox gelcek ben gradyan seçtim
    const grad=ctx.createLinearGradient(0,0,1280,0);
    grad.addColorStop(0, "#66c5f1");
    grad.addColorStop(1, "#ff95b5");
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(10,500,1260,210);
    ctx.globalAlpha = 1.0; // geri sıfırlıyosun opaklığı

    // yazı ayarları
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.font = "40px Gabriola";
    ctx.fillStyle = "white";

    // yazı
     wrapText(
        ctx,
        metinler[metinIndex],
        50,      // x
        550,     // y başlangıç
        1180,    // max genişlik (kutudan biraz küçük)
        45       // satır aralığı
    );
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;

        // taşma kontrolü
        if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, x, y);
            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
    
}

function nextMetin(){
    metinIndex++;

    if (metinIndex >= metinler.length) {
        console.log("Bitti");
        return;
    }

    if (metinIndex === 1) {
        slaytIndex = 1;
        slide = new component(1280, 720, images[slaytIndex]);
        return;
    }

    if (metinIndex === 3) {
        slaytIndex = 2;
        slide = new component(1280, 720, images[slaytIndex]);
        return;
    }

    if (metinIndex === 4) {
        slaytIndex = 0;
        slide = new component(1280, 720, images[slaytIndex]);
        return;
    }

    if (metinIndex === 6) {
        slaytIndex = 3;
        slide = new component(1280, 720, images[slaytIndex]);
        return;
    }

    if (metinIndex === 8) {
        slaytIndex = 4;
        slide = new component(1280, 720, images[slaytIndex]);
        return;
    }

    drawScene();
} 
```

### ***kodumun son hali bu oldu. Ama yazılarıma gölge efekti oluştururken gradyan dikdörtgenime de oluşturuyor... nasıl düzeltebilirim?***

Sorunun nedeni basit ama kritik:

> **Canvas’ta ayarlar “global state”tir.**
> Yani `ctx.shadowColor` gibi bir ayar yaptıysan, **sonraki çizilen HER şeye uygulanır** — sadece yazıya değil.

Bu yüzden:

* sen gölgeyi yazı için açıyorsun
* ama ondan sonra çizilen (veya bazen sıradaki) şeyler de etkileniyor

---

# ✅ En doğru çözüm: `save()` / `restore()`

Canvas’ta bunun için özel sistem var:

```js
ctx.save();
... ayarları değiştir ...
... çiz ...
ctx.restore();
```

→ ayarları geri alır

---

# 🔧 Senin koduna uygulayalım

## 🎯 textbox kısmını koru (gölge OLMASIN)

```js id="fix1"
const grad = ctx.createLinearGradient(0,0,1280,0);
grad.addColorStop(0, "#66c5f1");
grad.addColorStop(1, "#ff95b5");

ctx.fillStyle = grad;
ctx.globalAlpha = 0.7;
ctx.fillRect(10,500,1260,210);
ctx.globalAlpha = 1.0;
```

---

## 🎯 yazı kısmını izole et (gölge SADECE burada)

```js id="fix2"
ctx.save(); // 🔥 ayarları kaydet

ctx.shadowColor = "black";
ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 2;

ctx.font = "40px Gabriola";
ctx.fillStyle = "white";

wrapText(
    ctx,
    metinler[metinIndex],
    50,
    550,
    1180,
    45
);

ctx.restore(); // 🔥 ayarları geri al
```

---

# 🧠 Neden bu çalışıyor?

```text
save()   → mevcut ayarları sakla
restore()→ eski haline dön
```

Yani:

* shadow sadece yazıya uygulanır
* textbox etkilenmez

---

# ⚠️ Alternatif (ama önerilmez)

Manuel sıfırlamak:

```js id="alt1"
ctx.shadowColor = "transparent";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
```

Ama:

* unutması kolay
* hata yapmaya açık

👉 `save/restore` daha güvenli

---

# 🎯 Küçük bonus (daha güzel gölge)

İstersen daha VN hissi:

```js id="bonus1"
ctx.shadowColor = "rgba(0,0,0,0.8)";
ctx.shadowBlur = 4;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
```

---

# 🎯 Özet

✔ Canvas ayarları global
✔ Gölge tüm çizimleri etkiler
✔ `save()` / `restore()` ile izole edilir

---

İstersen bir sonraki adımda:

* yazıya stroke (outline)
* glow efekti

ekleyebiliriz.

---
---
---

### ***oyunun en başında görünen ilk slayta nasıl fade-in efekti ekleyebilirim? Sadece arkaplandaki resim fadein ile girecek. hatta direk böyle fadein fonksiyonu gibi bir şey olcak ki ben de istedigim slaytları fadein ile yapabileyim***

Bunu düzgün yapmak için tek ihtiyacın olan şey:
👉 **alpha (opaklık) değerini 0 → 1 arasında yavaş yavaş artırmak**

Yani “fade-in” aslında:

```text
alpha = 0 → 0.1 → 0.2 → ... → 1
```

---

# 🎯 1. GLOBAL DEĞİŞKENLER

En üste ekle:

```js
let fadeAlpha = 1;
let fadeAktif = false;
```

---

# 🎯 2. FADE-IN FONKSİYONU

Bunu koduna EKLE:

```js
function fadeInSlide() {
    fadeAlpha = 0;
    fadeAktif = true;

    let interval = setInterval(function() {
        fadeAlpha += 0.05; // hız (küçük = yavaş)

        if (fadeAlpha >= 1) {
            fadeAlpha = 1;
            fadeAktif = false;
            clearInterval(interval);
        }

        drawScene();
    }, 30); // 30ms → smooth
}
```

---

# 🎯 3. drawScene İÇİNDE KULLAN

Şu kısmı bul:

```js
slide.update();
```

---

## ✔ BUNUNLA DEĞİŞTİR:

```js
if (fadeAktif) {
    ctx.save();
    ctx.globalAlpha = fadeAlpha;
    slide.update();
    ctx.restore();
} else {
    slide.update();
}
```

---

# 🎯 4. NEREDE ÇAĞIRACAKSIN?

## ✔ İlk açılışta:

```js
slide = new component(...);
fadeInSlide(); // 🔥 BURAYA EKLE
```

---

## ✔ Slayt değişimlerinde:

Mesela:

```js
slide = new component(1280, 720, images[slaytIndex], 0, 0);
fadeInSlide();
```

---

# 🎯 SONUÇ

✔ sadece arkaplan fade-in olur
✔ textbox ve UI normal görünür
✔ istediğin yerde çağırırsın

---

# 🧠 Neden çalışıyor?

* `globalAlpha` → tüm çizimi saydam yapar
* biz sadece **slide çizilirken** değiştiriyoruz
* sonra `restore()` ile eski haline dönüyor

---

# ⚠️ İPUCU

Fade çok hızlıysa:

```js
fadeAlpha += 0.02;
```

Daha yavaş olur.

---

# 🎯 BONUS (daha profesyonel his)

İstersen easing ekleyebiliriz (VN tarzı yumuşak giriş):

```js
fadeAlpha += (1 - fadeAlpha) * 0.1;
```

Bu daha doğal görünür.

---

İstersen bir sonraki adımda:

* fade-out + fade-in (crossfade)
* sahne geçiş efekti
* zoom + fade kombinasyonu

yapabiliriz 👍

---
---
---

### ***setInterval bu fonksiyon nerden geldi bu nedir***

İyi ki sordun, çünkü bu önemli bir temel parça.

---

# 🎯 `setInterval` NEDİR?

```js
setInterval(...)
```

👉 JavaScript’in **kendi içinde hazır gelen (built-in)** bir fonksiyonudur.
Sen yazmadın, tarayıcı sağlıyor.

---

# 🧠 Ne yapar?

```text
Belirli bir süre aralığında bir kodu TEKRAR TEKRAR çalıştırır
```

---

# 🎯 SÖZDİZİMİ

```js
setInterval(function, süre_ms);
```

---

# 📌 Örnek

```js
setInterval(function() {
    console.log("çalıştı");
}, 1000);
```

👉 Ne olur?

```text
her 1000 ms (1 saniye) → "çalıştı" yazdırır
```

---

# 🎮 SENİN FADE KODUNDA NE YAPIYOR?

```js
let interval = setInterval(function() {
    fadeAlpha += 0.05;
    drawScene();
}, 30);
```

👉 Bu şu demek:

```text
Her 30 milisaniyede:
- alpha artır
- sahneyi yeniden çiz
```

---

# 🎯 SONUÇ

```text
çok hızlı tekrar → animasyon efekti
```

Yani aslında:

👉 Fade-in = küçük küçük artan çizimler

---

# 🛑 DURDURMAK (çok önemli)

```js
clearInterval(interval);
```

👉 bu olmazsa:

❌ sonsuza kadar çalışır
❌ performans düşer
❌ bug çıkar

---

# 🧠 setInterval vs setTimeout

| Fonksiyon   | Davranış       |
| ----------- | -------------- |
| setInterval | sürekli tekrar |
| setTimeout  | 1 kere çalışır |

---

# 🎯 Alternatif (daha profesyonel)

Oyunlarda genelde şu kullanılır:

```js
requestAnimationFrame()
```

Ama senin seviyen için:

👉 `setInterval` gayet doğru seçim 👍

---

# 🎯 Özet

```text
setInterval = belirli aralıklarla kod çalıştıran hazır JS fonksiyonu
```

---

İstersen bir sonraki adımda bunu:

* FPS mantığıyla
* gerçek game loop sistemine
* requestAnimationFrame’e

daha ileri seviyeye taşıyabiliriz.


---
---
---

## ***(Chatgpt çok yardımcı olamadı bu kez Gemini'a sordum)***

> buraya kodumun tamamını yapıştırdım aşırı uzun olacağı için buraya bir daha yapıştırmıyorum.
### ***kodum direk hiç çalışmıyor :( Nerede hata yapmış olabirim***

Olamaz, hiç panik yapma! Kodun çalışmamasının sebebi çok küçük birkaç yazım hatası ve değişkenlerin birbirini görmemesi (scope meselesi). Hemen nokta atışı düzeltmeleri yapalım.

### Neden çalışmıyor? (Hatalar şunlar):

1. **Scope Hatası:** `drawScene` içinde tanımladığın `let ctx = ...` değişkenini `drawVN` fonksiyonu göremiyor.
2. **Yazım Yanlışı (Typo):** `STATES` içinde `RITIM` tanımladın ama `drawScene` içinde `STATES.RHYTHM` diye çağırdın.
3. **Mantık Hatası:** `clickleme` fonksiyonunda `if(STATES === "RITIM")` demişsin. `STATES` bir objedir, "RITIM" ise bir değer. Oranın `currentGameState === STATES.RITIM` olması lazım.

İşte bu hataların düzeltilmiş hali. Aşağıdaki bölümleri kodunla değiştir:

---

### 1. drawScene ve drawVN Düzeltmesi

`ctx` değişkenini fonksiyonun dışına taşıyoruz ya da parametre olarak gönderiyoruz.

```javascript
function drawScene() {
    // Önce context'i alalım
    let ctx = oyunalani.context; 
    oyunalani.clear();

    if (currentGameState === STATES.VN1 || currentGameState === STATES.VN2) {
        drawVN(ctx); // ctx'i buraya parametre olarak gönderdik
    } else if (currentGameState === STATES.RITIM) { // RHYTHM değil RITIM olmalı
        drawRitim(ctx); 
    }
}

// drawVN artık dışarıdan ctx alıyor
function drawVN(ctx) { 
    ctx.save();
    ctx.globalAlpha = fadeAlpha;
    slide.update();
    ctx.restore();

    if (metinIndex < metinler.length) {
        const grad = ctx.createLinearGradient(0, 0, 1280, 0);
        grad.addColorStop(1, "#b370ff");
        grad.addColorStop(0, "#ffaa65");
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(10, 510, 1260, 200);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeRect(9, 510, 1260, 200);
        ctx.globalAlpha = 1.0;

        ctx.save();
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 9;
        ctx.fillStyle = "white";

        let text = metinler[metinIndex];
        if (text.startsWith("*")) {
            ctx.font = "italic bold 40px Gabriola";
            text = text.slice(1);
        } else {
            ctx.font = "bold 40px Gabriola";
        }

        wrapText(ctx, text, 50, 570, 1180, 45);
        ctx.restore();

        if (skipHover) ctx.globalAlpha = 1;
        else ctx.globalAlpha = 0.7;

        skip.update();
        ctx.globalAlpha = 1;
    }
}

```

---

### 2. clickleme Fonksiyonu Düzeltmesi

`STATES` objesi ile `currentGameState` değişkenini doğru karşılaştırmalıyız.

```javascript
function clickleme(event) {
    let rect = oyunalani.canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    // Ritim oyunundayken VN tıklamalarını engelle
    if (currentGameState === STATES.RITIM) return; 

    if (!muzikBasladiMi) {
        girisMuzik.currentTime = 0;
        girisMuzik.loop = true;
        girisMuzik.play();
        muzikBasladiMi = true;
    }

    // skip butonu kontrolü
    if (skipAktif &&
        mouseX >= skip.x &&
        mouseX <= skip.x + skip.width &&
        mouseY >= skip.y &&
        mouseY <= skip.y + skip.height) {
        
        girisMuzik.pause();
        odaMuzik.pause();
        meltdown.pause();
        skipSound.currentTime = 0;
        skipSound.play();

        metinIndex = metinler.length;
        nextMetin();
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play();
    nextMetin();
}

```

---

### 3. Küçük Bir İpucu (Görsellerin Yüklenmesi)

`component` fonksiyonu içinde `drawScene()` çağırıyorsun ama `component` nesnesi yaratıldığında bazen `currentGameState` henüz çizime hazır olmayabilir. `startGame` fonksiyonunun sonuna bir tane `drawScene()` eklemek işini garantiye alır.

### Özetle ne değişti?

1. `drawScene` içindeki `ctx`'i `drawVN(ctx)` şeklinde diğer fonksiyona pasladık.
2. `STATES.RHYTHM` yazan yeri `STATES.RITIM` olarak düzelttik (tanımınla eşleşti).
3. `clickleme` içindeki durum kontrolünü düzelttik.

Şimdi tekrar dene, her şeyin yerli yerine oturmuş olması lazım! Bir hata alırsan tarayıcıda `F12`'ye basıp **Console** sekmesinde ne yazdığını bana gönderirsen anında çözeriz.

VN 2 kısmına geçtiğinde her şeyin sıfırlandığından emin olmak için `finishRitim` fonksiyonunu da bir kontrol etmeyi unutma!

---
---
---

### ***A tamam düzeldi teşekkür ederim ^^ Tek bir sorun kalmış o da VN1'in son kısmı. Fadeout fonksiyonunu çağırarak kararma efekti yapmıştım ama görünüşe bakılırsa düzgün çalışmıyor. Siyah ekran oluyor ama fade efektiyle olmuyor.***

Rica ederim, düzeldiğine çok sevindim! Bu "aniden siyah ekran olma" sorunu aslında kodun **çok hızlı** çalışmasından kaynaklanıyor.

### Sorun Neden Kaynaklanıyor?

`nextMetin` fonksiyonunun içinde şu iki satırı arka arkaya yazmıştık:

1. `fadeOutSlide();` (Kararmayı başlat)
2. `startRitim();` (Ritim oyununa geç)

Bilgisayar o kadar hızlıdır ki, `fadeOutSlide` fonksiyonundaki ilk kareyi bile çizemeden `startRitim` fonksiyonuna geçer. `startRitim` fonksiyonu da `currentGameState` değişkenini `STATES.RITIM` yapar. Bu sefer `drawScene` artık `drawVN`'yi değil, `drawRitim`'i çizmeye çalışır. Ritim kısmın henüz boş olduğu için de karşında koca bir siyah ekran bulursun.

### Çözüm: Callback (Geri Çağırma) Kullanmak

`fadeOutSlide` bittiğinde "Tamam bittim, şimdi ne yapayım?" diye sormasını sağlamalıyız. Bunun için fonksiyonuna bir **callback** (işi bitince çalışacak fonksiyon) ekleyelim.

İşte düzeltmen gereken kısımlar:

#### 1. fadeOutSlide Fonksiyonunu Güncelle

Fonksiyonun içine bir `callback` parametresi ekle ve `clearInterval` olduktan sonra bu fonksiyonu çağır.

```javascript
function fadeOutSlide(callback) { // callback parametresi ekledik
    fadeAlpha = 1;
    fadeAktif = true;

    let interval = setInterval(function() {
        fadeAlpha -= 0.05; // 0.15 çok hızlıydı, 0.05 ile daha yumuşak olur

        if (fadeAlpha <= 0) {
            fadeAlpha = 0;
            fadeAktif = false;
            clearInterval(interval);
            
            // Eğer bir sonraki adım tanımlıysa onu çalıştır
            if (callback) {
                callback();
            }
        }

        drawScene();
    }, 30);
}

```

#### 2. nextMetin Fonksiyonunu Güncelle

Burada `startRitim()`'i direkt çağırmak yerine, `fadeOutSlide`'ın içine bir görev olarak veriyoruz.

```javascript
if (metinIndex >= metinler.length) { 
    if (currentGameState === STATES.VN1) {
        meltdown.pause();
        skipAktif = false;
        
        // startRitim'i hemen çağırma, fade bitince çalışması için içeri yolla
        fadeOutSlide(startRitim); 
        return;
    } 
    // ... diğer kodların
}

```

#### 3. Küçük Bir Bonus: fadeInSlide

Aynı mantığı `fadeInSlide` için de yaparsan, yeni bir sahneye girerken önce sahnenin yüklenmesini bekleyip sonra görüntüyü yavaşça açabilirsin.

---

### Dikkat Etmen Gereken Bir Nokta

`drawVN` içinde metin kutusunu çizerken `ctx.globalAlpha = 0.7;` gibi sabit değerler vermişsin. Eğer tüm ekranın kararmasını istiyorsan, o kısımları da `fadeAlpha` ile çarpmalısın:

> **Örnek:** `ctx.globalAlpha = 0.7 * fadeAlpha;`

Bu sayede sadece arka plan değil, metin kutusu ve yazıların da beraberce karardığı çok daha profesyonel bir efekt elde edersin.

Şimdi bu değişikliği yapıp tekrar dener misin?

---
---
---

### ***peki fadeOutSlide(startRitim); derken neden fadeOutSlide(startRitim()); demiyoruz? Parantezler neden olmaz? Ayrıca, callback nedir ve javascript'te kullanımı nedir? İlk kez duyuyorum***

Harika bir soru! Aslında programlamaya yeni başlayan hemen herkesin kafasını karıştıran o meşhur "Parantez koysam ne olur, koymasam ne olur?" ikilemine gelmişsin. Bu ayrımı anlamak, JavaScript'in mantığını kavramak demektir.

Hadi tane tane açıklayalım:

### 1. Neden `startRitim` ama `startRitim()` değil?

JavaScript'te bir fonksiyonun adının yanına parantez koyarsan, o fonksiyonu **"Hemen şimdi çalıştır!"** demiş olursun.

* **`startRitim()` (Parantezli):** Fonksiyonun içindeki kodlar o satıra gelindiği anda yürütülür ve fonksiyonun ürettiği **sonuç** (return değeri) neyse o gönderilir.
* **`startRitim` (Parantezsiz):** Fonksiyonu çalıştırmazsın, sadece fonksiyonun **kendisinin ne olduğunu** (tarifini/referansını) paketleyip bir yere gönderirsin.

**Senaryoyu hayal et:**
`fadeOutSlide(startRitim());` dersen; bilgisayar önce `startRitim`'i çalıştırır (oyun aniden başlar), sonra ondan dönen sonucu (genelde hiçbir şeydir) `fadeOutSlide`'a gönderir. Ama biz kararma bitene kadar oyunun başlamasını **beklemesini** istiyoruz.

Bu yüzden parantez koymuyoruz ki; `fadeOutSlide` fonksiyonu kararma bittiğinde o paketi açsın ve içindeki `startRitim` komutunu **kendi içinde** çalıştırsın.

---

### 2. Callback Nedir?

**Callback (Geri Çağırma)**, basitçe bir fonksiyona "işin bittiğinde şu fonksiyonu da çalıştır" diye verdiğin bir görev listesidir.

Günlük hayattan bir örnekle açıklayalım:

> Bir restorana gittin (Fonksiyon: `yemekSiparisEt`). Garsona dedin ki: "Yemek piştiğinde (İş bittiğinde), lütfen bana haber ver (Callback: `beniUyar`)."

Garson yemeği sipariş eder etmez masana gelip "Yemek bitti!" demez. Önce mutfağa gider, yemek pişer, her şey hazır olduğunda senin ona verdiğin "beni uyar" görevini yerine getirir.

---

### 3. JavaScript'te Callback Kullanımı

JavaScript "asenkron" bir dildir. Yani bazı işlerin (animasyonlar, müzik yükleme, internetten veri çekme) bitmesi zaman alır. Kodun bu işleri bekleyip donmaması için callback'ler kullanılır.

Kodundaki yapı üzerinden görelim:

```javascript
// 1. Fonksiyonu tanımlarken bir 'görev' (callback) alacağını söylüyoruz
function fadeOutSlide(callback) { 
    // ... kararma işlemleri (zaman alan kısım) ...
    
    if (fadeAlpha <= 0) {
        clearInterval(interval);
        
        // 2. İşimiz bitti! Şimdi bize verilen görevi yapma zamanı:
        if (callback) {
            callback(); // İşte burada parantez koyarak çalıştırıyoruz!
        }
    }
}

// 3. Kullanırken sadece ismini veriyoruz (tarifini gönderiyoruz)
fadeOutSlide(startRitim);

```

### Özetle Fark Şudur:

| Yazım Şekli | Anlamı | Ne Zaman Kullanılır? |
| --- | --- | --- |
| `fonksiyon()` | "Bu işi **şimdi** yap." | Bir değeri hesaplamak veya bir eylemi anında başlatmak için. |
| `fonksiyon` | "Bu işin **nasıl yapılacağını** öğren, sonra lazım olunca yaparsın." | Callback olarak bir fonksiyona görev verirken. |

Bu mantık sadece oyunlarda değil; butona tıklama (`addEventListener`), internetten dosya indirme gibi her yerde karşına çıkacak. İlk başta kafa karıştırması çok normal ama bir kez mantığını kaptığında JavaScript'te çok daha karmaşık sistemler kurabileceksin!

Sence bu mantık oturdu mu, yoksa bir örnek daha yapalım mı?

---
---
---

### ***neden her şeyde interval kullanıyoruz? Daha önce C öğrendim ben mesela neden for kullanmıyoruz hiç?***

C geçmişinden gelince bu durumun kafa karıştırması çok doğal! C'de yazdığın programlar genelde yukarıdan aşağıya doğru birer kez çalışır ve biter (eğer `while(1)` gibi bir döngü kurmadıysan). Ancak oyunlar ve modern kullanıcı arayüzleri **"Event Loop" (Olay Döngüsü)** mantığıyla çalışır.

İşte neden `for` yerine `setInterval` veya `requestAnimationFrame` kullandığımızın temel sebepleri:

### 1. Bloklama Sorunu (Blocking)

C'de bir `for` döngüsü yazdığında, bilgisayar o döngü bitene kadar sonraki satıra geçmez. JavaScript'te (tarayıcıda) her şey **tek bir iş parçacığında (Single Thread)** çalışır.

* **Eğer `for` kullanırsan:** Diyelim ki 1000 karelik bir animasyon için `for` yazdın. JavaScript o 1000 kareyi milisaniyeler içinde hesaplayıp bitirmeye çalışır. Bu sırada tarayıcı "donar". Kullanıcı ekrana tıklayamaz, mouse hareket etmez, sayfa yanıt vermez. Çünkü döngü bitmeden tarayıcıya "ekranı güncelle" emri gitmez.
* **Eğer `Interval` kullanırsan:** JavaScript bir kare çizer, sonra işi tarayıcıya devreder. Tarayıcı o sırada tıklamaları kontrol eder, ekranı boyar ve zamanı gelince (örneğin 16ms sonra) bir sonraki kare için tekrar senin kodunu çağırır.

### 2. Zamanlama Kontrolü

C'de bir döngünün ne kadar hızlı çalışacağı işlemcinin hızına bağlıdır. Çok hızlı bir bilgisayarda oyunun karakteri ışık hızında giderken, eski bir bilgisayarda kaplumbağa gibi gidebilir.

* `setInterval(draw, 16)` diyerek biz aslında şunu diyoruz: "Hangi bilgisayar olursa olsun, bu fonksiyonu kabaca her 16 milisaniyede bir (60 FPS) çalıştır." Bu, oyunun hızını sabitlememizi sağlar.

### 3. JavaScript'in "Asenkron" Doğası

JavaScript'te çoğu şey (görüntülerin yüklenmesi, müzik çalması, bir butona basılması) senin kodunun akışından bağımsız gelişir.

* `for` döngüsü "şimdi ve hemen" demektir.
* `Interval` veya `Callback` yapıları ise **"Bekle ve zamanı gelince/olay olunca yap"** demektir.

### Bir Örnekle Kıyaslayalım:

**C Mantığı (Yanlış Yaklaşım):**

```javascript
// Bu kod çalışırsa ekran donar ve sadece son kareyi görürsün
for(let i = 0; i < 100; i++) {
    karakter.x += 1;
    drawScene(); // Tarayıcı bunu ekrana yansıtmak için vakt bulamaz
}

```

**JavaScript Mantığı (Doğru Yaklaşım):**

```javascript
// Her 20ms'de bir küçük bir adım at, aralarda tarayıcı nefes alsın
setInterval(() => {
    karakter.x += 1;
    drawScene(); // Her adımda ekran güncellenir, akıcı bir animasyon olur
}, 20);

```

### Özetle

C'deki `while(1)` döngüsü oyunun kalbidir; JavaScript'te bu kalbin atışlarını `Interval` veya profesyonel projelerde daha çok tercih edilen **`requestAnimationFrame`** sağlar.

`requestAnimationFrame`, ekranın yenilenme hızıyla (genelde 60Hz) senkronize çalıştığı için çok daha pürüzsüz sonuçlar verir. Ritim oyununun asıl nota düşme kısmında belki buna geçeriz, ne dersin?

---
---
---

### ***Oyunumda kullandığım yazı tipleri her oyuncunun bilgisayarında olmayabilir. Bu sorunu nasıl halledebilirim? Kullandığım yazı tipleri hatırladığım kadarıyla şunlar: Gabriola, Ink Free, Lucida Console, Bradley Hand ITC***

Sorduğun soru çok kritik; çünkü dediğin gibi, eğer oyuncunun bilgisayarında "Ink Free" yüklü değilse, tarayıcı gider en sıkıcı "Arial" veya "Times New Roman"ı seçer ve bütün o tatlı tasarımın mahvolur.

Bunu çözmenin yolu **@font-face** kullanarak yazı tiplerini oyunun içine "gömmektir" (embed). İşte adım adım yapman gerekenler:

### 1. Yazı Tipi Dosyalarını Bul

Kullandığın yazı tiplerinin `.ttf` veya `.otf` dosyalarını bilgisayarında bulman lazım (Genellikle Windows'ta `C:\Windows\Fonts` klasöründedirler). Bu dosyaları projenin içindeki bir klasöre koy (örneğin: `/fonts/` klasörü).

### 2. CSS ile Tanımlama Yap

HTML dosyanın `<head>` kısmına veya harici bir CSS dosyasına şu kodları ekle. Bu kod, tarayıcıya "Eğer bu yazı tipini bulamazsan, benim verdiğim şu dosyayı kullan" der:

```css
<style>
    @font-face {
        font-family: 'Gabriola';
        src: url('fonts/Gabriola.ttf');
    }

    @font-face {
        font-family: 'Ink Free';
        src: url('fonts/InkFree.ttf');
    }

    @font-face {
        font-family: 'Bradley Hand ITC';
        src: url('fonts/BradleyHand.ttf');
    }
    
    /* Lucida Console genellikle her sistemde vardır ama garanti olsun dersen onu da ekleyebilirsin */
</style>

```

### 3. Canvas İçin Çok Önemli Bir Püf Noktası: Preloading (Ön Yükleme)

Canvas'ta şöyle bir sorun vardır: Yazı tipi dosyası tam yüklenmeden `fillText` çalışırsa, yazı tipi görünmez. Bunu engellemenin en basit yolu, HTML içinde görünmez bir yerde bu fontu bir kez kullanmaktır:

```html
<div style="font-family: 'Gabriola'; visibility: hidden; position: absolute;">.</div>
<div style="font-family: 'Ink Free'; visibility: hidden; position: absolute;">.</div>
<div style="font-family: 'Bradley Hand ITC'; visibility: hidden; position: absolute;">.</div>

```

### 4. Alternatif: Google Fonts (Daha Kolay)

Eğer Bradley Hand veya Ink Free'ye çok benzeyen yazı tiplerini **Google Fonts** üzerinde bulursan, hiçbir dosya yüklemeden sadece bir linkle de halledebilirsin. Ama senin özel çizimlerine ve tarzına bu sistem fontları çok yakışmış, o yüzden dosya olarak eklemek en iyisi olacaktır.

### Küçük Bir Uyarı ⚠️

Font dosyalarını eklerken dosya isimlerindeki boşluklara dikkat et. Örneğin dosya adı `Ink Free.ttf` ise CSS içinde `url('fonts/Ink Free.ttf')` şeklinde yazmalısın.
