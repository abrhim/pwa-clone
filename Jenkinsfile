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
        NPM_TOKEN = credentials("npm-token")
        TESSA2_API_KEY = credentials("tessa2-api-key")
        // Match pattern like v1.0.1-rc.1 or v1.0.1 for a release
        tag = sh(returnStdout: true, script: 'git tag --contains').trim()
        git_tag_rc = sh(returnStdout: true, script: 'git tag --contains | egrep "^v[0-9]*\\.[0-9]*\\.[0-9]*-rc*" || echo "null"').trim()
        git_tag_release = sh(returnStdout: true, script: 'git tag --contains | egrep "^v[0-9]*\\.[0-9]*\\.[0-9]*$" || echo "null"').trim()
        PACKAGE_JSON = readJSON file: 'package.json'
        MAJOR_VERSION = sh(returnStdout: true, script: "echo v${PACKAGE_JSON.version} | cut -f1 -d'.'").trim()
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
    }

    post {
        always {
            slack(currentBuild.result, "#datasolutions-jenkins")
        }
    }
}
