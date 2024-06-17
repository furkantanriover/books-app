# Books App

Books App, kullanıcıların Google Books API'ını kullanarak kitapları aramasına, kitap detaylarını görüntülemesine ve sepetlerine kitap eklemelerine olanak tanıyan bir web uygulamasıdır. Bu uygulama aynı zamanda çoklu dil desteği ve karanlık/aydınlık mod gibi özellikler de sunar.

## Proje Özellikleri

- **Kitap Arama ve Listeleme**: Google Books API kullanılarak kitap arama ve listeleme.
- **Kitap Detayları**: Kitapların detay sayfasını görüntüleme.
- **Sepete Ekleme ve Yönetim**: Kitapları sepete ekleme, miktarını artırma/azaltma ve sepetten çıkarma.
- **Ödeme Modalı**: Sepetteki kitaplar için ödeme yapma imkanı.
- **Çoklu Dil Desteği**: Kullanıcı arayüzü için çoklu dil desteği (i18next kullanılarak).
- **Karanlık/Aydınlık Mod**: Kullanıcı tercihlerine göre karanlık veya aydınlık moda geçiş.
- **Yükleme Animasyonları**: Sayfalar ve bileşenler arasında yükleme animasyonları.
- **Responsive Tasarım**: Mobil ve masaüstü cihazlar için optimize edilmiş kullanıcı arayüzü.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için.
- **TypeScript**: Tip güvenliğini sağlamak için.
- **React Router**: Sayfa yönlendirmeleri ve rota yönetimi için.
- **Zustand**: Global state management için.
- **TanStack Query (React Query)**: Veri getirme, önbellekleme ve güncelleme için.
- **i18next**: Uluslararasılaştırma (i18n) için.
- **Tailwind CSS**: Hızlı ve kolay stil verme için.
- **Framer Motion**: Animasyonlar için.
- **React Hook Form**: Form yönetimi için.
- **Zod**: Form doğrulama için.
- **React Toastify**: Kullanıcıya bilgi mesajları göstermek için.
- **Axios**: HTTP istekleri yapmak için.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gerekli Bağımlılıkların Yüklenmesi

Öncelikle gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

### Geliştirme Sunucusunu Başlatma

Uygulamayı yerel ortamda çalıştırmak için:

```bash
npm start
```

### Geliştirme Sunucusunu Başlatma

Uygulamayı yerel ortamda çalıştırmak için:

```bash
npm start
```
Bu komut, uygulamanın geliştirme sunucusunu başlatacak ve tarayıcınızda http://localhost:3000 adresinde açacaktır.

### Üretim İçin Derleme


Uygulamayı üretim için derlemek için:

```bash
npm run build
```
Bu komut, uygulamayı build klasörüne derler.
