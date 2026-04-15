# Litecom messaging app - backend

## Overview:
Litecome is a simple messaging webapp

## Data model

|User       | Channel   | Message      |Channel_members| Chnl_type |
|-----------|-----------|--------------|---------------|-----------|
id{PK}      |id{PK}     |id{PK}        |id{PK}         |id{PK} |                      
Email       |type       |Channel_id{FK}|Channel_id{FK} |name       |
Name        |created_at |Author_id{FK} |User_id[]{FK}  |           |
Bio         |           |Content       |Joined_at      |           |
Photo       |           |created_at    |               |           |
last_login  |           |reply_to      |               |           |
is_online   |           |              |               |           |
created_at  |           |              |               |           |


### (MVP)API
[]-auth
    - create user
    - login user
    - logout user
    - checks authorization for protected routes
[]-index
[]-user
[]-messages

### (optional features)
[]- contact list component
[]- availability status indicator component
[]- group chat components




