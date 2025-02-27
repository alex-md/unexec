export const welcomeHtml = `<article class="container">
  <div class="welcome-card">
    <h1>Welcome to Unexec Code Playground ✨</h1>
    <p>The ultimate web development playground for creating, testing, and sharing HTML, CSS, and JavaScript code in real-time. Perfect for developers, learners, and educators.</p>
    <div class="features">
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">🎨</span>
        <h2>Live Preview</h2>
        <p>See your changes instantly with our real-time preview feature</p>
      </div>
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">⚡</span>
        <h2>Instant Updates</h2>
        <p>Experience seamless code editing with automatic updates</p>
      </div>
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">📱</span>
        <h2>Responsive Design</h2>
        <p>Test your code across different screen sizes</p>
      </div>
    </div>
    <button id="startCoding" class="cta-button">Start Creating Now!</button>
  </div>
</article>`;

export const welcomeCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f8fafc;
}

.container {
  padding: 2rem;
  width: 100%;
  max-width: 800px;
}

.welcome-card {
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(248, 250, 252, 0.1);
  backdrop-filter: blur(12px);
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;
}

.welcome-card:hover {
  transform: translateY(-5px);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
}

h2 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: #f8fafc;
}

p {
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  role: list;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
}

.feature p {
  font-size: 0.9rem;
  margin-bottom: 0;
}

.feature-icon {
  font-size: 1.75rem;
  display: inline-block;
  transition: transform 0.2s ease;
}

.feature:hover .feature-icon {
  transform: scale(1.2);
}

.cta-button {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -6px rgba(0, 0, 0, 0.2);
}

.cta-button:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`;
export const welcomeHtml = `<article class="container">
  <div class="welcome-card">
    <h1>Welcome to Unexec Code Playground ✨</h1>
    <p>The ultimate web development playground for creating, testing, and sharing HTML, CSS, and JavaScript code in real-time. Perfect for developers, learners, and educators.</p>
    <div class="features">
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">🎨</span>
        <h2>Live Preview</h2>
        <p>See your changes instantly with our real-time preview feature</p>
      </div>
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">⚡</span>
        <h2>Instant Updates</h2>
        <p>Experience seamless code editing with automatic updates</p>
      </div>
      <div class="feature" role="listitem">
        <span class="feature-icon" aria-hidden="true">📱</span>
        <h2>Responsive Design</h2>
        <p>Test your code across different screen sizes</p>
      </div>
    </div>
    <button id="startCoding" class="cta-button">Start Creating Now!</button>
  </div>
</article>`;

export const welcomeCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f8fafc;
}

.container {
  padding: 2rem;
  width: 100%;
  max-width: 800px;
}

.welcome-card {
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(248, 250, 252, 0.1);
  backdrop-filter: blur(12px);
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;
}

.welcome-card:hover {
  transform: translateY(-5px);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
}

h2 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: #f8fafc;
}

p {
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  role: list;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
}

.feature p {
  font-size: 0.9rem;
  margin-bottom: 0;
}

.feature-icon {
  font-size: 1.75rem;
  display: inline-block;
  transition: transform 0.2s ease;
}

.feature:hover .feature-icon {
  transform: scale(1.2);
}

.cta-button {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -6px rgba(0, 0, 0, 0.2);
}

.cta-button:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`;

export const welcomeJs = `const startCodingButton = document.getElementById('startCoding');

startCodingButton.addEventListener('click', () => {
  // Hide the welcome card
  const welcomeCard = document.querySelector('.welcome-card');
  welcomeCard.style.display = 'none';

  // Show the code editor and preview areas
  const editorArea = document.getElementById('editor-area');
  const previewArea = document.getElementById('preview-area');
  editorArea.style.display = 'flex';
  previewArea.style.display = 'block';

  // Optionally, you can trigger any necessary initialization for the editor and preview
  // For example, if you're using CodeMirror or Monaco Editor, you might want to initialize them here.
  // Similarly, you might want to set up any event listeners for code changes and preview updates.

  // Focus on the HTML editor (or any other editor you prefer)
  const htmlEditor = document.getElementById('html-editor'); // Assuming you have an element with this ID for the HTML editor
  htmlEditor.focus();
});`;
