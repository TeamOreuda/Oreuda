FROM openjdk:11-jdk AS builder
COPY build/libs/oreuda_auth-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app.jar"]