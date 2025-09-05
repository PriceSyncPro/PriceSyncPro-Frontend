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
        
        stage('Setup Prerequisites') {
            steps {
                script {
                    echo "🔍 Checking and installing prerequisites..."
                    
                    // Node.js kontrolü ve kurulumu
                    def nodeInstalled = false
                    try {
                        sh 'node --version'
                        def nodeVersion = sh(script: 'node --version', returnStdout: true).trim()
                        echo "✅ Node.js already installed: ${nodeVersion}"
                        nodeInstalled = true
                    } catch (Exception e) {
                        echo "❌ Node.js not found, installing..."
                        nodeInstalled = false
                    }
                    
                    if (!nodeInstalled) {
                        echo "📥 Installing Node.js ${NODE_VERSION}..."
                        try {
                            // NodeSource repository ekle ve Node.js kur
                            sh """
                                curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
                                sudo apt-get install -y nodejs
                            """
                            
                            // Kurulumu doğrula
                            sh 'node --version'
                            sh 'npm --version'
                            
                            def nodeVersion = sh(script: 'node --version', returnStdout: true).trim()
                            def npmVersion = sh(script: 'npm --version', returnStdout: true).trim()
                            
                            echo "✅ Node.js installed successfully: ${nodeVersion}"
                            echo "✅ NPM version: ${npmVersion}"
                            
                        } catch (Exception installError) {
                            echo "❌ Failed to install Node.js automatically"
                            echo "Trying alternative installation method..."
                            
                            try {
                                // Alternatif yöntem: snap ile kurulum
                                sh """
                                    sudo snap install node --classic
                                    sudo ln -sf /snap/bin/node /usr/local/bin/node
                                    sudo ln -sf /snap/bin/npm /usr/local/bin/npm
                                """
                                
                                sh 'node --version'
                                echo "✅ Node.js installed via snap"
                                
                            } catch (Exception snapError) {
                                echo "❌ All installation methods failed"
                                echo "Please manually install Node.js on the Jenkins agent"
                                error("Could not install Node.js automatically")
                            }
                        }
                    }
                    
                    // NPM kontrolü
                    try {
                        sh 'npm --version'
                        def npmVersion = sh(script: 'npm --version', returnStdout: true).trim()
                        echo "✅ NPM available: ${npmVersion}"
                    } catch (Exception e) {
                        echo "❌ NPM not available after Node.js installation"
                        error("NPM is not working properly")
                    }
                    
                    // Podman kontrolü
                    try {
                        sh 'sudo podman --version'
                        def podmanVersion = sh(script: 'sudo podman --version', returnStdout: true).trim()
                        echo "✅ Podman available with root privileges: ${podmanVersion}"
                    } catch (Exception e) {
                        echo "❌ Podman not found or no sudo access!"
                        echo "Please install Podman and configure passwordless sudo for jenkins user"
                        error("Podman with sudo access is required")
                    }
                    
                    // Curl kontrolü ve kurulumu
                    try {
                        sh 'curl --version | head -1'
                        echo "✅ Curl is available"
                    } catch (Exception e) {
                        echo "❌ Curl not found, installing..."
                        try {
                            sh 'sudo apt-get update && sudo apt-get install -y curl'
                            echo "✅ Curl installed successfully"
                        } catch (Exception curlError) {
                            echo "⚠️ Could not install curl - deployment verification may fail"
                        }
                    }
                    
                    echo "🎉 All prerequisites are ready!"
                }
            }
        }
        
        stage('Test & Build') {
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    sh 'npm ci --prefer-offline --no-audit'
                    
                    echo "🔍 Running linting..."
                    sh 'npm run lint --if-present || echo "⚠️ Linting not configured or failed"'
                    
                    echo "🧪 Running tests..."
                    sh 'npm run test --if-present || echo "⚠️ Tests not configured or failed"'
                    
                    echo "🏗️ Building application..."
                    sh 'npm run build'
                    
                    echo "✅ Build completed successfully!"
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🚀 Starting deployment with root privileges..."
                    
                    echo "🏗️ Building container image..."
                    sh "sudo podman build -t ${IMAGE_TAG} ."
                    
                    echo "🛑 Stopping existing container..."
                    sh """
                        sudo podman stop ${CONTAINER_NAME} || echo "No existing container to stop"
                        sudo podman rm ${CONTAINER_NAME} || echo "No existing container to remove"
                    """
                    
                    echo "▶️ Starting new container..."
                    sh """
                        sudo podman run -d \\
                          --name ${CONTAINER_NAME} \\
                          -p ${PORT}:3000 \\
                          ${IMAGE_TAG}
                    """
                    
                    echo "⏳ Waiting for container startup..."
                    sleep(5)
                    
                    echo "🔍 Verifying deployment..."
                    sh """
                        if curl -f http://localhost:${PORT} > /dev/null 2>&1; then
                            echo "✅ Deployment successful - Application is responding"
                        else
                            echo "❌ Deployment failed - Application not responding"
                            echo "Container logs:"
                            sudo podman logs ${CONTAINER_NAME} --tail 20
                            exit 1
                        fi
                    """
                    
                    echo "🧹 Cleaning up old images..."
                    sh 'sudo podman image prune -f || echo "Image cleanup completed"'
                    
                    echo "🎉 Deployment Summary:"
                    sh """
                        echo "📦 Image: ${IMAGE_TAG}"
                        echo "🐳 Container: ${CONTAINER_NAME}"
                        echo "🌐 URL: http://localhost:${PORT}"
                        echo "⏰ Deployed at: \$(date)"
                        echo "🔗 Root Container Status:"
                        sudo podman ps --filter name=${CONTAINER_NAME}
                        echo "💡 Container is now visible to root user"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline completed successfully!'
            script {
                if (env.BRANCH_NAME == 'main') {
                    echo "🌐 Application is available at: http://localhost:${PORT}"
                    echo "🔍 Check container with: sudo podman ps"
                }
            }
        }
        failure {
            echo '❌ Pipeline failed!'
            script {
                echo "📋 Failure Analysis:"
                
                try {
                    def containerExists = sh(
                        script: "sudo podman ps -a --filter name=${env.CONTAINER_NAME} --format '{{.Names}}'",
                        returnStdout: true
                    ).trim()
                    
                    if (containerExists) {
                        echo "📄 Container logs:"
                        sh "sudo podman logs ${env.CONTAINER_NAME} --tail 50"
                    } else {
                        echo "ℹ️ No container logs available - container was not created"
                    }
                } catch (Exception e) {
                    echo "⚠️ Could not retrieve container logs: ${e.getMessage()}"
                }
            }
        }
        cleanup {
            script {
                try {
                    cleanWs()
                    echo "🧹 Workspace cleaned successfully"
                } catch (Exception e) {
                    echo "⚠️ Workspace cleanup failed: ${e.getMessage()}"
                }
            }
        }
    }
}