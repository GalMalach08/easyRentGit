# EasyRent
Easyrent is a responsive, end to end application that allows you to:

- Log in by email or by google

- Find apartments for rent and for sublet in Tel Aviv

- Use a filtered search to see only the apartments that are relevant to you

- Chat with a chatbot and mark your preferences for the apartment.
The app will identify when new apartments come up on the app, and send an email to you if they matched your preferences

- Apartment owner? upload a new apartment to the app and increase your chances of renting your apartment

- The app is available in Hebrew and English - just click on the preferred language in the top menu

- Link to a running version on heroku : https://easyrent2023.herokuapp.com/

### Tech Stack
**Client** : React.js,
**Server** : Node.js,
**Database** : MongoDB

### Features
- All the forms are controlled by formik- open source form library for React 
- Connect with Google's api to allow quick connection through Google and view each apartment on the map
- A chatBot that keeps the user's preferences for an apartment (location, number of rooms and price). The app will identify the relevant apartments and will update the user by email.
- Every apartment that gets uploaded on the app must pass a manager's approval and only then it will be displayed in a user's page
- User verification by email - an unverified user actions in the application are restricted
- 
### Installation
1. #### Click here for the deploying version https://easyrent2023.herokuapp.com/
2.  #### Clone the repository
- git clone https://github.com/GalMalach08/easyRentGit.git
- Open the repository folder using your favorite text editor/cmd
- Run the command "npm install" in the **root directory** and in the **client directory**
- Run the command "npm run dev" from the root directory to run the app
- Sit back and relax while the application is loading

### Screenshots
- **Log in page**

![Easyrent-log in](https://user-images.githubusercontent.com/75367465/179487339-f5d5b5ea-ac4c-4da5-ad76-093b1215c7af.jpeg)

![eaEasyrent-home page](https://user-images.githubusercontent.com/75367465/179487371-66db76a9-1457-472a-9e68-e21d6530e919.jpeg)

![Easyrent-google log in](https://user-images.githubusercontent.com/75367465/179487121-fc2271d8-5a15-40e0-adda-63b70a8d5995.jpeg)

