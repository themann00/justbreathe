justbreathe: A Visual Breathing Assistant
A minimalist, browser-based relaxation tool designed to guide users through multiple proven breathing techniques, including the 4-7-8 method, Box Breathing, and the 3-3-3 "Calming Triangle".

Built entirely with HTML5 Canvas and Vanilla JavaScript, this widget uses rhythmic geometric animation to reduce anxiety, aid focus, and help users regain control of their breath.

(Note: Replace this image link with a screenshot of your actual app once deployed)

📖 About The Project
This project creates a "visual lung" that expands and contracts to synchronize with human breathing patterns. Unlike simple CSS animations, this application uses a JavaScript State Machine to handle precise timing for different respiratory techniques.

The animation uses sine-wave mathematics for organic "easing" during inhalation and linear progression for controlled exhalation, creating a natural feel that helps prevent hyperventilation.

✨ Features
🌬️ Multiple Breathing Modes
4-7-8 (Deep Relaxation): The classic "natural tranquilizer." Inhale (4s), Hold (7s), Exhale (8s).

Box Breathing (Focus): Used by Navy SEALs and great for kids. Inhale (4s), Hold (4s), Exhale (4s), Rest (4s).

3-3-3 (Calming Triangle): A quick anxiety reset for when you feel panic. Inhale (3s), Hold (3s), Exhale (3s).

⚙️ User Controls
Dark Mode: A built-in toggle switch for night-time use or light sensitivity.

Session Timer: Select session durations from 1 to 5 minutes.

Technique Selector: Instantly switch between breathing patterns via a dropdown.

🎨 Visual & Text Cues
Color Coded Phases: Green for Inhale, Blue for Hold, Purple for Exhale, Orange for Rest.

Smart Text: Displays instructions ("Breathe In", "Hold") synchronized with the animation.

Pulse Effect: The box gently pulses during "Hold" phases so users know the app hasn't frozen.

🚀 How to Run
Because this project is built as a single-file application, deployment is instant and requires zero build steps.

Clone the repository:

Bash

git clone https://github.com/yourusername/justbreathe.git
Open the file: Navigate to the folder and open index.html in any modern web browser (Chrome, Safari, Firefox, Edge).

🛠️ Configuration
The application is designed to be easily customizable. You can adjust the timing, colors, or add new techniques by modifying the techniques object at the top of the <script> tag in index.html:

JavaScript

const techniques = {
    '478': {
        phases: [
            { name: 'inhale', duration: 4, label: "Breathe In...", color: '#77dd77' },
            { name: 'hold', duration: 7, label: "Hold...", color: '#89CFF0' },
            { name: 'exhale', duration: 8, label: "Exhale Slowly...", color: '#b39eb5' }
        ]
    },
    // Add your own custom patterns here...
};
🧠 The Science
4-7-8: Activates the parasympathetic nervous system to reduce stress.

Box Breathing: Regulates the autonomic nervous system and improves concentration.

3-3-3: A shorter cycle designed to disrupt the feedback loop of panic attacks.

📄 License
This project is open source and available under the MIT License.
