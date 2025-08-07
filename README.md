<img width="1898" height="922" alt="image" src="https://github.com/user-attachments/assets/5b9537a2-6bdb-4144-935b-f174e031b385" />

# Al Qalam

This project is a simplified clone of the popular productivity application, Notion. It's designed to replicate some of the core features of Notion, providing a platform where users can create, edit, and organize their notes in a flexible and intuitive interface.

It uses Convex as the backend, which is a real-time database that allows for instant data updates. The application also uses Edgestore, a distributed key-value store, to manage the images and files uploaded by the users.The user authentication is handled by better-auth, a secure and scalable user authentication API.

## Live

Al Qalam - [https://zotion-app.vercel.app/](https://zotion-app.vercel.app/)

## Features

**Productivity and Organization**s

- 📝 Notion-style editor for seamless note-taking
- 📂 Infinite children documents for hierarchical organization
- ➡️🔀⬅️ Expandable and fully collapsible sidebar for easy navigation
- 🎨 Customizable icons for each document, updating in real-time
- 🗑️ Trash can with soft delete and file recovery options

**User Experience**

- 🌓 Light and Dark mode to suit preferences
- 📱 Full mobile responsiveness for productivity on the go
- 🛬 Landing page for a welcoming user entry point
- 🖼️ Cover image for each document to add a personal touch

**Data Management**

- 🔄 Real-time database for instant data updates
- 📤📥 File upload, deletion, and replacement options

**Security and Sharing**

- 🔐 Authentication to secure notes
- 🌍 Option to publish your note to the web for sharing

## Technologies

![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Shadcn-ui](https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-000000.svg?style=for-the-badge&logo=BetterAuth&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-ee342f.svg?style=for-the-badge&logo=Convex&logoColor=white)
![Edgestore](https://img.shields.io/badge/Edgestore-a57fff.svg?style=for-the-badge&logo=Edgestore&logoColor=white)
![Blocknote](https://img.shields.io/badge/Blocknote-ff8c00.svg?style=for-the-badge&logo=Blocknote&logoColor=white)

## Installation

1. Clone the repository
2. Install the dependencies

```
npm install
```

3. Set up the environment variables

```
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:hearty,,,,,

NEXT_PUBLIC_CONVEX_URL=https://hearty--------.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://hearty-------.convex.site
NEXT_PUBLIC_GITHUB_CLIENT_ID="your github client id"
NEXT_PUBLIC_GITHUB_CLIENT_SECRET="secret"
NEXT_PUBLIC_BETTER_AUTH_SECRET="secret"

BETTER_AUTH_SECRET="secret"
EDGE_STORE_ACCESS_KEY="secret"
EDGE_STORE_SECRET_KEY="secret"
```

4. Run Convex

```
npx convex dev
```

5. Run the development server

```
npm run dev
```

## Acknowledgements(big thanks to him)

[CodewithAntonio](https://www.youtube.com/@codewithantonio)
