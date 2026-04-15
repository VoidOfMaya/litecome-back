# Litecom messaging app - backend

## Overview:
Litecome is a simple messaging webapp

## Data model

|User       | Channel   | Message      |Channel_members|Channel_type| User_Friends   | 
|-----------|-----------|--------------|---------------|------------|----------------|
id{PK}      |id{PK}     |id{PK}        |id{PK}         |id{PK}      |id{PK}          |
Email       |type_id{FK}|Channel_id{FK}|Channel_id{FK} |name        |user_id{FK}     |
Name        |created_at |Author_id{FK} |User_id{FK}    |            |friend_id{FK}   |
Bio         |Name       |Content       |Joined_at      |            |created_at      |
Photo       |           |created_at    |Role_id{FK}    |            |status          |
last_login  |           |reply_to{FK}  |               |            |                |
is_online   |           |              |               |            |                |
created_at  |           |              |               |            |                |

| Role  |
|-------|
|id{PK} |
|name   |
|       |
|       |
### Data seed:
Channel:{ global}.
Channel_type: {Dm, Group, Server}.
Role: {member, moderator}.
## data actions(abstracted)
* user actions:-
    - create a user
    - get user
    - edit user

* channel actions:-
    - create channel
    - get channels
    - get channel by id with messages and users
    - join channel
    - add user to channel
    - leave channel
    - remove user from channel 

* message actions:-
    - create message
    - edit message
    - delete message
    - reply to message by id 
    - get message by channel id

* friend actions:-
    - get friends request
    - get friends list by id
    - create friend request
    - accept friend request by id(auto Dm channel created!)
    - reject friends Request by id
    - remove user from friends by id
    - block user


### (MVP)API
[]- auth
    - create user
    - login user
    - logout user
    - checks authorization for protected routes
[]- index
[]- user
[]- messages

### (optional features)
[]- contact list component
[]- availability status indicator component
[]- group chat components




