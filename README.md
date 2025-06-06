# Cam Fall User Center Demo - Frontend

This is the **frontend project** for the **Cam Fall User Center Demo**, built with [Next.js](https://nextjs.org/), TypeScript, and [Ant Design Pro Components](https://procomponents.ant.design/). It provides a clean, interactive, and admin-friendly interface for user management and profile editing.

![Cam Fall Logo](./public/cam_fall.png)



## ✨ Features

- ✅ User registration, login, and logout  
- ✅ Authentication state persisted via Context + LocalStorage  
- ✅ Edit personal user profile  
- ✅ Role-based access control (Admin/User)  
- ✅ Admin user list management with editable table  
- ✅ Toast notifications for actions (success/error/loading)  
- ✅ Responsive UI with dark mode support  
- ✅ Powered by ProTable (Ant Design Pro Components)



## ⚙️ Tech Stack

- **Framework:** Next.js 14 (App Router)  
- **Language:** TypeScript, React 18  
- **UI:** Tailwind CSS, Ant Design, Lucide Icons  
- **State Management:** React Context (AuthContext)  
- **API Communication:** Axios  
- **Notifications:** react-hot-toast  
- **Table UI:** ProTable from `@ant-design/pro-components`  
- **Assets:** Optimized with Next.js `<Image />`  



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BillFBWong/UserCenter-Demo-Frontend.git
cd UserCenter-Demo-Frontend
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server
```bash
npm run dev
# or
yarn dev
```


## 📁 Project Structure
```bash
src/
├── app/                # App Router pages
│   ├── login/          # Login view
│   ├── register/       # Register view
│   └── dashboard/      # Authenticated dashboard views
│       ├── profile/    # User profile page
│       ├── welcome/    # Dashboard landing
│       └── userList/   # Admin user list
│
├── components/         # UI components
├── context/            # React contexts (Auth, Sidebar)
├── services/           # API calls (Axios wrappers)
├── types/              # TypeScript interfaces and enums
├── utils/              # Utility functions
├── public/             # Static assets (e.g., avatars, logo)
├── hooks/              # hooks
├── icons/              # some icons in the project
└── layouts             # reusable layouts
```


## 🔐 Role-Based Access

Role&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access

User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View and edit own profile

Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	Full access, including user management table


## ✅ Available Pages

Route Path &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	       Description

/login	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                User login

/register &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	        User registration

/dashboard/welcome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	Welcome page after login

/dashboard/profile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	User profile and info

/dashboard/userList &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	Admin view of all users (ProTable)



## 📦 Build & Deployment
Build the app for production:

```bash
npm run build
npm start
```

You can deploy to platforms like:

[Vercel](https://vercel.com/https://vercel.com/)

[Netlify](https://vercel.com/)

or

Your own Node.js server

Make sure to configure API URLs in auth.service.ts.



## 🧪 Sample Test Accounts

Username	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Password	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Role

maxwelljia	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    admin123	&nbsp;&nbsp;&nbsp;&nbsp;    Admin

user123	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      password	&nbsp;&nbsp;&nbsp;&nbsp;    Regular



## 🤝 Contributing
Fork this repository

Create your feature branch (git checkout -b feature/my-feature)

Commit your changes

Push to the branch (git push origin feature/my-feature)

Create a new Pull Request



## 📄 License
This project is licensed under the MIT License.
See the LICENSE file for full details.

If you find this project helpful, give it a ⭐ and share it with others!
