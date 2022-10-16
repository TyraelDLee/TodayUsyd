# TodayUsyd
This project aims to provide a web platform for all stakeholders that have interested in the University of Sydney. This web service allows user to communicate regards their life experiences, study experiences, job information, etc. In particular, users can publish posts, make comments, and send messages between different users. Below is the functionality that our web service project will be provided in this phase.

## Features
- Registration
- Login and Logout
- User profile
- Official verification
  - When user register with them uni email, they will be registered as verified student or staff automatically.
- Navigation bar
- Groups
- Post
  - User can make posts in course and market page to talk about courses they have taken or items they wish to trade.
- Like
  - User can give "Likes" to a post if they think the post is helpful.
- Sort
- Search
- Filter
- Comment and review
  - Users can write comments below a post.
- Upload Files
  - User can upload files when they post.
- Dynamic
  - User can view all posts made by users he/she followed in the dynamic page.
- Post status
  - System admin can move posts to the most top of pages or set posts invisible.

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


## 开源组件许可
### FFmpeg.wasm
- Offical site: [ffmpegwasm.netlify.app](https://ffmpegwasm.netlify.app/)
- Copyright (c) FFmpeg.wasm developers and contributors
- License: [github.com/ffmpegwasm/ffmpeg.wasm-core/blob/n4.3.1-wasm/LICENSE.md](https://github.com/ffmpegwasm/ffmpeg.wasm-core/blob/n4.3.1-wasm/LICENSE.md)

### Protocol Buffers
- Offical site: [developers.google.com/protocol-buffers](https://developers.google.com/protocol-buffers/)
- Copyright (c) 2008 Google Inc.
- License: [github.com/protocolbuffers/protobuf/blob/master/LICENSE](https://github.com/protocolbuffers/protobuf/blob/master/LICENSE)

### CRC crack
- CRC.js [github.com/bilibili-helper/bilibili-helper-o/blob/master/src/js/libs/crc32.js](https://github.com/bilibili-helper/bilibili-helper-o/blob/master/src/js/libs/crc32.js)
- Copyright (c) 2020 Zac Yu, ruo
- License: [github.com/bilibili-helper/bilibili-helper-o/blob/master/LICENSE](https://github.com/bilibili-helper/bilibili-helper-o/blob/master/LICENSE)
