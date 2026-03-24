pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/PhuntshoNamgyel/PhuntshoNamgyel_02240354_DSO101_A1.git'
            }
        }
        stage('Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    junit 'backend/junit.xml'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker build -t phuntshonamgyel/be-todo:latest ./backend'
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push phuntshonamgyel/be-todo:latest'
                    }
                }
            }
        }
    }
}
