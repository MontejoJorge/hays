# Imagen base con Maven y JDK
FROM maven:3.9.9-eclipse-temurin-21

# Directorio de trabajo
WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Exponer el puerto
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "target/backend-1.0.jar"]
