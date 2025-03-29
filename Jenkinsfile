pipeline {
    agent any 
    
    stages { 
        
        // Trigger stage to trigger the pipeline when there is a change in the repository
        stage('Trigger') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'dilukshan-ci-cd', url: 'https://github.com/DilukshanA/ci-cd-nodeapp']])
            }
        }

        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/DilukshanA/ci-cd-nodeapp'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t dilukshana/build-1-10:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dilukshan-dockerhub-pass', variable: 'dilukshan-docker-hub-pass')]) {
                    script {
                        bat "docker login -u dilukshana -p %dilukshan-docker-hub-pass%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push dilukshana/build-1-10:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
