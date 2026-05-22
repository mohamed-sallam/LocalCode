# LocalCode - Offline Problem Solving Platform

An interactive, offline-first web-based platform for practicing and solving coding problems. Write, test, and solve algorithmic challenges directly in your browser with real-time code execution and instant feedback.

## Features

- **Offline-First**: Works completely offline after initial load
- **Live Code Editor**: Syntax-highlighted code editing with CodeMirror
- **Real-Time Code Execution**: Run and test your solutions instantly
- **Test Case Validation**: Automated testing against predefined test cases
- **Multiple Problems**: 19+ coding challenges covering various algorithms and data structures
- **Local Storage**: Your progress is automatically saved to browser storage
- **Dark Theme**: Eye-friendly Dracula color scheme
- **Responsive Design**: Works on desktop and tablet devices

## Available Problems

### Data Structures & Algorithms
- **Add Two Numbers** - Linked list operations
- **Two Sum** - Array optimization problems
- **Fibonacci** - Dynamic programming fundamentals
- **Triple Steps** - Combinatorial algorithms
- **Towers of Hanoi** - Recursive problem solving

### String & Array Problems
- **Longest Substring** - String processing and sliding window
- **Parenthesis** - Bracket matching and validation
- **Boolean Evaluation** - Expression parsing and evaluation

### Advanced Recursion & Backtracking
- **Permutations Without Duplicates** - Recursive permutation generation
- **Permutations With Duplicates** - Handling duplicate elements
- **Combinations & Power Set** - Set generation algorithms
- **Eight Queens** - Classic backtracking problem

### Graph & Grid Problems
- **Robot in a Grid** - Dynamic programming with constraints
- **Paint Fill** - Flood fill algorithm
- **Magic Index** - Binary search applications

### Optimization Problems
- **Coins** - Coin change and dynamic programming
- **Stack of Boxes** - Greedy algorithms and sorting
- **Recursive Multiply** - Bit manipulation and recursion

## How to Use

1. **Open the App**: Launch `index.html` in a modern web browser
2. **Select a Problem**: Choose from the problem list
3. **Read the Statement**: Understand the problem requirements
4. **Write Your Solution**: Code in the JavaScript editor
5. **Run Tests**: Click the test button to validate against test cases
6. **View Results**: See which test cases pass/fail with detailed output
7. **Check Solution**: View the reference solution and explanation

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - works offline

### Installation

```bash
# Clone or download this repository
cd localCode

# For development with Vite
npm install
npm run dev

# For production build
npm run build
```

## How It Works

### Architecture

```
localCode/
├── index.html          # Main application page
├── main.js            # Application entry point
├── main.css           # Styling
├── package.json       # Project configuration
│
├── lib/               # Third-party libraries (minified)
│   ├── codemirror.*   # Code editor
│   ├── marked.*       # Markdown parser
│   └── ...
│
├── modules/           # Core functionality
│   ├── codeExecutor.js    # Executes user code & runs tests
│   ├── tabManager.js      # Manages problem tabs
│   ├── storageManager.js  # Persists progress locally
│   ├── themeManager.js    # Handles dark/light themes
│   ├── timerManager.js    # Tracks coding time
│   └── resizeManager.js   # Responsive layout
│
└── problems/          # Problem definitions
    └── [problem-name]/
        ├── statement.md              # Problem description
        ├── solution.md               # Explanation & hints
        ├── solution.js               # Reference solution
        ├── solution_signatures.json  # Function signatures
        ├── testcases.json           # Test data
        ├── samplecases.json         # Sample test cases
        └── meta.json                # Problem metadata
```

### Technologies Used

- **CodeMirror**: Syntax-highlighted code editor
- **Marked.js**: Markdown parsing for problem statements
- **Vite**: Modern build tool
- **Local Storage API**: Client-side data persistence
- **Vanilla JavaScript**: No external framework dependencies

## Features Guide

### Code Editor
- Syntax highlighting for JavaScript
- Auto-completion hints
- Bracket matching and auto-closing
- Active line highlighting
- Auto-indentation

### Test Execution
- Run against provided test cases
- See detailed output for each test
- Compare expected vs actual results
- Performance metrics

### Progress Tracking
- Automatic save to browser storage
- Resume where you left off
- Track problems solved
- Timer for coding sessions

## Browser Storage

The application uses browser localStorage to persist:
- Your code solutions for each problem
- Progress and completion status
- Theme preferences
- User settings

Clear browser storage if you want to reset your progress.

## Disclaimer

⚠️ **Important Notice**: The problems included in this platform are **AI-generated**. While efforts have been made to ensure accuracy and quality, please note:

- Problems may contain errors, ambiguities, or unexpected edge cases
- Test cases are AI-generated and may not cover all scenarios
- Reference solutions are AI-generated and may not represent optimal approaches
- Always verify solutions independently and use critical thinking
- Use this platform for learning and practice, but validate your knowledge with official resources
- This is an educational tool and not an official coding challenge platform

## Limitations

- JavaScript only - cannot run other programming languages
- Execution limited to 5 seconds per test to prevent infinite loops
- No console.log output capture (returns explicit return values only)
- Code executed in sandboxed environment with no file system access

## Development

### Adding New Problems

1. Create a new folder under `problems/[problem-name]`
2. Create required JSON and JS files
3. Define problem statement in `statement.md`
4. Add test cases to `testcases.json`
5. Provide reference solution in `solution.js`

### Extending Functionality

Edit the modules in `modules/` directory to add new features like:
- Additional themes
- New language support
- Advanced analytics
- Problem difficulty ratings

## License

This project is free to use for personal and educational purposes.

## Support

For issues, suggestions, or contributions, feel free to reach out or submit feedback.
