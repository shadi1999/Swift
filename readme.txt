***************************************************

Swift Course - A Fast and Affordable Online Classroom System

***************************************************

^ the system is working online on this #URL: https://www.swiftcourse.me/ ^

***************************************************

^ Develepment View ^

1- install nodeJS V12.0 on your device

2- install mongoDB V4.2 on your device

3- open terminal on software directory

4- write the following commands:-

    a> npm install // to install dependencies for server side

    b> npm run client-install // to install dependencies for client side

    c> npm run dev // to run the server, client and the DB

***************************************************

^ configration ^

*/ server directory is the main directory and client directory is the Client folder and each one has 
    a file called package.json that explains the directory /*

Server port is 5000

Client port is 3000

Database port is 27017

please check the config files on both server and client sides

***************************************************

^ dir ^

--- Directory Tree ---

Folder PATH listing

Swift:.
|   .gitignore
|   compile.sh
|   package-lock.json
|   package.json
|   readme.txt
|   server.js
|   socket.js
|          
+---client
|   |   .gitignore
|   |   package-lock.json
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
|       |   logo.png
|       |   logo.svg
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
|               webrtc_adaptor-old.js
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
|       Guest.js
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
|           guests.js
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
\---static


***************************************************