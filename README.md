# jobportal

Install MySql


Install MySql Workbench (Optional)


Install VS Code


Install Mongodb


Create SQL database named metiegrow


Update DB username, password, etc. in application.properties


Signup in Agora


Copy AGORA_APP_ID and set environment variable:
AGORA_APP_ID=4e6374a1edfe4d20a604fb0513fae8fb


Copy AGORA_APP_CERTIFICATE and set environment variable:
AGORA_APP_CERTIFICATE=d3439fabbf5548ea9c2a75f37ec7908f


During first start, run the below SQL:
insert into db_courses.calendar values(1,'mentor calendar',1713588470000,0,0,1);


Load the notification template be calling the below endpoint:
http://localhost:9091/api/admin/load-notification-templates
POST 
By app_admin only


Run with the required command:
./gradlew bootRun
java -jar backend-0.0.1.jar


Once user is signed up, activate by:
UPDATE users SET active = true WHERE id = 1;
