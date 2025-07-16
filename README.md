# Prueba tecnica Jorge Montejo

Buenas!
Este es el repositorio para la prueba tecnica de Ariadna Grid.

Me gustaria indicar que debido al poco tiempo para realizar dicha prueba, ni el codigo ni la documentacion del mismo son una representacion fiel a como trabajo en el dia a dia.

## Instrucciones de ejecucion

_Para poder probarlo directamente sin tener que descargar y ejecutar, he desplegado esto en mi propio servidor: [https://hays.jorgemon.es/](https://hays.jorgemon.es/)_

### Backend (Java)

Dentro de la carpeta de backend ejecutar `mvn clean compile`

y despues ejecutarlo con `mvn exec:java`

Para ejecutar los tests `mvn test`

### Frontend (React)

Dentro de la carpeta de fronend ejecutar `pnpm i` (en caso de no tener pnpm instalarlo con npm i -g pnpm)

### Docker

Tambien he creado un docker-compose para arrancarlo si es que lo teneis instalado.

`docker-compose up`

## Comentarios
- He optado por usar java 21 ya que es la que suelo utilizar para algun pequeño proyecto personal y es LTS
- Como los eventos que habia que cargar eran al menos 1000, los he creado de forma aleatoria en la zona de la peninsula iberica. Estan en la ruta `backend\src\main\resources` y si se eliminan al arrancar se crearan nuevos eventos y fuentes
- Dado que no se podian usar frameworks para el web server he usado com.sun.net.httpserver y he creado la clase `WebServer.java` para manejar ahi los enpoint que registre en `Contoller.java`
- La parte de testing la tengo bastante verde, ya que es algo con lo que apenas he trabajado
- Para la vista de el mapa, he considerado mejor mostrar solo las lineas entre fuentes y eventos cuando haces **click** en alguno de ellos, ya que al haber tantos eventos se llenaba todo de lineas y no se veia con claridad