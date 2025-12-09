# justbreathe
# 4-7-8 Breathing Box Widget

A minimalist, browser-based relaxation tool designed to guide users through the **4-7-8 breathing technique**. Built entirely with HTML5 Canvas and Vanilla JavaScript, this widget uses rhythmic geometric animation to reduce anxiety and aid focus.

![App Screenshot](https://via.placeholder.com/800x400?text=Breathing+Box+Screenshot+Placeholder)
*(Note: Replace this image link with a screenshot of your actual app once deployed)*

## 📖 About The Project

This project creates a "visual lung" that expands and contracts to synchronize with human breathing patterns. Unlike simple CSS animations, this application uses a JavaScript **State Machine** to handle the precise timing required for the 4-7-8 technique.

The animation uses sine-wave mathematics for organic "easing" during inhalation and linear progression for controlled exhalation.

## ✨ Features

* **Rhythmic Animation:**
    * **Inhale (4s):** Expands using a sine-ease-out curve (Green).
    * **Hold (7s):** Maintains size with a gentle "pulse" to indicate activity (Blue).
    * **Exhale (8s):** Contracts linearly to encourage steady air release (Purple).
* **Session Timer:** Users can select session durations from 1 to 5 minutes.
* **Visual & Text Cues:** Color changes and countdown timers ensure accessibility and ease of use.
* **Zero Dependencies:** Runs entirely in the browser with no external libraries or frameworks.
* **Single File Architecture:** Easy to embed in existing websites or CMS platforms (WordPress, etc.).

## 🚀 How to Run

Because this project is built as a single-file application, deployment is instant.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/breathing-box.git](https://github.com/yourusername/breathing-box.git)
    ```
2.  **Open the file:**
    Navigate to the folder and open `index.html` in any modern web browser (Chrome, Safari, Firefox, Edge).

## 🛠️ Configuration

The application is designed to be easily customizable. You can adjust the timing or colors by modifying the configuration objects at the top of the `<script>` tag in `index.html`:

```javascript
// Timing (in seconds)
const phases = {
    inhale: 4,
    hold: 7,
    exhale: 8
};

// Color Palette
const colors = {
    inhale: '#77dd77', // Pastel Green
    hold:   '#89CFF0', // Baby Blue
    exhale: '#b39eb5'  // Pastel Purple
};
