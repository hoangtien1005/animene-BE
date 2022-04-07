# animene-server
Animene backend server

# API Endpoints:

## Auth

**[POST]**  ```/auth/login```  &nbsp;&nbsp;  _Login user_
<br>

**[POST]**  ```/auth/signup```  &nbsp;&nbsp;  _Signup user_
<br>

**[POST]**  ```/auth/reset-password```  &nbsp;&nbsp;  _Reset user password_
<br>

## User

**[GET]**  ```/user?page=1&perPage=50```  &nbsp;&nbsp;  _Get a list of users_
<br>

**[GET]**  ```/user/:id```  &nbsp;&nbsp;  _Get a user by id_
<br>

**[PUT]**  ```/user/:id```  &nbsp;&nbsp;  _Update the current user_
<br>

**[DELETE]**  ```/user/:id```  &nbsp;&nbsp;  _Delete the current user_
<br>

**[GET]**  ```/user/:id/favorites?page=1&perPage=50```  &nbsp;&nbsp;  _Get a list of user favorites media_
<br>

**[POST]**  ```/user/:id/favorites```  &nbsp;&nbsp;  _Create a new favorites media_
<br>

**[DELETE]**  ```/user/:id/favorites/:media_id```  &nbsp;&nbsp;  _Delete the current favorites media_
<br>

## Post

**[GET]**  ```/post?page=1&perPage=50```  &nbsp;&nbsp;  _Get a list of posts_
<br>

**[GET]**  ```/post/:id```  &nbsp;&nbsp;  _Get a post by id_
<br>

**[PUT]**  ```/post/:id```  &nbsp;&nbsp;  _Update the current post_
<br>

**[DELETE]**  ```/post/:id```  &nbsp;&nbsp;  _Delete the current post_
<br>

## Favorites

**[GET]**  ```/favorites?page=1&perPage=50```  &nbsp;&nbsp;  _Get a list of all favorites media_
<br>

## Category

**[GET]**  ```/category?page=1&perPage=50```  &nbsp;&nbsp;  _Get a list of categories_
<br>

**[GET]**  ```/category/:id```  &nbsp;&nbsp;  _Get a category by id_
<br>

**[POST]**  ```/category/```  &nbsp;&nbsp;  _Create a new category_
<br>

**[PUT]**  ```/category/:id```  &nbsp;&nbsp;  _Update the current category_
<br>

**[DELETE]**  ```/category/:id```  &nbsp;&nbsp;  _Delete the current category_
<br>
