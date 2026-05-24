# Chatter Server Documentation & Usage
  this document will serve as a user manual and a referance guid to be used for the client side of the application, it will contain each route address! what values it expects and the expected return output, routs will be sorted by resource/entity 
  in a logical order  by the expected  user path of action, for example: register-> login-> add friend -> create channel -> send message 
## Authentication:
  #### info:
  this server utilizes an access&refresh token structure for continous
  and seemless user interaction without compromizing security
  * access token: is a jwt token utilizing passport.js granting the user access to     resources using the content withing jwt as proof of identity

  * refresh token: is a single use custome made encrypted token thats used to re authenticate a new pair of access& refresh tokens
 ### Request Routes:
  #### Register:
   creates a new user acount and automatically join them to a global channel group!.

   route:`POST:/auth/register`.

   recieves:

   ```
    {
    email,
    name,
    password,
    confirmPassword
    }
   ```
  #### Log in:
  utelizes passport.js to authenticate user, sets up a jwt token and refresh token
  route:`POST:/auth/login`

  recieves:
  ```
  {email, password}
  ```
  returns:
  ```
  {
    threadId,
    user:{
        id,
        email,
        name,
        bio,
        photo,
        createdAt,
        lastOnline,
    },
    accessToken,
    refreshToken
  }
  ```
  #### refresh:

  re-authenticates a new jwt access token, when  provided a valid refresh token, refresh tokens can only be used once to reauthenticate a new access refresh pair`note: always provide the latest refresh token else server will auto wipe the refreshtoken tree for user, on invalid token usageas a security measure`

  route:`POST:/auth/refresh` (authentication protected)

  expects: `{rToken,threadId} and a valid jwt token` and a valid jwt token

  returns:
  ```
  {
    threadId,
    user:{
        id,
        email,
        name,
        bio,
        photo,
        lastOnline,
        isOnline,
        createdAt
    },
    accessToken,
    refreshToken
  }
  ```
## User:-
  #### Get user/Me:
   is a compiset route accessing multiple resources and entities to populate the users dathboboard with all relevant data!

   route:`GET:/user/me`. (authentication protected)

   recieves: `a valid jwt token`> provided by a valid jwt token using passport.js
   
   return:
   ```
   {
    user{
      id, 
      name, 
      bio,
      photo
      },
    channels:[
        {
        id, 
        name,
        type
        },
      ],
    friends:[
        {
        id,
        name,
        photo,
        bio,
        onlineStatus,
        },
      ]
   }
   ```
  #### Get my profile:

  gets user data for user profile
  route:`GET:/user/me`. (authentication protected)

  recieves: `a valid jwt token`> provided by a valid jwt token using passport.js

  returns:
  ```
  {
    id,
    email,
    name,
    bio,
    photo,
    lastOnline,
    isOnline,
    createdAt
}
  ```
  #### Edit my profile

  route: `PUT:/user/me/profile`(authentication protected)

  expects: `valid jwt token`and:
  ```
  {
    name,
    bio,
    photo,
  }
  ```
  returns: `{msg: 'updated successful'}`
  #### GetOtherUsersProfile:

  route: `GET:/user/:id`(authentication protected)

  expects:` a valid jwt token + req.params.id`

  returns: 
  ```
  {
    id,
    email,
    name,
    bio,
    photo,
    lastOnline,
    isOnline,
    createdAt
  }
  ```
