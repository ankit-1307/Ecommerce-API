## Hosted Project

[E-Commerce API Render URL](https://node-course-e-commerce.onrender.com/)

#### Setup Basic Express Server

-   [] import express and assign to variable
-   [] setup start port variable (5000) and start function

#### Connect To DB

-   [] get connection string
-   [] setup .env with MONGO_URL variable and assign the value
-   [] import 'dotenv' and setup package
-   [] import connect() and invoke in the starter
-   [] restart the server
-   [] mongoose V6 info

#### Basic Routes and Middleware

-   [] setup / GET Route
-   [] setup express.json() middleware
-   [] setup 404 and errorHandler middleware
-   [] import 'exress-async-errors' package

#### 404 vs ErrorHandler Middleware

#### Morgan Pacakge

-   [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model

-   [] create models folder and User.js file
-   [] create schema with name,email, password,role (all type:String)
-   [] export mongoose model

#### Validator Package

-   [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure

-   [] create controllers folder
-   [] add authController file
-   [] export (register,login,logout) functions
-   [] res.send('some string value')
-   [] create routes folder
-   [] setup authRoutes file
-   [] import all controllers
-   [] setup three routes
-   [] post('/register') post('/login') get('/logout')
-   [] import authRoutes as authRouter in the app.js
-   [] setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller

-   [] create user
-   [] send response with entire user (only while testing)
-   [] check if email already in use (schema and controller)
-   [] ignore 'role'
-   [] alternative 'admin' setup

#### Handle Password

-   [] UserSchema.pre('save') - hook
-   this points to User
-   bcrypt.genSalt - number of rounds
-   bcrypt.hash

#### JWT

-   [] require 'jsonwebtoken' package
-   [] create jwt - jwt.sign(payload,secret,options)
-   [] verify jwt - jwt.verify(token,secret)
-   [] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
-   [] restart the server !!!!
-   [] refactor code, create jwt functions in utils
-   [] refactor cookie code
-   [] setup func attachCookiesToResponse
-   [] accept payload(res, tokenUser)
-   [] create token, setup cookie
-   [] optionally send back the response

#### Login Route

-   [] check if email and password exist, if one missing return 400
-   [] find user, if no user return 401
-   [] check password, if does not match return 401
-   [] if everything is correct, attach cookie
    and send back the same response as in register

#### Logout Route

-   [] set token cookie equal to some string value
-   [] set expires:new Date(Date.now())

#### User Routes Structure

-   [] add userController file
-   [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
-   [] res.send('some string value')
-   [] setup userRoutes file
-   [] import all controllers
-   [] setup just one route - router.route('/').get(getAllUsers);
-   [] import userRoutes as userRouter in the app.js
-   [] setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser

-   [] Get all users where role is 'user' and remove password
-   [] Get Single User where id matches id param and remove password
-   [] If no user 404

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup

-   [] hardcode

#### Authorize Permissions Complete

-   [] introduce params

#### ShowCurrentUser

-   [] get user from req
-   [] send response with user

#### UpdateUserPassword

-   [] almost identical to login user
-   [] add authenticateUser middleware in the route
-   [] check for oldPassword and newPassword in the body
-   [] if one missing 400
-   [] look for user with req.user.userId
-   [] check if oldPassword matches with user.comparePassword
-   [] if no match 401
-   [] if everything good set user.password equal to newPassword
-   [] await user.save()

#### createTokenUser in Utils

-   [] create a file in utils (createTokenUser)
-   [] setup a function that accepts user object and returns userToken object
-   [] export as default
-   [] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

-   [] add authenticateUser middleware in the route
-   [] check for name and email in the body
-   [] if one is missing, send 400 (optional)
-   [] use findOneAndUpdate()
-   [] create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()

#### Setup and Apply checkPermissions()

#### Product Model

-   [] create Product.js in models folder
-   [] create Schema
-   [] name : {type:String}
-   [] price: {type:Number}
-   [] description: {type:String}
-   [] image: {type:String}
-   [] category: {type:String}
-   [] company: {type:String}
-   [] colors: {type:[]}
-   [] featured: {type:Boolean}
-   [] freeShipping: {type:Boolean}
-   [] inventory:{type:Number}
-   [] averageRating:{type:Number}
-   [] user
-   [] set timestamps
-   [] export Product model

#### Product Structure

-   [✔️] add productController file in controllers
-   [✔️] export (createProduct, getAllProducts,
    getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
-   [✔️] res.send('function name')
-   [✔️] setup productRoutes file in routes
-   [✔️] import all controllers
-   [✔️] only getAllProducts and getSingleProduct accessible to public
-   [✔️] rest only by admin (setup middlewares)
-   [✔️] typical setup
-   [✔️] router.route('/uploadImage').post(uploadImage)
-   [✔️] import productRoutes as productRouter in the app.js
-   [✔️] setup app.use('/api/v1/products', productRouter)

#### Product Routes in Postman

#### Create Product

-   [✔️] create user property on req.body and set it equal to userId (req.user)
-   [✔️] pass req.body into Product.create
-   [✔️] send back the product

#### Remaining Controllers (apart from uploadImage)

-   [✔️] getAllProducts
-   [✔️] getSingleProduct
-   [✔️] updateProduct
-   [✔️] deleteProduct
-   [✔️] typical CRUD, utilize (task or job) project
-   [✔️] remember we check already for role 'admin'

#### Upload Image

-   [✔️] if some question, re-watch 07-file-upload
-   [✔️] images folder with two images
-   [✔️] implement the logic using multer for single and multiple file uploads
-   [✔️] upload the image from local to cloudinary

#### Review Model

-   [✔️] create Review.js in models folder
-   [✔️] create Schema
-   [✔️] rating : {type:Number}
-   [✔️] title: {type:String}
-   [✔️] comment: {type:String}
-   [✔️] user
-   [✔️] product
-   [✔️] set timestamps
-   [✔️] export Review model

#### Review Structure

-   [✔️] add reviewController file in controllers
-   [] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
-   [] res.send('function name')
-   [] setup reviewRoutes file in routes
-   [] import all controllers
-   [] only getAllReviews and getSingleReview accessible to public
-   [] rest only to users (setup middleware)
-   [] typical REST setup
-   [] import reviewRoutes as reviewRouter in the app.js
-   [] setup app.use('/api/v1/reviews', reviewRouter)

#### Create Review

-   [] check for product in the req.body
-   [] attach user property (set it equal to req.user.userId) on to req.body
-   [] create review
-   [] don't test yet

#### Get All Reviews and Get Single Review

-   [] both public routes, typical setup

#### Delete Review

-   [] get id from req.params
-   [] check if review exists
-   [] if no review, 404
-   [] check permissions (req.user, review.user)
-   [] use await review.remove()
-   [] send back 200

#### Update Review

-   [] get id from req.params
-   [] get {rating, title comment} from req.body
-   [] check if review exists
-   [] if no review, 404
-   [] check permissions
-   [] set review properties equal to rating, title, comment
-   [] use await review.save()
-   [] send back 200

#### Populate

#### Virtuals

#### Get Single Product Reviews

#### Remove All Reviews

#### Aggregation Pipeline - Atlas and Code

#### Order Schema

-   [] create Order.js in models folder
-   [] create Schema
-   [] tax : {type:Number}
-   [] shippingFee: {type:Number}
-   [] subtotal: {type:Number}
-   [] total: {type:Number}
-   [] orderItems:[]
-   [] status:{type:String}
-   [] user
-   [] clientSecret:{type:String}
-   [] paymentId:{type:String}
-   [] set timestamps
-   [] export Order model

#### Order Structure

-   [] add orderController file in controllers
-   [] export (getAllOrders, getSingleOrder, getCurrentUserOrders,
    createOrder, updateOrder) functions
-   [] res.send('function name')
-   [] setup orderRoutes file in routes
-   [] import all controllers
-   [] authenticate user in all routes
-   [] getAllOrders admin only
-   [] typical REST setup
-   [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
-   [] import orderRoutes as orderRouter in the app.js
-   [] setup app.use('/api/v1/orders', orderRouter)

#### Order in Postman

#### Create Order

-   [] most complex

#### Get All Orders and Get Single Order

-   [] getAllOrders - admin only
-   [] getSingleOrder - chechPermissions

#### Get Current User Orders

-   [] find orders where user is equal to req.user.userId

#### Update Order

-   [] get order id
-   [] get paymentIntentId (req.body)
-   [] get order
-   [] if does not exist - 404
-   [] check permissions
-   [] set paymentIntentId and status as 'paid'
-   [] order.save()

#### Create Docs

-   [] [Docgen Library] (https://github.com/thedevsaddam/docgen)
-   [] Export Postman Collection
-   [] docgen build -i fileName.json -o index.html
-   [] create index.html in public

#### Security Packages

-   [] express-rate-limiter
-   [] helmet
-   [] xss-clean
-   [] express-mongo-sanitize
-   [] cors (cookies!!!!)

#### Deploy on Heroku

-   [] heroku account and heroku cli
-   [] remove/copy from the main repo
-   [] add dev command "nodemon app.js"
-   [] change start to "node app.js"
-   [] setup node version in package.json
-   [] "engines": {"node": "14.x"}
-   [] Procfile "web: node app.js"
-   [] remove existing git repo
-   [] rm -rf .git - mac,
-   [] git init
-   [] git add .
-   [] git commit -m "initial commit"
-   [] heroku login
-   [] heroku create "App Name"
-   [] git remote -v
-   [] setup env vars in GUI
-   [] git push heroku master/main

```js
User.js
 email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide correct email value",
        },
    },
// here we are validating the email using the validator package

app.js
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.JWT_SECRET));
//We need to pass the secret key which we want to use as a secret if we are using signed cookies and once we have attached the cookie to a response then we can access it on all the requests

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    //creating cookie and attaching them on res
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
accessing the signed cookies
console.log(req.signedCookies);else console.log(req.cookies)

secure will be used to check if the cookie is coming from an https request only
httpOnly: it will be used to insure that the cookies are used only through http request.

Some Important Notes about express cookies:-
1.Cookies can be transferred through same domain
2.Browser attaches the cookie response itself don't need to do anything
3.cookies have size limit.
4.it is more secure in some cases as it can be accessed only using the server
5.for using the cookies on different domain we need to use cors package
CORS allows other applications to access our code, since by default only front-end on our own server can do that.
In our frontend then we can make requests giving the full path of the url


removing the cookies in case of logout
 res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });


When developing a front-end application with Create React App (CRA) and a back-end application with Express, setting up a proxy can help facilitate seamless communication between the front-end and back-end during development.
package.json
 "proxy": "http://localhost:5000"

  fetch('/api/data')
With the proxy configuration in place, the CRA development server will forward this request to http://localhost:5000/api/data.
```
