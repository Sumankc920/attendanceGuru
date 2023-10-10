/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      backgroundImage : {
        login : "url('src/assests/Images/login.jpg')",
        teacherAvatar : "url('src/assets/Images/teacher-avatar.jpg')",
        studentAvatar : "url('src/assets/Images/student-avatar.jpg')",
        homepage : "url('src/assets/Images/homepage.jpg)",
      },
      colors : {
        kellyGreen : '#4cbb17',
        neonBlue : '#4d4dff',
        discordBlue : '#5765f2',
        discordBlack : '#37393f',
        discordWhite : '#f1f1f1',
        discordDarkBlack : '#202225',
        darkNavbar : '#242526',
        darkLeftSidebar : '#18191a',
        darkMiddlebar : '#3a3b3c',
        darkTransparent : '#242526'
      }
    },
  },
  plugins: [],
}

