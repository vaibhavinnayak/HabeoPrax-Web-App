# HabeoPrax 🚀
## Master Your Habits, Master Your Life

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/habeoprax?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/habeoprax?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/habeoprax)
![GitHub license](https://img.shields.io/github/license/yourusername/habeoprax)

*A smart, engaging habit tracking web application with Chrome extension that helps users build and maintain healthy habits through insightful statistics, motivational rewards, and an intuitive user interface.*

[🌟 Features](#features) • [🚀 Demo](#demo) • [📦 Installation](#installation) • [🛠️ Usage](#usage) • [🤝 Contributing](#contributing)

</div>

---

## 📖 About

HabeoPrax was built with a vision to make habit-building fun and effective. Whether it's drinking water, working out, or staying productive, forming habits is hard, but we believe that consistency becomes easier with clarity and rewards. Through beautiful charts, a gamified reward system, and seamless syncing via a Chrome extension, HabeoPrax empowers users to visualize their growth and stay committed.

## ✨ Features

### 🌐 Web Application
- **📊 Visual Analytics**: Interactive charts showing habit streaks, category-wise statistics, and progress tracking
- **🎮 Gamified Rewards**: Points, badges, and streak counters to boost motivation
- **👤 User Authentication**: Secure login/signup with personalized dashboards
- **📧 Email Notifications**: Automated reminders via Nodemailer
- **🔔 Web Notifications**: Real-time browser notifications for habit reminders
- **📱 Responsive Design**: Seamless experience across all devices

### 🔧 Chrome Extension
- **⚡ Quick Logging**: Log habits directly from browser toolbar
- **💾 Offline Functionality**: Works offline and syncs when back online
- **🔔 System Notifications**: Native system tray notifications
- **🎯 Lightweight UI**: Minimal interface for quick interactions

## 🛠️ Technologies Used

### Frontend
- **HTML5, CSS3, JavaScript** - Core web technologies
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive data visualizations

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **JWT + Passport.js** - Authentication and authorization
- **Nodemailer** - Email notification service

### Browser Extension
- **Chrome API** - Browser extension functionality
- **chrome.notifications API** - System notifications

### Deployment
- **Vercel** - Frontend and backend hosting platform

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Chrome browser (for extension)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/habeoprax.git
cd habeoprax
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/habeoprax

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the Application
```bash
# Start backend server
nodemon app.js

# Start frontend (in another terminal)
npm run dev

```

### 5. Install Chrome Extension
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `extension` folder
4. The HabeoPrax extension should now appear in your toolbar

## 📱 Usage

### Getting Started
1. **Sign Up**: Create your account on the web application
2. **Add Habits**: Define your habits with custom categories and goals
3. **Track Progress**: Log your daily activities and watch your streaks grow
4. **Use Extension**: Quick-log habits directly from your browser
5. **Analyze**: Review your progress with beautiful charts and statistics

### Key Features Walkthrough
- **Dashboard**: Your central hub for all habit tracking activities
- **Analytics**: Detailed insights into your habit patterns and trends
- **Rewards System**: Earn points and badges for consistency
- **Notifications**: Stay reminded with email and browser notifications

## 📊 Screenshots

*[Add screenshots of your application here]*

## 🏗️ Project Structure

```

```


## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred hosting platform
```


## 🔮 Future Scope

- **📱 Mobile Application**: Native iOS and Android apps
- **🤝 Social Features**: Community challenges and friend connections
- **🤖 AI Integration**: Machine learning for personalized recommendations
- **📈 Advanced Analytics**: Predictive insights and trend analysis
- **⌚ Wearables Integration**: Connect with fitness trackers and smartwatches

## 👥 Team

### 🎯 Mentors
- **Varshini Adurti**
  - 📞 9632079916
  - 📧 varshini.231cs204@nitk.edu.in

- **Vaibhavi Nagaraja Nayak**
  - 📞 9036096295
  - 📧 vaibhavi.231cs262@nitk.edu.in

### 👨‍💻 Mentees (Team C01)
- **Anirudh Nayak**
- **Appaji Nagaraja Dheeraj**
- **Ajitesh Kallepalli**
- **Anirudh Trichy**

## 📚 References

- [MDN Web Docs](https://developer.mozilla.org/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [React Documentation](https://reactjs.org/)
- [MongoDB University](https://university.mongodb.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- freeCodeCamp for educational resources
- Traversy Media for tutorials
- The Net Ninja for React guidance
- Simplilearn for development insights
- All open-source contributors

---

<div align="center">

**Made with ❤️ by Team C01**

</div>
