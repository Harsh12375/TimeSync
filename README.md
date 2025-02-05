# TimeSync - Smart Meeting Scheduler

TimeSync is a modern web application that helps teams schedule meetings across different time zones. It automatically suggests optimal meeting times based on participants' time zones and working hours.


![image](https://github.com/user-attachments/assets/7b5a2756-a3d1-4a61-bad3-dc2b86e5b856)
![image](https://github.com/user-attachments/assets/d4f435e8-172b-4bd9-bef4-f03ac0793a05)
![image](https://github.com/user-attachments/assets/6defcc8c-810a-4a44-9ba9-cc28c684ab92)
![Screenshot 2025-02-05 225212](https://github.com/user-attachments/assets/7977003f-fb15-4dca-98f7-b18e4b982f08)
![Screenshot 2025-02-05 225238](https://github.com/user-attachments/assets/54e1e2e3-18fc-4c8e-9882-acc8606a5bc7)

## Features

- 🌍 Smart time zone handling
- ⚡ Automatic meeting time suggestions
- 🎯 Meeting time optimization based on working hours
- 💫 Beautiful dark theme with cursor light effects
- 📱 Fully responsive design
- 🔄 Real-time time zone conversions

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd timesync
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start and be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage Guide

### Creating a Meeting

1. Click "Create Meeting" on the landing page or navigation bar
2. Fill in the meeting details:
   - Meeting title
   - Add participants with their email addresses and time zones
   - Add optional meeting notes
3. Click "Find Best Times"
4. Select from the suggested meeting times
5. Click "Confirm Meeting"

### Managing Meetings

- View all meetings in the Dashboard
- Filter meetings by upcoming/past
- Edit or delete meetings as needed
- View meeting details including local times for all participants

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # React context providers
├── pages/            # Main application pages
└── main.tsx         # Application entry point
```

## Key Technologies

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons
- Vite

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Cursor light effect inspired by modern web design trends
- Time zone handling powered by the JavaScript Intl API
- Icons provided by [Lucide](https://lucide.dev/)
