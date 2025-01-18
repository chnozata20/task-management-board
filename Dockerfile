# Base image - Build aşaması
FROM node:20-alpine AS builder

# Güvenlik için root olmayan kullanıcı oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Çalışma dizinini ayarla
WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Kaynak kodları kopyala
COPY . .

# Uygulamayı derle
RUN npm run build

# Üretim aşaması
FROM node:20-alpine AS runner

# Güvenlik için root olmayan kullanıcı oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Sadece gerekli dosyaları kopyala
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ortam değişkenlerini ayarla
ENV NODE_ENV=production
ENV PORT=3000

# Root olmayan kullanıcıya geç
USER nextjs

# Portu dışarı aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "server.js"] 