## 1. 개발 환경

### 1.1 개발 환경

- JAVA 11
- SpringBoot : 2.7.13
- Gradle : 8.1.1
- Node.js : 14.17.0
- mysql : 5.7.41

### 1.2. gitignore 환경 변수

- `Spring` - `application.properties`

```jsx
# JPA
spring.jpa.hibernate.naming.implicit-strategy=org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy
spring.jpa.hibernate.naming.physical-strategy=org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect

# MySQL 
spring.data.web.pageable.one-indexed-parameters=true
spring.datasource.url=jdbc:mysql://{DB url}/{DB 이름}?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.hikari.username={db ID}
spring.datasource.hikari.password={db 비밀번호)

# Redis 
spring.redis.host={DB url}
spring.redis.port={port 번호}

# S3
cloud.aws.s3.bucket={S3 이름}
cloud.aws.region.static={S3 지역}
cloud.aws.stack.auto=false
cloud.aws.credentials.access-key={aws accessKey}
cloud.aws.credentials.secret-key={aws secret}

# jwt
jwt.header=Authorization
jwt.secret={jwt 비밀키}
# unit is ms. 15 * 24 * 60 * 60 * 1000 = 15days
jwt.expiration=1296000000

# openvidu
OPENVIDU_URL: {openvidu url}
OPENVIDU_SECRET: {openvidu 비밀키}
```

### 1.3 외부 서비스

- Kakaopay API

## 2. 배포

### 2.0 Docker 설치

### 2.1 Openvidu 배포

- `/opt`로 이동
    
    ```cmd
    cd /opt
    ```
    
- openvidu 설치
    
    ```cmd
    curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
    ```
    
- openvidu 환경설정
    
    ```jsx
    cd openvidu
    $ nano .env
    
    # OpenVidu configuration
    # ----------------------
    # 도메인 또는 퍼블릭IP 주소
    DOMAIN_OR_PUBLIC_IP=i9c111.p.ssafy.io
    
    # 오픈비두 서버와 통신을 위한 시크릿
    OPENVIDU_SECRET={secret-key}
    
    # Certificate type
    CERTIFICATE_TYPE=letsencrypt
    
    # 인증서 타입이 letsencrypt일 경우 이메일 설정
    LETSENCRYPT_EMAIL=user@example.com
    
    # HTTP port
    HTTP_PORT=8448
    
    # HTTPS port(해당 포트를 통해 오픈비두 서버와 연결)
    HTTPS_PORT=8447
    ```
    
- openvidu 서버 실행
    
    ```cmd
    ./openvidu start
    ```
    
    - `ctrl + c`를 눌러 백그라운드 실행으로 전환

### 2.2 DB 배포

- **git clone**
    
    ```cmd
    git clone https://lab.ssafy.com/s09-webmobile1-sub2/S09P12C111.git
    ```
    
- **redis 배포**
    - 백엔드 배포 전에 배포 필수
    
    ```jsx
    sudo docker run --rm -d -p 6379:6379 --name redis redis
    ```
    
- **mysql 배포**
    - 백엔드 배포 전에 배포 필수(db 설정 추가 필요)
    
    ```jsx
    sudo docker run --rm -d -p 3305:3306 --name mysqldb mysql
    ```
    

### 2.3 백엔드 빌드 및 배포

- `/backend` 폴더에 `Dockerfile` 위치
    
    ```docker
    # Dockerfile
    
    FROM openjdk:11-jdk
    ARG JAR_FILE=build/libs/*.jar
    COPY ${JAR_FILE} springboot.jar
    EXPOSE 8080
    ENV TZ=Asia/Seoul
    ENTRYPOINT ["java", "-jar", "/springboot.jar"]
    ```
    
- 프로젝트 내 `/backend` 폴더에서 다음 명령어 실행
    - Jenkins 적용 시 생략 → 2.6으로 이동
    
    ```cmd
    # gradle build
    gradle clean bootjar
    
    # docker image build
    sudo docker build -t cookcreate_back:0.1 .
    
    # docker container 실행
    sudo docker run --rm -d -p 8080:8080 --name back cookcreate_back:0.1
    ```
    

### 2.4 프론트엔드 빌드 및 배포

- `/front` 폴더에 `Dockerfile`, `nginx.conf` 위치
    
    ```docker
    FROM nginx
    WORKDIR /app
    RUN mkdir ./build
    ADD ./build ./build
    RUN rm /etc/nginx/conf.d/default.conf
    COPY ./nginx.conf /etc/nginx/conf.d
    EXPOSE 3000
    CMD ["nginx", "-g", "daemon off;"]
    ```
    
    ```docker
    server {
        listen 3000;
        location / {
            root /app/build;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
    ```
    
- 프로젝트 내 `/front` 폴더에서 다음 명령어 실행
    - Jenkins 적용 시 생략 → 2.6으로 이동
    
    ```cmd
    # module 설치
    npm install
    
    # npm build
    CI=false npm run build
    
    # docker image build
    sudo docker build -t cookcreate_front:0.1 .
    
    # docker container 실행
    sudo docker run --rm -d -p 3000:3000 --name front cookcreate_front:0.1
    ```
    

