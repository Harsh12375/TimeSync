# TimeSync - Smart Meeting Scheduler

TimeSync is a modern web application that helps teams schedule meetings across different time zones. It automatically suggests optimal meeting times based on participants' time zones and working hours.

![TimeSync Screenshot](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2340)

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


## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
=======
# TimeSync
A web application designed to simplify meeting scheduling across multiple time zones. Features include dynamic time zone detection, automated meeting time prediction, an interactive dark-themed UI, and email notifications, built using React.js, JavaScript, and CSS, with deployment on Vercel.
>>>>>>> cbc800ceacb42893d63a8987c1bef8b5b7ec9fdf
