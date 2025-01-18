# Task Management Board

Modern ve kullanıcı dostu bir görev yönetim uygulaması.

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

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
