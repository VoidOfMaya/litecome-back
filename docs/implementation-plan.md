architecture tasks based on layers:
## Setup
    [X] Initialize Express server
    [X] Setup JWT strategy (Passport)
    [X] Setup Prisma (init + schema)
    [X] Create feature-based folder structure
    [X] Configure environment variables

## Database(prismaORM)
[X] Create models

    [X] User
        - id
        - email
        - name
        - bio
        - photo
        - lastOnline
        - isOnline
        - createdAt
    [X] UserFriends
        - id
        - useriId {FK → User.id}
        - friendId {FK → User.id}
        - status ("PENDING", "ACTIVE", "BLOCKED")
        - createdAt
    [X] Channel
        - id
        - type {"FRIENDS","GROUP"}
        - createdAt
        -name
    [X] ChannelMember
        - id (or composite key)
        - channelId {FK → Chnl.id}
        - userId {FK → User.id}
        - ismMod (default: false)
        - joinedAt
    [X] Message
        - id
        - channelId {FK → Channel.id}
        - userId {FK → User.id}
        - content
        - created_at
        - reply_to {FK → Message.id}
    [X]refreshToken
        - id
        - createdAt
        - expiresAt
        - revoked
        - token
        - userId { FK → user.id}
## Migration & seed
    [X] Run initial migration

    [X/pending production] Seed data
        [X/pending production] channel: {global}
## Services
    [X]Authentication:-
        [X] register new user
        [X] login 
        [X] create access token
        [X] create refresh token
        [X] validate refresh token
        [X] revoke refresh token
        [X] get user by id
    [X]Authorization:-
        [] Only channel members can access msgs
        [] Only messag author can edit/delete (or mod)
        [] Only mods can remove users
        [] Only addressee can accept frnd request
        [] Blocked users cannot:
            - send frnd requests
            - create DMs
    [X]User Services:-
        [X] getUserById
        [X] editcurrentUser
        [X] getcurrentuserDashboard

    []Channel services:-
        O-> authenticate routes
        [X] createChnl
        [X] createDmChnl (2 users only) * implemented into the accept friend request
        [X] getAllChnls (user-specific)route
        [X] getChnlById (without members , or message info)
        [] requestJoinChnl
 
        O-> channelMember routes
        [X] getChnlById (with members , or message info)
        [] leaveChnl

        O-> moderated routes
        [] getJoinRequests
        [] getJoinRequstbyId
        [] acceptRequest
        [] rejectRequest

        [] addUserToChnl (mod only)
        [] enableModPriv
        [] removeUserFromChnl

    []Message services:-
        []createMsg(is reply if og msg id provided)
        []editMsg
        []deleteMsg
        []getMsgByChnlId

    [X]Friend services:- 
        [X] getFrndsByUserId (accepted only)
        [X] getFrndRequests (pending)
        [X]createFrndRequest
        [X]acceptFrndRequest
        [X]removeConnection * this acts as both reject request and terminate friendship!
        [X]getFriendById


## Authentication
    [X]Register logic (hash password)
    [X]Login logic (verify password)
    [X]JWT access token generation
    [X]JWT access token validation middleware
    [X]refresh token generation
    [X]refresh token validation 

## Input validation
    [X]register validation
    [X]login validation
    [X]user update validation
    [X] chnl creation validation
    [] frnd request validation
    [] msg validation

## Error handelling
    [] standradize sending error messages with {code: "error_code", err: "relevant error message"}
    [] 400 validation error
    [] 401 unauthorized
    [] 403 forbidden
    [] 404 not found
    [] 500 server error
    [] global error middleware

## Routers
    []IndexRouter
    [X]AuthRouter
    [X]userRouter
    []chnlRouter
    []frndRouter
    []msgRouter

## Controllers
    [X]authController
        [X]registerUser
        [X]Login
        [X]logout
        [X]access token refresh

    [X]userController
        [X]getcurrentuser
        [X]getuserdashboard
        [X]editUserProfile(user only)
        [X]getOtherUsersbyId
        []BlockUser

    []frndController
        [X]getUserFrndReqs
        [X]getUserFrndList
        []sendFrndReq
        [X]AcceptFrndReqById
        []rejectFrndReqById
        []removeFrndFromList

    []chnlController
        []createDmChnl
        []createChnl (mods only)
        []getUserChnls
        []getChnlById
        []reqJoinChnl
        []addUserToChnl
        []leaveChnl
        []enableModPriv
        []removeUserFromChnl (mod only)

    []msgController
        []createMsg
        []editMsg
        []deleteMsg
        []getMsgByChnlId




## Middleware
    [X]requireAuth(rout protection)
    [X]requireChnlMember(members only)
    [X]requireMod

