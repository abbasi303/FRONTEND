npm create vite@latest twquery -- --template react
cd twquery

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i vite-plugin-svgr
npm i @tanstack/react-query @tanstack/react-query-devtools axios
npm install -D @faker-js/faker
npm install @heroicons/react
npm i react-intersection-observer

tailwind.config.js:
...
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
...

main.css:
@tailwind base;
@tailwind components;
@tailwind utilities;


vite.config.js:
import svgr from 'vite-plugin-svgr'
...
plugins: [react(), svgr()],
...