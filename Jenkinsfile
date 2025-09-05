pipeline {
    agent any
    
    environment {
        REGISTRY = 'localhost'
        IMAGE_NAME = 'pricesyncpro-frontend'
        CONTAINER_NAME = 'pricesyncpro-frontend'
        NODE_VERSION = '18'
        PORT = '3000'
        IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:latest"
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test & Build') {
            steps {
                script {
                    sh """
                        node --version
                        npm --version
                    """
                    
                    sh 'npm ci --prefer-offline --no-audit'
                    sh 'npm run lint --if-present || true'
                    sh 'npm run test --if-present || true'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh "podman build -t ${IMAGE_TAG} ."
                    
                    sh """
                        podman stop ${CONTAINER_NAME} || true
                        podman rm ${CONTAINER_NAME} || true
                    """
                    
                    sh """
                        podman run -d \\
                          --name ${CONTAINER_NAME} \\
                          -p ${PORT}:3000 \\
                          ${IMAGE_TAG}
                    """
                    
                    sleep(5)
                    
                    sh """
                        if curl -f http://localhost:${PORT} > /dev/null 2>&1; then
                            echo "✅ Deployment successful"
                        else
                            echo "❌ Deployment failed"
                            podman logs ${CONTAINER_NAME} --tail 20
                            exit 1
                        fi
                    """
                    
                    sh 'podman image prune -f || true'
                    
                    sh """
                        echo "🎉 Deployment Complete:"
                        echo "📦 Image: ${IMAGE_TAG}"
                        echo "🐳 Container: ${CONTAINER_NAME}"
                        echo "🌐 Port: ${PORT}"
                        echo "⏰ \$(date)"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            script {
                try {
                    sh "podman logs ${env.CONTAINER_NAME} --tail 50 || echo 'No container logs available'"
                } catch (Exception e) {
                    echo "Could not retrieve container logs: ${e.getMessage()}"
                }
            }
        }
        cleanup {
            script {
                try {
                    cleanWs()
                } catch (Exception e) {
                    echo "Workspace cleanup failed: ${e.getMessage()}"
                }
            }
        }
    }
}