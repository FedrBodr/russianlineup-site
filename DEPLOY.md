# Деплой — push в master

Сайт статический. Рекомендуемый путь — твой хостинг reg.ru с автозаливкой по коммиту.

## Вариант A — reg.ru + GitHub Actions (деплой по коммиту) ✅ рекомендуется

reg.ru-хостинг не тянет из гита сам, но GitHub Actions заливает файлы по FTP на каждый push в `master`. Workflow уже готов: `.github/workflows/deploy.yml`.

Что нужно один раз настроить:

1. Создай **новый репозиторий** на GitHub (напр. `russianlineup-site`) и залей файлы:
   ```bash
   cd russianlineup-site
   git init && git add . && git commit -m "Лендинг v1: бот + аналитика"
   git branch -M master
   git remote add origin https://github.com/FedrBodr/russianlineup-site.git
   git push -u origin master
   ```
2. В панели reg.ru возьми **FTP-доступы** (хост, логин, пароль) и узнай **корень сайта** домена russianlineup.ru (обычно `/www/russianlineup.ru/` или `public_html/`).
3. В GitHub-репозитории: **Settings → Secrets and variables → Actions**:
   - **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   - **Variables:** `FTP_SERVER_DIR` — корень сайта из шага 2 (со слешем в конце).
4. Готово. Теперь любой `git push` в `master` сам заливает сайт на хостинг (вкладка **Actions** покажет статус).

> Если на твоём тарифе reg.ru есть SFTP — надёжнее использовать его (тот же экшен, протокол подставится по хосту/порту). Пароль и логин — только в Secrets, не в коде.

## Вариант B — GitHub Pages (если решишь не использовать reg.ru)

1. Создай **новый репозиторий** на GitHub, напр. `russianlineup-site` (можно Public).
2. Залей файлы:
   ```bash
   cd russianlineup-site
   git init && git add . && git commit -m "Лендинг v1: бот + аналитика"
   git branch -M master
   git remote add origin https://github.com/FedrBodr/russianlineup-site.git
   git push -u origin master
   ```
3. В репозитории: **Settings → Pages → Source: Deploy from a branch → Branch: `master` / root**. Сохрани.
4. Custom domain: файл `CNAME` уже в репо (`russianlineup.ru`). В Pages подтверди домен и включи **Enforce HTTPS**.
5. В DNS домена (reg.ru / где делегирован) добавь записи на GitHub Pages:
   - `A` записи на `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - либо `CNAME` для `www` → `FedrBodr.github.io`

Дальше любой `git push` в `master` обновляет сайт автоматически.

## Вариант C — Amvera (РФ-хостинг, как у бота)

Если хочешь держать инфраструктуру в РФ и единообразно с ботом:
1. Создай в Amvera приложение типа статического/Node.JS Browser, подключи этот git-репозиторий.
2. Конфиг — статика из корня (`index.html`). Деплой по push.
3. Привяжи домен `russianlineup.ru` в настройках приложения.

> Рекомендация: у тебя уже есть хостинг reg.ru на домене — бери **A (reg.ru + GitHub Actions)**, деплой по коммиту. B и C — запасные варианты. Репо одно, переключить можно позже.
