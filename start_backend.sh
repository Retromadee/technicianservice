#!/bin/bash
# Script to start the Spring Boot backend

cd "$(dirname "$0")/backend" || exit

# Check if Maven is installed
if ! command -v mvn &> /dev/null
then
    echo "Maven could not be found. Please wait for the installation to finish or install it manually."
    exit 1
fi

# Set Java Home to version 21 (required for Lombok compatibility)
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home

echo "Starting HomeFix Pro Backend (Java 21)..."
mvn spring-boot:run
