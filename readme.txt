***************************************************

Swift Course - A Fast and Affordable Online Classroom System

***************************************************

^ The system is working online on this #URL: https://www.swiftcourse.me/ ^

***************************************************

^ Run in Develepment Mode ^

1- Install Node.js V12.

2- Install MongoDB V4.

3- Open terminal in the project's directory.

4- Write the following commands:-

    a> npm install // to install dependencies for server side

    b> npm run client-install // to install dependencies for client side

    c> npm run dev // to run the server, client and the DB on development mode

5- Now you can browser the website through "http://localhost:3000/".

***************************************************

^ Configration ^

*/ server directory is the main directory and client directory is the "client" folder and each one has 
    a file called package.json that explains the directory and lists all the dependencies. /*

Server port is 5000

Client port is 3000

Database port is 27017

Please check the config files on both server and client side.

***************************************************

^ Documentation ^
Everything is documented as comments withing the code.

Documentation for each API endpoint can be found in the comments in "routes/api".

***************************************************

^ Code Structure ^
The client-side code is seperated from the server-side code.
Everything outside the "client" directory is server-side code.
The client-side consumes the API endpoints provided by the server-side.

In the client-side, state management is done by a method called Redux.
That's why there are three directories: "actions", "reducers" and "store.js".

***************************************************

^ dir ^

--- Directory Tree ---

Folder PATH listing

Swift:.
|   compile.sh
|   package.json
|   readme.txt
|   server.js
|   socket.js
|          
+---client
|   |   package.json
|   |              
|   +---public
|   |       favicon.ico
|   |       index.html
|   |       manifest.json
|   |       robots.txt
|   |       
|   \---src
|       |   App.css
|       |   App.js
|       |   App.test.js
|       |   Config.js
|       |   default-monochrome.svg
|       |   index.css
|       |   index.js
|       |   serviceWorker.js
|       |   setupTests.js
|       |   store.js
|       |   
|       +---actions
|       |       adimnActions.js
|       |       alert.js
|       |       auth.js
|       |       lecture.js
|       |       stream.js
|       |       studentActions.js
|       |       tutorActions.js
|       |       types.js
|       |       uploads.js
|       |       
|       +---components
|       |   |   ErrotNotFound.js
|       |   |   Home.js
|       |   |   
|       |   +---auth
|       |   |       Login.js
|       |   |       LoginAsGuest.js
|       |   |       RegisterStudent.js
|       |   |       RegisterTutor.js
|       |   |       
|       |   +---classroom
|       |   |   |   Classroom.js
|       |   |   |   Slides.js
|       |   |   |   Stream.js
|       |   |   |   TutorClassroom.js
|       |   |   |   VideoPlayer.js
|       |   |   |   
|       |   |   \---chat
|       |   |           ChatContainer.js
|       |   |           ChatMessage.js
|       |   |           
|       |   +---dashboard
|       |   |   |   HomeDashboard.js
|       |   |   |   MainDashboard.js
|       |   |   |   
|       |   |   +---admin
|       |   |   |       AddAdmin.js
|       |   |   |       AddClassroom.js
|       |   |   |       AdminDashboard.js
|       |   |   |       AdminSidebar.js
|       |   |   |       EditClassroom.js
|       |   |   |       EditStudent.js
|       |   |   |       EditTutor.js
|       |   |   |       GetClassrooms.js
|       |   |   |       StudentsList.js
|       |   |   |       TutorsList.js
|       |   |   |       
|       |   |   +---student
|       |   |   |       MyClassrooms.js
|       |   |   |       StudentDashboard.js
|       |   |   |       StudentSidebar.js
|       |   |   |       
|       |   |   \---tutor
|       |   |           MyClassroomInfo.js
|       |   |           MyClassrooms.js
|       |   |           MyLectures.js
|       |   |           TutorDashboard.js
|       |   |           TutorSidebar.js
|       |   |           
|       |   +---layout
|       |   |       AdminProfile.js
|       |   |       Alert.js
|       |   |       ContactUs.js
|       |   |       Navbar.js
|       |   |       Profile.js
|       |   |       StudentProfile.js
|       |   |       TutorProfile.js
|       |   |       
|       |   \---routing
|       |           PrivateRoute.js
|       |           Routes.js
|       |           
|       +---reducers
|       |       adminReducer.js
|       |       alert.js
|       |       auth.js
|       |       index.js
|       |       lecture.js
|       |       stream.js
|       |       studentReducer.js
|       |       tutorReducer.js
|       |       upload.js
|       |       
|       \---utils
|               setAuthToken.js
|               webrtc_adaptor.js
|               
+---config
|       default.json
|       
+---middleware
|   |   auth.js
|   |   privateRoutes.js
|   |   studentsController.js
|   |   tutorsController.js
|   |   usersController.js
|   |   
|   \---socket.io
|           auth.js
|           
+---models
|       Administrator.js
|       Classroom.js
|       Lecture.js
|       Student.js
|       Tutor.js
|       User.js
|       
+---public
|   \---files
|   
+---routes
|   \---api
|           administrators.js
|           auth.js
|           classrooms.js
|           files.js
|           streams.js
|           students.js
|           tutors.js
|           users.js
|           
+---ssl
|       private-key.pem
|       swiftcourse-cert.crt
|       www_swiftcourse_me.ca-bundle
|       

***************************************************
