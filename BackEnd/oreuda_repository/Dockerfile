FROM openjdk:11-jdk AS builder
COPY build/libs/oreuda_repository-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8070
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app.jar"]