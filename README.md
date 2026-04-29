# StoreIt - A Cloud Storage Solution

StoreIt is a comprehensive, full-stack Google Drive clone built with modern web technologies. It provides a secure and intuitive platform for users to upload, manage, and share their files with a premium user experience.

## Features

- **Authentication**: Secure email-based OTP (One-Time Password) verification system.
- **File Upload**: Support for multi-file uploads with real-time progress indicators and size validation (max 50MB).
- **File Management**: Rename, delete, and download files with ease.
- **Sharing System**: Share files with other users via email and manage access lists in real-time.
- **Dynamic Dashboards**:
    - **Storage Overview**: Visual breakdown of storage usage by file type (Documents, Images, Media, Others).
    - **Recent Files**: Quick access to the latest uploads.
- **Global Search**: Debounced search functionality to find files across the entire platform.
- **Premium UX**:
    - Comprehensive **Loading Skeletons** for smooth transitions.
    - **Toast Notifications** for immediate feedback on every action.
    - **Card-level Deletion Overlays** to prevent accidental interactions during processing.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern design tokens & utilities)
- **Backend-as-a-Service**: [Appwrite](https://appwrite.io/) (Database, Storage, and Authentication)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: React Hooks & Server Actions
- **Notifications**: [Sonner](https://sonner.stevenlyui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Prerequisites

Before you begin, ensure you have an [Appwrite](https://appwrite.io/) project set up with:
1. A **Database** and two collections: `users` and `files`.
2. A **Storage Bucket** for file uploads.
3. **API Key** with appropriate scopes.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tahsin005/store-it.git
   cd store-it
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Appwrite credentials:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
   NEXT_PUBLIC_APPWRITE_PROJECT="your_project_id"
   NEXT_PUBLIC_APPWRITE_DATABASE="your_database_id"
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION="your_users_collection_id"
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION="your_files_collection_id"
   NEXT_PUBLIC_APPWRITE_BUCKET="your_bucket_id"
   NEXT_APPWRITE_KEY="your_api_key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

- `app/`: Next.js App Router routes and layouts.
- `components/`: Reusable UI components and feature-specific logic.
- `hooks/`: Custom React hooks (e.g., `useToast`).
- `lib/`: Utility functions and Appwrite client/server configuration.
- `public/`: Static assets (icons, images).
- `types/`: TypeScript definitions for Appwrite documents and application state.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

## License

This project is licensed under the MIT License.
