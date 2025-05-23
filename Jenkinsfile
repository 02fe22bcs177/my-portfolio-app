pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'myapp:latest'
    DOCKER_REPO = '02fe22bcs177/myapp:latest'
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main', credentialsId: 'github-pat', url: 'https://github.com/02fe22bcs177/my-portfolio-app.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker tag $DOCKER_IMAGE $DOCKER_REPO
            docker push $DOCKER_REPO
          """
        }
      }
    }

    stage('Deploy to EC2 using Ansible') {
      steps {
        sh 'ansible-playbook -i inventory.ini deploy.yml'
      }
    }
  }
}
