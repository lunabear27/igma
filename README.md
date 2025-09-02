# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
igma-chatbot
├─ .env
├─ .qodo
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ igmalogo.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ ChatInput.jsx
│  │  ├─ ChatMessage.jsx
│  │  ├─ Header.jsx
│  │  └─ LoaderChat.jsx
│  ├─ main.jsx
│  └─ Services
│     └─ geminiAPI.js
├─ utils
│  └─ chatUtils.js
└─ vite.config.js

```
```
igma-chatbot
├─ .env
├─ .qodo
├─ docs
│  ├─ ACCREDITATION STATUS.docx
│  ├─ ADMISSIONS.docx
│  ├─ Board of Trustees.docx
│  ├─ Brief history of the University of the East.docx
│  ├─ College of Arts and Science Course Information.docx
│  ├─ College of Business Administration Course Information.docx
│  ├─ College of Engineering Course Information.docx
│  ├─ college school calendar.docx
│  ├─ DEPARTMENT AND FACULTY.docx
│  ├─ Department Heads.docx
│  ├─ DRRM 1&2 record.docx
│  ├─ email directory.docx
│  ├─ FREE ONLINE DATABASES.docx
│  ├─ Functions of the Office of Curriculum Development and Instruction.docx
│  ├─ k10 school calendar.docx
│  ├─ Library record.docx
│  ├─ Notable alumni of University of the East.docx
│  ├─ Office for International Affairs and External Linkages.docx
│  ├─ Offices.docx
│  ├─ online enrollment.docx
│  ├─ SAO record.docx
│  ├─ SCHOLARSHIP AND SPECIAL DISCOUNTS.docx
│  ├─ school fees for filipino students.docx
│  ├─ SCHOOL FEES FOR INTERNATIONAL STUDENTS.docx
│  ├─ shs school calendar.docx
│  ├─ The Guidance, Counseling and Career Services Office.docx
│  ├─ trunklines.docx
│  ├─ UE Department of Registration and Records Management.docx
│  ├─ UE FORMS LINK.docx
│  ├─ UE HYMN.docx
│  ├─ UE PORTAL.docx
│  ├─ UE Student Council.docx
│  ├─ UE STUDENT PORTAL RELATED.docx
│  └─ University Relation Office.docx
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ scripts
│  └─ process-docs.js
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ igmalogo.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ ChatInput.jsx
│  │  ├─ ChatMessage.jsx
│  │  ├─ Header.jsx
│  │  └─ LoaderChat.jsx
│  ├─ main.jsx
│  └─ Services
│     └─ geminiAPI.js
├─ university-data.json
├─ utils
│  └─ chatUtils.js
└─ vite.config.js

```
```
igma-chatbot
├─ .env
├─ .qodo
├─ docs
│  ├─ ACCREDITATION STATUS.docx
│  ├─ ADMISSIONS.docx
│  ├─ Board of Trustees.docx
│  ├─ Brief history of the University of the East.docx
│  ├─ College of Arts and Science Course Information.docx
│  ├─ College of Business Administration Course Information.docx
│  ├─ College of Engineering Course Information.docx
│  ├─ college school calendar.docx
│  ├─ DEPARTMENT AND FACULTY.docx
│  ├─ Department Heads.docx
│  ├─ DRRM 1&2 record.docx
│  ├─ email directory.docx
│  ├─ FREE ONLINE DATABASES.docx
│  ├─ Functions of the Office of Curriculum Development and Instruction.docx
│  ├─ k10 school calendar.docx
│  ├─ Library record.docx
│  ├─ Notable alumni of University of the East.docx
│  ├─ Office for International Affairs and External Linkages.docx
│  ├─ Offices.docx
│  ├─ online enrollment.docx
│  ├─ SAO record.docx
│  ├─ SCHOLARSHIP AND SPECIAL DISCOUNTS.docx
│  ├─ school fees for filipino students.docx
│  ├─ SCHOOL FEES FOR INTERNATIONAL STUDENTS.docx
│  ├─ shs school calendar.docx
│  ├─ The Guidance, Counseling and Career Services Office.docx
│  ├─ trunklines.docx
│  ├─ UE Department of Registration and Records Management.docx
│  ├─ UE FORMS LINK.docx
│  ├─ UE HYMN.docx
│  ├─ UE PORTAL.docx
│  ├─ UE Student Council.docx
│  ├─ UE STUDENT PORTAL RELATED.docx
│  └─ University Relation Office.docx
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ scripts
│  └─ process-docs.js
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ igmalogo.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ ChatInput.jsx
│  │  ├─ ChatMessage.jsx
│  │  ├─ Header.jsx
│  │  └─ LoaderChat.jsx
│  ├─ main.jsx
│  └─ Services
│     └─ geminiAPI.js
├─ university-data.json
├─ utils
│  └─ chatUtils.js
└─ vite.config.js

```