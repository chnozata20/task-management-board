export const tr = {
  common: {
    create: 'Oluştur',
    update: 'Güncelle',
    delete: 'Sil',
    cancel: 'İptal',
    save: 'Kaydet',
    close: 'Kapat',
    confirm: 'Onayla',
    allUsers: 'Tüm Kullanıcılar',
    search: 'Görev ara...',
    filters: 'Filtreler',
  },
  dialog: {
    confirmTitle: 'Emin misiniz?',
    confirmMessage: 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?'
  },
  task: {
    new: 'Yeni Görev',
    edit: 'Görevi Düzenle',
    title: 'Başlık',
    description: 'Açıklama',
    assignee: 'Atanan Kişi',
    startDate: 'Başlangıç Tarihi',
    endDate: 'Bitiş Tarihi',
    storyPoints: 'Hikaye Puanı',
    deleteConfirm: 'Bu görevi silmek istediğinizden emin misiniz?',
    status: 'Durum',
    priority: {
      title: 'Öncelik',
      HIGH: 'Yüksek',
      MEDIUM: 'Orta',
      LOW: 'Düşük'
    }
  },
  status: {
    open: 'Açık',
    inProgress: 'Devam Ediyor',
    inReview: 'İncelemede',
    done: 'Tamamlandı'
  },
  columnTitles: {
    OPEN: 'Açık',
    IN_PROGRESS: 'Devam Ediyor',
    IN_REVIEW: 'İncelemede',
    DONE: 'Tamamlandı'
  },
  home: {
    title: 'Görev Yönetimi',
    description: 'Görevlerinizi kolayca yönetin',
    goToBoard: 'Panoya Git',
    learnMore: 'Daha Fazla Bilgi',
    features: {
      teamManagement: {
        title: 'Takım Yönetimi',
        description: 'Takımınızı etkili bir şekilde yönetin'
      },
      taskTracking: {
        title: 'Görev Takibi',
        description: 'Görevlerinizi gerçek zamanlı takip edin'
      },
      statistics: {
        title: 'İstatistikler',
        description: 'Detaylı proje istatistiklerini görüntüleyin'
      }
    }
  },
  board: {
    dropHere: 'Buraya bırak',
    taskCount: 'Görev Sayısı',
    storyPoints: 'Hikaye Puanı',
    projectStats: 'Proje İstatistikleri',
    totalTasks: 'Toplam Görev',
    totalPoints: 'Toplam Puan',
    progress: 'İlerleme',
    newTask: 'Yeni Görev',
    addTask: 'Görev Ekle'
  },
  shortcuts: {
    title: 'Klavye Kısayolları',
    newTask: 'Yeni görev oluştur',
    newUser: 'Yeni kullanıcı oluştur',
    closeModal: 'Modalı kapat'
  },
  export: {
    button: 'Dışa Aktar',
    json: 'JSON olarak dışa aktar',
    excel: 'Excel olarak dışa aktar',
    pdf: 'PDF olarak dışa aktar'
  },
  tooltip: {
    show: "İpuçlarını Göster",
    hide: "İpuçlarını Gizle",
    enabled: "İpuçları Açık",
    disabled: "İpuçları Kapalı"
  },
  tour: {
    back: "Geri",
    close: "Kapat",
    finish: "Bitir",
    next: "İleri",
    skip: "Geç",
    start: "Turu Başlat",
    steps: {
      board: 'Görev panonuz. Tüm görevlerinizi burada yönetebilirsiniz.',
      newTask: 'Yeni görev eklemek için bu butonu kullanın. Kısayol: Ctrl/Cmd + N',
      userAvatars: 'Ekip üyeleriniz burada görünür. Yeni üye ekleyebilir veya mevcut üyeleri düzenleyebilirsiniz.',
      searchBar: 'Görevleri başlık veya açıklamalarına göre arayabilirsiniz.',
      columnOpen: 'Yeni eklenen görevler "Open" sütununda başlar.',
      columnInProgress: 'Üzerinde çalışılan görevler "In Progress" sütununa taşınır.',
      columnInReview: 'Tamamlanan görevler inceleme için "In Review" sütununa alınır.',
      columnDone: 'Onaylanan görevler "Done" sütununa taşınır.',
      tooltipToggle: 'İpuçlarını bu buton ile açıp kapatabilirsiniz.',
      themeSwitch: 'Karanlık/Aydınlık tema tercihini buradan değiştirebilirsiniz.',
      languageSwitch: 'Dil seçiminizi buradan yapabilirsiniz.',
      exportMenu: 'Görevlerinizi farklı formatlarda dışa aktarabilirsiniz.',
      boardStats: 'Görev ve kullanıcı istatistiklerini buradan takip edebilirsiniz.'
    }
  },
  tags: {
    title: "Etiketler",
    Bug: "Hata",
    Feature: "Özellik",
    Documentation: "Dokümantasyon",
    Enhancement: "İyileştirme",
    Design: "Tasarım"
  }
} as const; 