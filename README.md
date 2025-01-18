# Task Management Board

Modern ve kullanıcı dostu bir görev yönetim uygulaması.

## 🌐 Demo
Canlı demo için: [http://16.170.229.196/](http://16.170.229.196/)

## 🚀 Özellikler

### 📋 Görev Yönetimi
- Sürükle & Bırak ile kolay görev taşıma
- Görevler için detaylı bilgi (başlık, açıklama, atanan kişi, başlangıç/bitiş tarihi)
- Görev önceliklendirme (Yüksek, Orta, Düşük)
- Görev etiketleri (Bug, Feature, Enhancement, Documentation, Design)
- Story point değerlendirme sistemi
- Görev durumunu hızlıca değiştirme
- Toplu görev düzenleme

### 👥 Kullanıcı Yönetimi
- Kullanıcı ekleme/düzenleme/silme
- Kullanıcı avatarları
- Görevlere kullanıcı atama
- Kullanıcı rollerini yönetme
- Kullanıcı aktivite geçmişi

### 📊 Board Özellikleri
- 4 farklı durum sütunu (Open, In Progress, In Review, Done)
- Sütunlarda görev limiti ve scroll özelliği
- Görev filtreleme ve arama
- Atanan kişiye göre filtreleme
- Sütun başlıklarını özelleştirme
- Sütun renklerini özelleştirme
- Görev sayısı göstergeleri

### 🎨 Arayüz Özellikleri
- Modern ve temiz tasarım
- Karanlık/Aydınlık tema desteği
- Duyarlı (responsive) tasarım
- İpuçları (tooltips) ile kolay kullanım
- İpuçlarını açma/kapama özelliği
- Özelleştirilmiş scrollbar tasarımı
- Etkileşimli tur rehberi
- Gelişmiş animasyonlar
- Mini-map görünümü

### 🌐 Dil Desteği
- Çoklu dil desteği
- Türkçe/İngilizce dil seçeneği
- Kolay dil değiştirme
- Otomatik dil algılama
- RTL desteği

### ⌨️ Klavye Kısayolları
- Yeni görev ekleme (Ctrl/Cmd + N)
- Yeni kullanıcı ekleme (Ctrl/Cmd + U)
- Modal pencereleri kapatma (Esc)

### 📤 Dışa Aktarma Özellikleri
- JSON formatında dışa aktarma
- Excel (CSV) formatında dışa aktarma
- PDF olarak yazdırma/dışa aktarma

### 📊 İstatistikler
- Görev durumlarına göre dağılım
- Kullanıcı bazlı görev dağılımı
- Öncelik seviyelerine göre dağılım
- Gerçek zamanlı metrikler
- Performans göstergeleri
- Sprint istatistikleri
- Burndown grafikleri

### 🔍 Arama ve Filtreleme
- Görev başlığı ve açıklamasında arama
- Atanan kişiye göre filtreleme
- Etiketlere göre filtreleme
- Gelişmiş arama operatörleri
- Arama geçmişi
- Kayıtlı filtreler
- Hızlı filtre önerileri

### 🎯 Erişilebilirlik
- ARIA etiketleri ile erişilebilirlik desteği
- Klavye navigasyonu
- Yüksek kontrast renk şeması

## 🛠️ Teknik Özellikler
- Next.js 14 ile geliştirilmiş
- TypeScript ile tip güvenliği
- Tailwind CSS ile modern tasarım
- Context API ile state yönetimi
- Drag & Drop için @hello-pangea/dnd
- Test için data-testid attribute'ları

## 🔜 Planlanan Özellikler
- Görev yorumları
- Görev geçmişi
- Alt görevler
- Kanban görünümü
- Timeline görünümü
- Görev önceliklendirme matrisi
- Ekip görünümü
- Sprint planlama
- Bildirimler
- Takvim entegrasyonu

## 💻 Kurulum

### Yerel Geliştirme
1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/task-management-board.git
cd task-management-board
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda açın:
```
http://localhost:3000
```

### 🐳 Docker ile Kurulum

#### Yerel Ortamda Docker ile Çalıştırma
1. Docker image'ını oluşturun:
```bash
docker build -t task-management-board .
```

2. Container'ı çalıştırın:
```bash
docker-compose up -d
```

3. Uygulamaya erişin:
```
http://localhost:3000
```

#### Production Ortamında Çalıştırma
1. Docker Hub'dan image'ı çekin:
```bash
docker pull chnozatax/task-management-board:latest
```

2. Production yapılandırma dosyalarını hazırlayın:
```bash
# .env dosyası oluşturun
echo "DOCKER_HUB_USERNAME=chnozatax" > .env

# docker-compose.prod.yml ve nginx.conf dosyalarını kopyalayın
```

3. Uygulamayı başlatın:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

4. Logları kontrol edin:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

#### Docker Komutları
```bash
# Container'ları görüntüle
docker ps

# Container loglarını görüntüle
docker logs task-management-board

# Container'ı durdur
docker-compose down

# Image'ları güncelle
docker-compose pull
docker-compose up -d

# Tüm container ve image'ları temizle
docker system prune -a
```

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## �� Güvenlik Önlemleri

Uygulama, çeşitli güvenlik önlemleri içermektedir:

### Middleware Güvenlik Katmanı
- **Helmet**: Temel güvenlik başlıklarını otomatik olarak ekler
  - XSS koruması
  - Content Security Policy (CSP)
  - HSTS (HTTP Strict Transport Security)
  - Clickjacking koruması
  - ve diğer güvenlik başlıkları

- **Rate Limiting**: API isteklerini sınırlandırarak DDoS saldırılarına karşı koruma
  - Her IP için dakikada maksimum 100 istek
  - Limit aşıldığında 429 (Too Many Requests) hatası

- **CORS (Cross-Origin Resource Sharing)**:
  - Sadece güvenilir domainlerden gelen isteklere izin verir
  - Özel CORS politikası ile güvenli cross-origin iletişimi

- **Request Validation**:
  - Gelen isteklerin boyut sınırlaması (10mb)
  - JSON body parsing güvenliği
  - Input sanitization

### Diğer Güvenlik Önlemleri
- Docker container'ları non-root kullanıcı ile çalışır
- Hassas bilgiler environment variable'lar ile yönetilir
- Düzenli güvenlik güncellemeleri
