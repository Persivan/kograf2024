# Запуск
1. `npm run start` - запустит бд в том числе

# Фиксы
1. Если бд запустилась не на 3001, то изменить путь до апи в `src/environments/environment.development.ts:2`


# Фишки (функционал)
* Учетка логин: `root` пароль: `root`
* Роутинг
* Не забываем отписываться, чтобы не было утечек памяти
* emloyees.plannedDate и tasks.assigned

# Излишнее
* store - здесь слишком мало модулей для его использования
* тесты - тут нет pipelines, так что тестов не будет 

# Роутинг
* `/auth` - авторизация
* `/auth/register` - регистрация
* `/auth/reset-password` - восстановление пароля
* `/main` - лэндинг доступный всегда
* `/main/about` - создатели приложения
* `/office` - личный кабинет пользователя доступный только пользователю (гварды)
* `/office/board` - решение задания
* Все остальное - будет редиректить на `/auth`

# Заметки разработчика
## Арххитектура
- modules
  - module1
  - module2
    - components
    - services
    - types
- shared
  - constants
  - modules
    - module1
    - module2
      - components
      - services
      - types
  - pipes (можно будет удалить)
  - services
    - service1
    - service2
  - types


