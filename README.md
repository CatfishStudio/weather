# weather
В рамках тестового задания необходимо создать простое одностраничное веб-приложение 
(желательно, но не обязательно с использованием React+Redux, LESS, и т.п.) о погоде.
Данные можно взять с сайта openweathermap.org

Приложение должно уметь:
* Добавлять/удалять города;
* Сохранять локально данные;
* Автоматически запрашивать погоду по координатам пользователя — это город/место по умолчанию.

Результат разработки должен быть сохранен на сервисе github с локальными коммитами разработчика.

Опубликовать приложение на сайте, и предоставить ссылку нам. 
Поддержка адаптивной верстки приветствуется.

<hr>
# Результат

Было создано веб-приложение показывающее погоду.

Приложение размещено на хостинге: http://somov.hol.es/projects/weather/

<p align="center">
  <img src="http://somov.hol.es/projects/weather/img/image.png" width="480">
</p>

# Предупреждение
Если при получании геолокации вам выдаёт такое сообщение:

<p align="center">
  <img src="http://somov.hol.es/projects/weather/img/imageError.png" width="480">
</p>

Это из за того что проложение размещено на HTTP хостинге, для корректой работы геолокации необходим HTTPS хостинг.

getCurrentPosition() and watchPosition() no longer work on insecure origins. 
To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details
