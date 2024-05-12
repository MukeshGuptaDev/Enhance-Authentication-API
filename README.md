# Node-Backend-API

An Authentication API with features mentioned below:

1. As a user, you can register a new account.
2. As a user, you can log in.
3. As a user, you can log in or register with Google.
4. As a user, you can sign out.
5. As a user, you can see your profile details.
6. As a user, you can edit your details including: photo, name, bio, phone, email, and password.
7. As a user, you can provide an image URL.
8. As a user, you can choose to make your profile public or private.
9. If you are an admin user, you can see both public and private user profiles.
10. If you are a normal user, you can only see public user profiles.

This API, uses node js for backend, MongoDB as database.

Steps to setup repo locally:

1. Download the package or fork the repo.
2. Install all project  dependencies using npm install commmand.
3. Go to <https://console.developers.google.com/> and register and application with google.
4. Your application will be issued a client ID and client secret, which need to be provided in .env file as GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET.
5. Create a random string (require('crypto').randomBytes(64).toString('hex')) for express-session and put it in .env file as SECRET.
6. Create a random string (require('crypto').randomBytes(64).toString('hex')) for jwt and put it in .env file as ACCESS_TOKEN_SECRET.
7. Add PORT=3000 in .env file.
8. Install MongoDB locally using this guide <https://www.mongodb.com/docs/manual/installation/>.
9. Do npm run test.
10. Register a user.
11. Login.

Note:
You cannot create an admin user by default, you have to set isAdmin property of the user from mongodb CLI.