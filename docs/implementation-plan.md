architecture tasks based on layers:
## Setup
    [X] Initialize Express server
    [] Setup JWT strategy (Passport)
    [X] Setup Prisma (init + schema)
    [X] Create feature-based folder structure
    [] Configure environment variables

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
## Migration & seed
    [X] Run initial migration

    [X] Seed data
        [X] channel: {global}
## Services
    []Authorization:-
        [] Only chnl members can access msgs
        [] Only msg author can edit/delete (or mod)
        [] Only mods can remove users
        [] Only addressee can accept frnd request
        [] Blocked users cannot:
            - send frnd requests
            - create DMs
    []User Services:-
        [] createUser
        [] getUserById
        [] editUser
        [] blockUser
        [] enableModPriv

    []Channel services:-
        [] createChnl
        [] createDmChnl (2 users only)

        [] getAllChnls (user-specific)
        [] getChnlById (with msgs + members)

        [] requestJoinChnl
        [] addUserToChnl (mod only)

        [] leaveChnl
        [] removeUserFromChnl (mod only)

    []Message services:-
        []createMsg(is reply if og msg id provided)
        []editMsg
        []deleteMsg
        []getMsgByChnlId

    []Friend services:- 
        [] getFrndsByUserId (accepted only)
        [] getFrndRequests (pending)
        []createFrndRequest
        []acceptFrndRequest
        []rejectFrndRequest
        []removeFrnd


## Authentication
    []Register logic (hash password)
    []Login logic (verify password)
    []JWT generation
    []JWT validation middleware

## Input validation
    []register validation
    []login validation
    []user update validation
    [] chnl creation validation
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
    []AuthRouter
    []userRouter
    []chnlRouter
    []frndRouter
    []msgRouter

## Controllers
    []authController
        []registerUser
        []Login
        []logout

    []userController
        []editUserProfile(user only)
        []enableModPriv

    []chnlController
        []createDmChnl
        []createChnl (mods only)
        []getUserChnls
        []getChnlById
        []reqJoinChnl
        []addUserToChnl
        []leaveChnl
        []removeUserFromChnl (mod only)

    []frndController
        []getUserFrndReqs
        []getUserFrndList
        []sendFrndReq
        []AcceptFrndReqById
        []rejectFrndReqById
        []removeFrndFromList
        []BlockUser

    []msgController
        []createMsg
        []editMsg
        []deleteMsg
        []getMsgByChnlId


## Middleware
    []requireAuth(rout protection)
    []requireChnlMember(members only)
    []requireMod