### 2.5 Nginx 설정

- Nginx 설치
    
    ```cmd
    sudo apt-get install nginx
    ```
    
- SSL 인증서 발급
    
    ```cmd
    # let's Encrypt 설치
    sudo apt-get install letsencrypt
    
    # Certbot 설치
    sudo apt-get install certbot python3-certbot-nginx
    
    # Certbot 동작
    sudo certbot --nginx
    ```
    
- `/etc/nginx/sites-available`에 `cookcreate.conf` 작성
    
    ```jsx
    server {
            location / {
                    proxy_pass http://localhost:3000;
            }
    
            location /api/v1 {
                    proxy_pass http://localhost:8080;
    
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
    
            }
            location /api/v1/message {
                    proxy_pass http://localhost:8080;
    
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                    proxy_set_header Host $host;
            }
            listen 443 ssl;
            server_name {도메인};
    
            ssl_certificate /etc/letsencrypt/live/{도메인}/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/{도메인}/privkey.pem;
    				include /etc/letsencrypt/options-ssl-nginx.conf;
            ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    }
    
    server {
            if ($host = {도메인}) {
                    return 301 https://$host$request_uri;
            }
    
            listen 80;
            server_name {도메인};
            return 404;
    }
    ```
    
- 설정 적용 및 Nginx 실행
    
    ```cmd
    # 심볼릭 링크 연결
    sudo ln -s /etc/nginx/sites-available/cookcreate.conf /etc/nginx/sites-enabled/cookcreate.conf
    
    # nginx 재실행
    sudo systemctl restart nginx
    ```
    

### 2.6 Jenkins 사용

- Jenkins 이미지 pull 및 컨테이너 실행
    
    ```cmd
    #jenkins 이미지 pull
    sudo docker pull jenkins/jenkins:lts
    
    #jenkins 컨테이너 실행
    sudo docker run --rm -d -p 외부포트:내부포트 -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v /jenkins/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts
    ```
    
    - `-v /var/run/docker.sock:/var/run/docker.sock`
        - Jenkins 컨테이너에서 호스트 서버의 docker를 사용하기 위한 바인딩
    - `-v $(which docker):/usr/bin/docker`
        - docker 권한
    - `-v /jenkins/jenkins_home:/var/jenkins_home`
        - Jenkins 컨테이너의 설정을 호스트 서버와 공유
- backend pipeline 배포
    
    ```jsx
    pipeline {
        agent any
        environment {
            repository = "bunny7531/cookcreate"
            GITLAB_CREDENTIALS = credentials('gitlabId')
        }
        
        tools {
            gradle 'cookcreate-gradle'
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    echo 'Clone git Repository'
                    git branch: 'master', credentialsId: 'gitlabId', 
                    url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12C111.git'
                }
            }
            stage('Build Gradle') {
                steps {
                    echo 'Build Gradle'
                    dir('backend') {
                        sh "chmod +x gradlew"
                        sh "./gradlew clean bootjar"
                    }
                }
            }
            stage('Build Image') {
                steps {
                    script {
                        sh """
                        cd /var/jenkins_home/workspace/cookcreate/backend
                        docker build -t ${repository}:back-${env.BUILD_NUMBER} /var/jenkins_home/workspace/cookcreate/backend
                        """                    
                    }
                }
            }
            stage("Deploy") {
                steps {
                        sh """
                        docker stop back
                        docker run --rm -d -p 8080:8080 --name back ${repository}:back-${env.BUILD_NUMBER}
                        """
                }
            }
        }
    }
    ```
    
- frontend pipeline 배포
    
    ```jsx
    pipeline {
        agent any
        environment {
            repository = "bunny7531/cookcreate"
            GITLAB_CREDENTIALS = credentials('gitlabId')
        }
        
        tools {
            gradle 'cookcreate-gradle'
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    echo 'Clone git Repository'
                    git branch: 'master', credentialsId: 'gitlabId', 
                    url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12C111.git'
                }
            }
            stage('FE-build') {
                steps {
                    dir('frontend') {
                        nodejs('NodeJS 14.17.0') {
                        sh "npm install && CI=false npm run build"
                        }
                    }
                }
            }
            stage('Build Image') {
                steps {
                    script {
                        sh """
                        cd /var/jenkins_home/workspace/cookcreate-frontend/frontend
                        docker build -t ${repository}:front-${env.BUILD_NUMBER} /var/jenkins_home/workspace/cookcreate-frontend/frontend
                        """               
                    }
                }
            }
            stage("Deploy") {
                steps {
                        sh """
                        docker stop front
                        docker run --rm -d -p 3000:3000 --name front ${repository}:front-${env.BUILD_NUMBER}
                        """
                }
            }
        }
    }
    ```