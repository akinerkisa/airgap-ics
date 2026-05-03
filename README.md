# Air-Gap OT/ICS Güvenlik Simülasyonu

## Projenin Amacı
Bu proje, internetten izole (air-gap) kabul edilen OT/ICS ortamlarda fiziksel erişim, USB/HID sınıfı cihazlar, bakım süreçleri ve mühendislik istasyonu üzerinden oluşabilecek riskleri eğitim amaçlı olarak simüle eder.

Bu bir güvenlik farkındalık uygulamasıdır; saldırı tekniği öğretmez ve gerçek sistemde etkide bulunmaz.

## Kurulum
```bash
npm install
npm run dev
```

## Güvenlik Sınırları
- Gerçek USB erişimi yoktur.
- Gerçek zararlı yazılım yoktur.
- Gerçek PLC/ICS bağlantısı yoktur.
- Tüm olaylar simülasyondur.

## Eğitimde Nasıl Kullanılır
- Eğitmen uygulamayı projeksiyonda adım adım ilerleterek kullanabilir.
- Katılımcılar grup halinde müdahale kararlarını tartışabilir.
- Her aşamada risk seviyesi ve savunma kontrolleri değerlendirilebilir.

## Senaryo Özeti
1. Bakım personeli tesise girer.
2. USB/HID cihaz bağlantı olayı simülasyon içinde tetiklenir.
3. Mühendislik yazılımında beklenmeyen değişiklik uyarısı oluşur.
4. HMI normal görünmeye devam eder.
5. Bağımsız sensörlerde anormallikler ortaya çıkar.
6. OT olay müdahalesi kararı verilir.
7. İzolasyon adımları uygulanır.
8. Olay raporu oluşturulur.

## payload-sim.txt Ne Yapar?
`payload-sim.txt`, simülasyon için hazırlanmış bir klavye enjeksiyonu (HID/DuckyScript-benzeri) örnek akışıdır.

- Tarayıcıda yerel demo adresini (`http://127.0.0.1:5173`) açar.
- `F8` ile demoyu başlatır.
- Ardışık `F9` tuşlarıyla senaryoyu adım adım ilerletir.

Bu dosya gerçek sisteme saldırı içermez; yalnızca eğitim ortamında simülasyon akışını otomatik tetiklemek için kullanılır.

## Not
Amaç saldırıyı göstermek değil, savunma kontrollerini anlamaktır.
