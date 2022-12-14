# TodayUsyd
This project aims to provide a web platform for all stakeholders that have interested in the University of Sydney. 

This web service allows user to communicate regards their life experiences, study experiences, job information, etc. In particular, users can publish posts, make comments, and send messages between different users. 

Below is the functionalities that our web service project will be provided in this phase.

## Features
- Registration
- Login and Logout
- User profile
- Official verification
  - When user register with them uni email, they will be registered as verified student or staff automatically.
- Navigation bar
- Groups
  - Normal users
  - Admin   
- Post
  - User can make posts in course and market page to talk about courses they have taken or items they wish to trade.
- Like
  - User can give "Likes" to a post if they think the post is helpful.
- Sort
  - Posts can sorted by number of likes and time.
- Search
- Filter
- Comment and review
  - Users can write comments below a post.
- Upload Files
  - User can upload files when they post.
- Dynamic
  - User can view all posts made by users he/she followed in the dynamic page.
- Post status
  - System admin can move posts to the most top of pages, set posts invisible and cancel to set them top and invisible.
- Weather
  - Our app can show the weather based on 3rd party and user IP location

## How to run
Our app is a webapp based on SpringBoot, React and Google cloud.
<br>
To run our project, you need the [cloud proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy) from Google to connect our database.
Then run command below to connect our cloud server.<br>
For windows:
```shell
  cd /d project_directory/proxy
  cloud_sql_proxy_x64.exe -credential_file=c.json -instances=pristine-bonito-362806:australia-southeast1:myusyd:test-database-instance=tcp:3306
```
For Mac and Linux:
```shell
  cd project_directory/proxy
  ./cloud_sql_proxy_x64 -credential_file=c.json -instances=pristine-bonito-362806:australia-southeast1:myusyd:test-database-instance=tcp:3306
```
Once connected that cloud database, you can build and run our SpringBoot project.<br>
Our default port for fronted is 8085, you can change it in 'src/main/resources/application.yml' file.

## Libraries
- spring-boot-starter-web
- spring-boot-starter-test
- fastjson from com.alibaba ver 2.0.10
- spring-boot-starter-data-jpa
- spring-boot-devtools
- mysql-connector-java ver 8.0.30
- druid from com.alibaba ver 1.1.2
- spring-boot-starter-mail ver 2.6.3
- commons-lang ver 2.6
- spring-boot-starter-websocket ver 2.7.4
- junit 
- assertj-core
- maven-compiler-plugin ver 3.8.1
- spring-boot-maven-plugin ver 2.3.7.RELEASE
- frontend-maven-plugin ver 1.6
- npm 8.15.0
- node.js v16.17.0
