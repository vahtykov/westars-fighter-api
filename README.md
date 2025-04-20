Базовые команды для инициализации БД:

docker exec -it ваш_контейнер psql -U postgres -d ваша_база

Создание юзера в бд:
CREATE USER ваш_пользователь WITH PASSWORD 'ваш_надёжный_пароль';

Выдача базовых прав:
-- Разрешение на подключение к БД
GRANT CONNECT ON DATABASE ваша_база TO ваш_пользователь;

-- Разрешение на использование схемы
GRANT USAGE ON SCHEMA public TO ваш_пользователь;

-- DML права
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ваш_пользователь;

-- Права по-умолчанию для новых таблиц
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ваш_пользователь;

-- Права для sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ваш_пользователь;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO ваш_пользователь;