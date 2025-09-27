# GrindGrid - Study Tracker

A sleek, dark-themed study tracker designed for students to monitor their academic progress across subjects, papers, and chapters. Built with modern web technologies and a minimalist aesthetic.

## Features

### **Progress Tracking**
- **Chapter Completion**: Mark chapters as complete/incomplete with visual status indicators
- **Study Sessions**: Log and track study sessions for each chapter
- **Progress Visualization**: Real-time progress bars for subjects and papers
- **Study Streaks**: Track consecutive days of study activity

### **Modern Dark UI**
- **Aesthetic Design**: Clean dark theme with purple/violet/blue accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle hover effects and transitions
- **Professional Typography**: Easy-to-read fonts with proper contrast

###**Smart Analytics**
- **Dashboard Overview**: Quick stats showing total chapters, completion rate, and streaks
- **Rating System**: Rate chapter difficulty across Academic Class, Test Papers, and Engineering QB
- **Last Studied Tracking**: Keep track of when you last worked on each topic
- **Personal Notes**: Add custom notes for each chapter

### **Productivity Tools**
- **Search Functionality**: Quickly find specific chapters or topics
- **Data Export**: Backup your progress as JSON files
- **Auto-save**: All progress automatically saved to browser storage
- **Reset Options**: Clear data when starting fresh

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grindgrid-study-tracker.git
   cd grindgrid-study-tracker
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **Start tracking!**
   - The app runs entirely in your browser
   - No server setup required
   - Data is stored locally in your browser

## Project Structure

```
grindgrid-study-tracker/
├── index.html          # Main HTML structure
├── style.css           # Dark theme styling
├── script.js           # Core functionality
└── README.md          # Project documentation
```

## How to Use

### **Getting Started**
1. **Expand Subjects**: Click on Mathematics, Physics, or Chemistry to view papers
2. **View Papers**: Click on Paper 1 or Paper 2 to see chapters
3. **Track Progress**: Use the action buttons to mark completion and add study sessions

### **Chapter Management**
- **Mark Complete**: Toggle chapter completion status
- **Add Study Session**: Log when you've studied a chapter
- **Rate Difficulty**: Use sliders to rate chapter difficulty (1-10 scale)
- **Add Notes**: Include personal notes or reminders

### **Monitoring Progress**
- **Dashboard Stats**: View overall progress at the top
- **Progress Circles**: See completion percentage for each subject/paper
- **Study Streaks**: Track your consistency
- **Search**: Use the search bar to quickly find chapters

### **Data Management**
- **Auto-save**: All changes are automatically saved
- **Export Data**: Click "Export Data" to backup your progress
- **Reset**: Use "Reset All" to clear all data (with confirmation)

## Customization

### **Adding New Subjects**
Edit the `studyData` object in `script.js`:

```javascript
const studyData = {
  "Your Subject": {
    "Paper 1": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "Paper 2": ["Chapter 4", "Chapter 5"]
  },
  // ... existing subjects
};
```

### **Modifying Rating Categories**
Update the rating parameters in the `createChapterElement` function:

```javascript
["Academic Class", "Test Paper", "Your Custom Category"]
```

### **Styling Changes**
- Edit `style.css` to modify colors, fonts, or layout
- The color palette uses CSS custom properties for easy theming
- Dark theme with purple (#8b5cf6), violet, and blue accents

## Technical Details

### **Technologies Used**
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with Flexbox/Grid
- **Vanilla JavaScript**: No framework dependencies
- **LocalStorage API**: Client-side data persistence

### **Browser Compatibility**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### **Performance**
- Lightweight: ~50KB total size
- Fast loading: No external dependencies
- Responsive: Optimized for all screen sizes
- Efficient: Minimal DOM manipulation

## Data Storage

### **Local Storage Structure**
```javascript
{
  "Mathematics_Paper 1_Algebra": {
    "status": "completed",
    "ratings": {
      "Academic Class": 7,
      "Test Paper": 8,
      "Engineering QB": 6
    },
    "notes": "Focus on quadratic equations",
    "sessions": 5,
    "lastStudied": "2024-01-15T10:30:00.000Z",
    "completed": true,
    "completedDate": "2024-01-15T10:30:00.000Z"
  }
}
```

### **Export Format**
The export feature creates a comprehensive JSON backup including:
- Complete progress data
- Study statistics
- Timestamp information
- Subject structure

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and formatting
- Test across different browsers
- Ensure mobile responsiveness
- Update documentation for new features

## Bug Reports

Found a bug? Please open an issue with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## Contact

- **GitHub**: [@shfahimdev](https://github.com/shfahimdev)
- **Email**: cto@zaktomate.com

---

**⭐ Star this repo if GrindGrid helps you stay organized!**

Made with Love for students everywhere
