# ✦ Alex Creates — сайт-портфолио digital creator

Современный одностраничный сайт-портфолио для фрилансера и digital creator.
Тёмная тема, живые анимации, кастомный курсор и **много готовых слотов под медиа**
(вертикальные ролики 9:16, видео 16:9, фото 1:1 и 4:5, backstage, скринкасты).

Без сборки и зависимостей — чистый HTML / CSS / JS. Просто открой `index.html`.

---

## 🚀 Как запустить

**Вариант 1 — просто открыть файл.** Дважды кликни по `index.html`.

**Вариант 2 — локальный сервер** (рекомендуется, чтобы корректно работали шрифты и медиа):

```bash
# Python 3
python3 -m http.server 8000
# затем открой http://localhost:8000

# или Node
npx serve .
```

---

## 🌍 Как опубликовать (бесплатно)

- **GitHub Pages** — Settings → Pages → Branch → `/ (root)`.
- **Netlify / Vercel** — перетащи папку или подключи репозиторий, build-команда не нужна.

---

## 🎨 Что и где менять

Весь контент — текстом прямо в `index.html`. Ничего собирать не нужно.

| Что | Где искать |
|-----|------------|
| Имя, заголовок, описание | секции `<head>` (SEO) и `.hero` |
| Имя в логотипе | блок `.logo` (шапка и подвал) — `alex.creates` |
| Текст «Обо мне» | секция `id="about"` |
| Услуги | секция `id="services"` |
| Проекты / кейсы | секция `id="work"` |
| Отзывы | секция `id="testimonials"` |
| Ссылки на соцсети и ники | секции `id="social"`, `id="contact"` и `.footer` |
| Email / Telegram | секция `id="contact"` + `js/main.js` (адрес в `mailto`) |
| Цвета и шрифты | переменные в начале `css/style.css` (`:root`) |

### Поменять акцентный цвет
В `css/style.css` найди `:root` и измени:
```css
--acid: #c2f73a;   /* основной акцент */
--violet: #7c5cff; /* фоновое свечение */
--cyan: #2fe6cf;   /* фоновое свечение */
```

---

## 🖼️ Как вставить свои фото и видео

Везде, где сейчас стоят заглушки (`.media-slot`), достаточно заменить блок-заглушку
на свой контент. Пропорции уже заданы классами:

| Класс | Формат | Для чего |
|-------|--------|----------|
| `media-slot--portrait` | 4:5 | главное фото, портреты |
| `media-slot--reel` | 9:16 | Reels / Shorts / TikTok |
| `media-slot--video` | 16:9 | YouTube, скринкасты, кейсы |
| `media-slot--square` | 1:1 | посты, backstage |
| `media-slot--wide` | 21:9 | широкие баннеры |

**Картинка** — замени внутренность `.media-slot` на:
```html
<div class="media-slot media-slot--square">
  <img src="assets/my-photo.jpg" alt="Описание" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
</div>
```

**Видео** (своё):
```html
<div class="media-slot media-slot--reel">
  <video src="assets/my-reel.mp4" muted loop playsinline autoplay
         style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>
</div>
```

**Встроенный ролик** (YouTube / Instagram / TikTok) — вставь их `<iframe>`/embed внутрь `.media-slot`.

Файлы складывай в папку `assets/`.

---

## 📁 Структура

```
.
├── index.html      # вся разметка и контент
├── css/style.css   # стили, анимации, адаптив
├── js/main.js      # курсор, reveal, счётчики, форма
├── assets/         # сюда твои фото / видео / og-image.jpg
└── README.md
```

---

## ♿ Мелочи, о которых уже позаботились

- Адаптив: десктоп, планшет, мобайл + мобильное меню.
- Поддержка `prefers-reduced-motion` (анимации отключаются для тех, кому так удобнее).
- Семантическая разметка, skip-link, фокус-стили, `aria`-атрибуты.
- SEO: `title`, `description`, Open Graph и Twitter-card теги (не забудь положить `assets/og-image.jpg`).

---

## 📬 Форма обратной связи

Сейчас форма открывает почтовый клиент (`mailto:`). Для приёма заявок прямо на сайте
подключи бесплатный сервис — **Formspree**, **Getform** или **Web3Forms**: замени
обработчик в `js/main.js` на отправку `fetch` на их endpoint.

---

Сделано как живой, не-шаблонный старт. Дальше — наполняй своим контентом и расти 🚀
