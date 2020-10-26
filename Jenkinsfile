@Library("jenkins-pipeline-libraries") _

pipeline {
    agent {
        docker {
            label "worker"
            image "docker-data-solution-jenkins-node-aws-dev.dr-uw2.adobeitc.com/node-aws:11.15.0-10"
            args  '-v /etc/passwd:/etc/passwd'
            registryUrl "https://docker-data-solution-jenkins-node-aws-dev.dr-uw2.adobeitc.com"
            registryCredentialsId "artifactory-datasoln"
        }
    }

    environment {
        HOME = "."
        TMPDIR = "./temp"
        NPM_TOKEN = credentials("delorey-npm-token")
        GH_TOKEN = credentials("semantic-release-github-token")
        TESSA2_API_KEY = credentials("tessa2-api-key")
        MAGENTO_CLOUD_CLI_TOKEN = credentials("delorey-magento-cloud-token")
    }

    stages {
        stage("Install") {
          steps {
            sh "npm install"
          }
        }
        
        stage("Lint") {
            steps {
                sh "npm run lint"
            }
        }

        stage("Test") {
            steps {
                sh "npm run test"
            }
        }

        stage("Scan") {
            steps {
                sh "npm run tessa"
            }
        }

        stage("deploy") {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                sh '''
                    npx semantic-release --dry-run
                '''
            }
        }

        stage("redeploy cloud") {
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    magento-cloud project:clear-build-cache -p 5k2ulbou6q5ti 
                    magento-cloud env:redeploy -p 5k2ulbou6q5ti -e master
                '''
            }
        }
    }

    post {
        always {
            slack(currentBuild.result, "#datasolutions-jenkins")
        }
    }
}
