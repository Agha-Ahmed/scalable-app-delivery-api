# Scalable Application Delivery (Node.js + Docker + AWS App Runner)

## What is this project?
This repository contains a simple Node.js API designed to demonstrate a modern, production-ready container delivery pattern on AWS.
The main goal is to explain:
- how code moves from developer to cloud
- how deployment is automated
- how anyone can check what version is running

## What does the application do?
This is a small Node.js application with only two endpoints:

### Endpoints
- `GET /health` - Tells if the application is running.
- `GET /version` - Tells which version of the application is currently deployed.

## Architecture
1. Developer pushes code to GitHub
2. GitHub automatically:
    - checks the code
    - runs tests
    - builds a Docker image
    - sends the image to AWS
3. AWS automatically:
    - pulls the new image
    - updates the running application
4. Users access the app using a public URL

## Steps performed in this project

### Step 1: Create a simple application
- A small Node.js app was created
- Two endpoints were added: `/health` and `/version`
- App works locally and in cloud

### Step 2: Prepare the app for production
- Configuration is handled using environment variables
- No values are hardcoded
- Logs are added to know when the app starts

### Step 3: Package the app using Docker
- Docker is used so the app runs the same everywhere
- Multi-stage build is used to keep image small
- Only required files are added to the image
- App runs as a non-root user for security

### Step 4: Store the image in AWS
- Docker image is pushed to Amazon ECR
- Each image has a version (commit ID)
- Images are never changed after build
This makes deployments traceable.

### Step 5: Automate using GitHub Actions
#### CI (Code Check)
Runs automatically:
- checks code quality
- runs tests
- blocks broken code

#### CD (Deployment)
Runs automatically:
- builds Docker image
- pushes image to AWS
- deploys application
No one runs commands manually.

### Step 6: Deploy using AWS App Runner
AWS App Runner was used because:
- no server setup is required
- HTTPS is automatic
- deployment is safe and smooth
- scaling is handled by AWS
