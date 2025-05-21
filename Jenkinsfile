pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'myapp:latest'
    DOCKER_REPO = 'your-dockerhub-user/myapp:latest'
  }

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your-user/my-portfolio-app.git'
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
