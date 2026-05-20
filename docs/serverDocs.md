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
  re-authenticates a new jwt access token, when  provided a valid refresh token, refresh tokens can only be used once to reauthenticate a new access refresh pair`note: always provide the latest refresh token else server will auto log out on user and remove all valid refresh tokens`

  route:`POST:/auth/refresh`

  expects: `{rToken}`

  returns:
  ```
  {
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
## Friends:-
## Channels:-
## Messages:-