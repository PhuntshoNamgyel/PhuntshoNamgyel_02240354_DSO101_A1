pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
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
                    docker.build('phuntshonamgyel/be-todo:latest', './backend')
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image('phuntshonamgyel/be-todo:latest').push()
                    }
                }
            }
        }
    }
}
