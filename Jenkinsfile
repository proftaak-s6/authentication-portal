pipeline {
  environment {
    registry = "yoksar/authentication-portal"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
    stages {
        stage('Cloning Git') {
            steps {
                git([url: 'https://github.com/proftaak-s6/authentication-portal.git', branch: 'master', credentialsId: 'Github'])
            }
        }
        stage('Building image') {
            steps{
                script {
                dockerImage = docker.build registry
                }
            }
        }
        stage('Deploy Image') {
            steps{
                    script {
                        docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $registry"
            }
        }


        stage("Production") {
            steps{
                node("docker-prod"){
                    git([url: 'https://github.com/proftaak-s6/authentication-portal.git', branch: 'master', credentialsId: 'Github'])
                    sh "docker service rm authentication-portal_authenticatieportaal"
                    sh "docker stack deploy --with-registry-auth -c docker-compose.prod.yml authentication-portal"
                }
            }
        }
    }
}