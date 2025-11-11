# Twilio AI Automation App for Real Estate

A comprehensive real estate management application that automates communication with leads and clients using Twilio's SMS capabilities, enhanced with AI-powered responses.

## Features

- **Lead Management**: Capture, track, and manage real estate leads
- **Property Listings**: Add, edit, and manage property listings
- **SMS Communication**: Send and receive SMS messages via Twilio
- **AI Automation**: Automated responses to common inquiries
- **Dashboard**: Overview of leads, properties, and communications
- **Real-time Updates**: Track conversations and message history

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- Twilio SDK for SMS
- AI service for automated responses

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Twilio account with SMS capabilities

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

#### Backend (.env file)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/real-estate-app
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**Getting Twilio Credentials:**
1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the Twilio Console
3. Purchase a phone number with SMS capabilities
4. Add these credentials to your `.env` file

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env
```

### 4. Run the Application

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### 5. Configure Twilio Webhook (Optional)

To receive incoming SMS messages:

1. Go to your Twilio Console
2. Navigate to Phone Numbers > Manage > Active Numbers
3. Click on your phone number
4. Under "Messaging", set the webhook URL to:
   ```
   https://your-domain.com/api/communications/webhook/sms
   ```
5. For local development, use a tool like ngrok to expose your local server:
   ```bash
   ngrok http 5000
   ```
   Then use the ngrok URL in your Twilio webhook configuration.

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── leads/        # Leads management
│   │   │   ├── properties/   # Properties management
│   │   │   └── communications/ # Messages/communications
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # Global styles
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic (Twilio, AI)
│   │   └── index.ts          # Server entry point
│   └── package.json
├── requirements.md           # Project requirements
├── .cursorrules              # Cursor AI rules
└── README.md
```

## API Endpoints

### Leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Communications
- `GET /api/communications` - Get all conversations
- `GET /api/communications/:leadId/messages` - Get messages for a lead
- `POST /api/communications/:leadId/send` - Send message to a lead
- `POST /api/communications/webhook/sms` - Twilio webhook for incoming SMS

## Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## Features in Detail

### AI Automation

The app includes a rule-based AI system that automatically responds to common inquiries:
- Greetings and introductions
- Property inquiries
- Price and feature questions
- Contact requests

For more advanced AI features, you can integrate OpenAI API by:
1. Adding `OPENAI_API_KEY` to your `.env` file
2. Updating the `aiService.ts` to use OpenAI API

### SMS Communication

- Send SMS messages to leads directly from the app
- Receive incoming SMS messages via Twilio webhook
- Automatic AI responses to common questions
- Full conversation history tracking

## Security Notes

- Never commit `.env` files to version control
- Keep your Twilio credentials secure
- Use environment variables for all sensitive data
- Validate and sanitize all user inputs

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify network connectivity if using cloud MongoDB

### Twilio SMS Not Sending
- Verify your Twilio credentials in `.env`
- Check that your Twilio account has sufficient balance
- Ensure the phone number format is correct (+1XXXXXXXXXX)
- Check Twilio console for error logs

### Frontend Not Connecting to Backend
- Ensure backend server is running on port 5000
- Check that the proxy configuration in `vite.config.ts` is correct
- Verify CORS settings in backend

## Contributing

1. Follow the code style guidelines in `.cursorrules`
2. Write tests for new features
3. Commit frequently with clear messages
4. Keep components under 300 lines

## License

This project is for educational and commercial use.

## Support

For issues or questions, please check the troubleshooting section or review the code documentation.

