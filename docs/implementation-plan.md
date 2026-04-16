architecture tasks based on layers:
## Setup
    [] Initialize Express server
    [] Setup JWT strategy (Passport)
    [] Setup Prisma (init + schema)
    [] Create feature-based folder structure
    [] Configure environment variables

## Database(prismaORM)
[] Create models

    [] User
        - id
        - email
        - name
        - bio
        - photo
        - last_login
        - is_online
        - is_mod (default: false)
        - created_at

    [] Frnd
        - id
        - requester_id {FK → User.id}
        - addressee_id {FK → User.id}
        - status ("pending", "accepted", "rejected", "blocked")
        - created_at
        - updated_at

    [] Chnl
        - id
        - type_id {FK → Chnl_type.id}
        - created_at

    [] Chnl_member
        - id (or composite key)
        - chnl_id {FK → Chnl.id}
        - user_id {FK → User.id}
        - joined_at

    [] Chnl_type
        - id
        - name ("dm", "group", "server")

    [] Msg
        - id
        - chnl_id {FK → Chnl.id}
        - author_id {FK → User.id}
        - content
        - created_at
        - reply_to {FK → Msg.id}
## Migration & seed
    [] Run initial migration

    [] Seed data
        [] chnl_type: {dm, group, server}
        [] chnl: {global}
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

