# Stage 1: Build the application using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml to download dependencies (improves build caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application package (skipping tests for speed)
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final lightweight runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built JAR from the build stage (using wildcard to be independent of project version)
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot's port (as configured in application.properties)
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