## Friends:-
  #### Get friends:
  gets an array of objects that represent the friendship entity where status is 'ACTIVE', containing the friends data
  route: `GET:/friend/`
  
  expects" `a valid jwt token`
  
  returns:
  ```
  {
    [
      {
        id,
        friend:{
          id,
          email,
          name,
          bio,
          photo,
          lastOnline,
          isOnline,
          createdAt
        }
      }
    ]
  }
  ```
  notice: `id` referances the id of the relationship record itself  not the friend entity
  #### get pending Friend requests
  gets all friendship entities with a status of 'PENDING'

  route: `GET:/friend/requests`

  expects:`expects a valid  jwt token`

  returns
  ```
  {
    id,
    friend:{
      id,
      email,
      name,
      photo
    }
  }
  ```
  #### accept friend request
  updates the relationship status to 'ACTIVE' and
  creates a two way friend type communication channel
  
  route:`PUT:/friend/accept_request`

  expects: `a valid jwt token + {requestId} in req.body` 
  
  returns:
  ```
  {
    {
      id,
      createdAt,
      friendId,
      userId,
      status
    },
    channelId
  }
  ```
  #### send friend request
  creates a new realtionship entity between sender and reciever with a status of 'PENDING'

  route: `POST:/friend/send-request`

  expects: `valid jwt token + req.body: {recieverId}`

  returns:
  ```
  {
    id,
    status,
    createdAt,
    userId,
    friendId
  }
  ```
  #### reject friend request
  this rout and delets the relationship entity

  route:`DELET:/friend/reject-request`

  expects: `a valid jwt token + req.body:{requestId}`

  returns: `{msg: 'friend request rejected!'}`
  #### end friendship
  like reject request this delets the relationship but additionally delets the communication channel and channel member entities belonging to the channel and its user

  route: `DELETE:/friend/`

  expects: `jwt token, req.body{relationId, channelId}`

  returns: `{msg: 'friend removed!'}`
## Channels:-
  all channel routes are devided by presmission level with  authenticated  being the lowes level for authrizing general information viewing and join requests, being a member grants access to interactive features and access to internal group info, and mode level access grants  filtering and editorial access on the channel, from moderating who gets access which messages are not allowed and who gets kicked out on group rule violations
//======= AUTHENTICATED Routes===========
  #### get channel info

  route: `GET:/channel/:id/info`

  expects: `valid jwt tojken`

  returns: 
  ```
  {
    id,
    name,
    createdAt,
    type,
  }
  ```
  #### create New Channel

  route: `POST:/channel/new`

  expects: ` valid jwt token, {name}`

  returns:
  ```
  {
    name,
    type,
    members,
  }
  ```
  #### join channel Reques

  route: `POST:/channel/:id/joinreq`

  expects: `valid jwt token`

  return `"request created"`
  
  //======= MEMBERS Routes===========
  #### get dm channel
  route: `GET:/friend/:id/dm`

  expects: ` a valid  jwt token + req.param:{channelID}`
  
  returns:
  ```
  {
    id,
    name,
    createdAt,
    type,
    memeber[
             {
            id,    <-denotes the relation entity id
            isMod, <- irrelevant to dm channels
            user{
                id,
                name,
                photo
            }
        }
    ],
    messages[],
  }
  ```
  #### get group channel


  route: `GET:/friend/:id`

  expects: ` a valid  jwt token + req.param:{channelID}`
  
  returns:
  ```
  {
    id,
    name,
    createdAt,
    type,
    memeber[
             {
            id,    <-denotes the relation entity id
            isMod,
            user{
                id,
                name,
                photo
            }
        }
    ],
    messages[],
  }
  ```
  #### leave channel
  route: `PUT:/channel/:id/leave`
  expects: ` jwt token, req.param:{channelId}, req.body{relationId}`
  returns: `{msg: "Connection Terminated"}` 
//======= MODERATION Routes===========
  #### get all join requests
  route: `GET:/channel/:id/mod/joinreq`
  expects `jwt token + req.param":{channelId}, mod auth`
  returns:
  ```
  [
    {
      id,
      channelId,
      isMember,
      isMod,
      userId,
      joinedAt
    }
  ]
  ```
  #### accept join request
  route:`PUT:/channel/:id/mod/acceptreq`
  expects:`jwt token + req.param{channelId} + relationId + modauth`
  returns:`{msg: "request accepted"}`
  #### reject join request
  route:`PUT:/channel/:id/mod/rejectreq`
  expects:`jwt token + req.param{channelId} + relationId + modauth`
  returns:`{msg: "request rejected"}`
  #### remove User
  route:`DELETE://channel/:id/mod/removeuser`
  expects:`jwt token + req.param{channelId} + relationId + modauth`
  returns:`{msg: "user removed!"}`
  #### enable new mod
  route:`POST:/channel/:id/newmod`
  expects:`jwt token + req.param{channelId} + relationId + modauth`
  returns`{msg: "mod privillage enabled"}`

## Messages:-