pipeline {
    agent { label 'self-hosted' }
    
    environment {
        REGISTRY = 'localhost'
        IMAGE_NAME = 'pricesyncpro-frontend'
        CONTAINER_NAME = 'pricesyncpro-frontend'
        NODE_VERSION = '18'
        PORT = '3000'
        IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:latest"
    }
    
    triggers {
        // GitHub webhook trigger equivalent
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
                    // Setup Node.js environment
                    sh """
                        # Node.js should be available on self-hosted runner
                        node --version
                        npm --version
                    """
                    
                    // Install dependencies
                    sh 'npm ci --prefer-offline --no-audit'
                    
                    // Run linting (optional)
                    sh 'npm run lint --if-present || true'
                    
                    // Run tests (optional)
                    sh 'npm run test --if-present || true'
                    
                    // Build application
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            environment {
                DEPLOY_ENV = 'production'
            }
            steps {
                script {
                    // Build container image
                    sh "podman build -t ${IMAGE_TAG} ."
                    
                    // Stop existing container
                    sh """
                        podman stop ${CONTAINER_NAME} || true
                        podman rm ${CONTAINER_NAME} || true
                    """
                    
                    // Run new container
                    sh """
                        podman run -d \\
                          --name ${CONTAINER_NAME} \\
                          -p ${PORT}:3000 \\
                          ${IMAGE_TAG}
                    """
                    
                    // Wait for container startup
                    sleep(5)
                    
                    // Verify deployment
                    sh """
                        if curl -f http://localhost:${PORT} > /dev/null 2>&1; then
                            echo "✅ Deployment successful"
                        else
                            echo "❌ Deployment failed"
                            podman logs ${CONTAINER_NAME} --tail 20
                            exit 1
                        fi
                    """
                    
                    // Cleanup old resources
                    sh 'podman image prune -f || true'
                    
                    // Deployment summary
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
            // Container logs for debugging
            script {
                sh "podman logs ${CONTAINER_NAME} --tail 50 || true"
            }
        }
        always {
            // Clean workspace
            cleanWs()
        }
    }
}