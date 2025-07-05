# Conmates - AI-Powered Lease Understanding Platform

Conmates is a comprehensive renter empowerment platform that uses AI to help tenants understand their lease agreements, connect with community support, and access legal resources.

## Features

- 🤖 **GPT-4 AI Assistant** - 24/7 intelligent help with lease questions
- 📄 **Lease Analysis** - Upload and get plain-English summaries
- 👥 **Community Support** - Anonymous Q&A forum for renters
- 📚 **Legal Resources** - State-specific tenant rights guides
- 🔔 **Smart Alerts** - Never miss important lease deadlines
- 🆘 **Human Support** - Connect with housing counselors
- 🌍 **Multi-language** - Support for English, Spanish, Chinese, Arabic

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- OpenAI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/leaseasy.git
cd leaseasy
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your OpenAI API key to `.env.local`:
\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- Render
- AWS
- Google Cloud Platform

## Environment Variables

- `OPENAI_API_KEY` - Required for AI assistant functionality
- `NEXT_PUBLIC_APP_URL` - Your app's URL (for production)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI**: OpenAI GPT-4 via AI SDK
- **Styling**: Tailwind CSS
- **Components**: Radix UI + shadcn/ui
- **Language**: TypeScript
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@leaseasy.com or join our community forum.
\`\`\`

Finally, let's create a proper next.config.js:
