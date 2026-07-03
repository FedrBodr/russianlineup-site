Project: russianlineup-site
Document: utm-links

# UTM-ссылки по каналам — шпаргалка

Зачем: без UTM всё сольётся в «direct» и не поймёшь, какой канал приносит людей.
`utm_source` прокидывается с сайта в бота как источник (переживает переход site→Telegram),
поэтому в отчётах бота и GA4/Метрике канал будет виден **до самой заявки**.

Правило: `utm_source` — только `[A-Za-z0-9_-]` (бот срезает остальное). Якорь `#секция`
ставится **после** параметров.

## Telegram-чаты (наши)

| Канал | Ссылка |
|---|---|
| Мск + МО | `https://russianlineup.ru/?utm_source=tg_msk&utm_medium=social&utm_campaign=launch2026` |
| Юг (Ланка) | `https://russianlineup.ru/?utm_source=tg_lanka_ug&utm_medium=social&utm_campaign=launch2026` |
| Аругам-Бэй | `https://russianlineup.ru/?utm_source=tg_arugam&utm_medium=social&utm_campaign=launch2026` |
| Мысовое | `https://russianlineup.ru/?utm_source=tg_misovoe&utm_medium=social&utm_campaign=launch2026` |
| Личка / пересылки | `https://russianlineup.ru/?utm_source=tg_dm&utm_medium=social&utm_campaign=launch2026` |

## Соцсети

| Канал | Ссылка |
|---|---|
| Instagram (bio) | `https://russianlineup.ru/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Instagram (сторис) | `https://russianlineup.ru/?utm_source=instagram&utm_medium=social&utm_campaign=stories` |
| YouTube (описание) | `https://russianlineup.ru/?utm_source=youtube&utm_medium=social&utm_campaign=video` |
| VK | `https://russianlineup.ru/?utm_source=vk&utm_medium=social&utm_campaign=launch2026` |
| LinkedIn | `https://russianlineup.ru/?utm_source=linkedin&utm_medium=social&utm_campaign=launch2026` |
| WhatsApp-рассылки | `https://russianlineup.ru/?utm_source=whatsapp&utm_medium=social&utm_campaign=launch2026` |

## Объявления

| Канал | Ссылка |
|---|---|
| Авито (прокат/тест-день) | `https://russianlineup.ru/?utm_source=avito&utm_medium=classified&utm_campaign=testday#testday` |
| Авито (доски) | `https://russianlineup.ru/?utm_source=avito&utm_medium=classified&utm_campaign=boards#esurf` |
| Профи/сервисы (корпоратив) | `https://russianlineup.ru/?utm_source=services&utm_medium=classified&utm_campaign=corporate#corporate` |

## Офлайн (QR-коды готовы в `marketing/qr/`)

| Носитель | Файл | Ссылка |
|---|---|---|
| Флаер | `qr-flyer.png` | `...?utm_source=flyer&utm_medium=offline&utm_campaign=launch2026` |
| Наклейка (доска/прицеп) | `qr-sticker.png` | `...?utm_source=sticker&utm_medium=offline&utm_campaign=launch2026` |
| Визитка | `qr-vizitka.png` | `...?utm_source=vizitka&utm_medium=offline&utm_campaign=launch2026` |
| Корп-предложение (PDF/печать) | `qr-corporate.png` | `...?utm_source=qr_corp&utm_medium=offline&utm_campaign=corporate#corporate` (ведёт сразу на секцию корпоратива) |

QR-коды также доступны с прода: `https://russianlineup.ru/marketing/qr/qr-flyer.png` и т.д.

## Как читать результаты

- **Метрика:** Отчёты → Источники → Метки UTM; конверсия — цель `open_bot` (FED-260).
- **GA4:** Session source + событие `open_bot`/`lead_submit`; воронка «сайт → бот → заявка» (FED-260).
- **Бот:** админ-отчёт `/leads` — колонка utm_source у каждой заявки, «Источники стартов».

## Договорённости

- Новый канал → новая строка здесь же, `utm_source` в snake_case.
- `utm_campaign` меняем на именованные запуски (например `corp_autumn`), когда начнутся кампании.
