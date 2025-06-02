import { useState, useEffect, useRef } from 'react';
import { Package, Moon, Sun, Copy, Check } from 'lucide-react';
import Split from 'split.js';
import Editor from './components/Editor';
import Preview from './components/Preview';
import PackageManager from './components/PackageManager';

function App() {
    const [html, setHtml] = useState('<div class="container mt-5">\n  <h1>Hello, World!</h1>\n  <p>Start coding to see your changes in real-time.</p>\n</div>');
    const [css, setCss] = useState('body {\n  font-family: system-ui, -apple-system, sans-serif;\n  color: #333;\n}\n\nh1 {\n  color: #0070f3;\n}');
    const [js, setJs] = useState('// Your JavaScript code here\nconsole.log("Hello from the playground!");');
    const [packages, setPackages] = useState([
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
    ]);
    const [darkMode, setDarkMode] = useState(false);
    const [showPackageManager, setShowPackageManager] = useState(false);
    const [activeTab, setActiveTab] = useState('html');  // Not used, but kept for potential future features
    const [copySuccess, setCopySuccess] = useState(false);

    const splitVerticalRef = useRef(null);
    const splitHorizontalRef = useRef(null);
    const splitVerticalInstance = useRef(null);
    const splitHorizontalInstance = useRef(null);

    // Handle layout splitting
    useEffect(() => {
        if (splitVerticalRef.current && !splitVerticalInstance.current) {
            splitVerticalInstance.current = Split(['.editors-container', '.preview-pane'], {
                sizes: [50, 50],
                minSize: 100,
                gutterSize: 8,
                direction: 'horizontal',
                elementStyle: (_, size, gutterSize) => ({
                    'flexBasis': `calc(${size}% - ${gutterSize}px)`,
                }),
                gutterStyle: (_, gutterSize) => ({
                    'flexBasis': `${gutterSize}px`,
                }),
                touchEvents: {
                    passive: true,
                },
            });
        }

        if (splitHorizontalRef.current && !splitHorizontalInstance.current) {
            splitHorizontalInstance.current = Split(['.html-editor', '.css-editor', '.js-editor'], {
                sizes: [33, 33, 34],
                minSize: 100,
                gutterSize: 8,
                direction: 'horizontal',
                elementStyle: (_, size, gutterSize) => ({
                    'flexBasis': `calc(${size}% - ${gutterSize}px)`,
                }),
                gutterStyle: (_, gutterSize) => ({
                    'flexBasis': `${gutterSize}px`,
                }),
                touchEvents: {
                    passive: true,
                },
            });
        }

        return () => {
            if (splitVerticalInstance.current) {
                splitVerticalInstance.current.destroy();
                splitVerticalInstance.current = null;
            }
            if (splitHorizontalInstance.current) {
                splitHorizontalInstance.current.destroy();
                splitHorizontalInstance.current = null;
            }
        };
    }, []);

    // Handle dark mode
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const addPackage = (packageUrl) => {
        if (!packages.includes(packageUrl)) {
            setPackages([...packages, packageUrl]);
        }
    };

    const removePackage = (packageUrl) => {
        setPackages(packages.filter(p => p !== packageUrl));
    };

    const getMergedCode = () => {
        return `<!DOCTYPE html>
<html class="${darkMode ? 'dark' : ''}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${packages
                .filter(pkg => pkg.endsWith('.css'))
                .map(pkg => `<link rel="stylesheet" href="${pkg}" />`)
                .join('\n        ')}
        <style>
            :root { color-scheme: ${darkMode ? 'dark' : 'light'}; }
            body { margin: 0; min-height: 100vh; }
            .dark body { background: #1a1a1a; color: #fff; }
            ${css}
        </style>
    </head>
    <body>
        ${html}
        ${packages
                .filter(pkg => pkg.endsWith('.js'))
                .map(pkg => `<script src="${pkg}"></script>`)
                .join('\n        ')}
        <script>
            ${js}
        </script>
    </body>
</html>`;
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(getMergedCode());
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={`h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
            <header className={`flex items-center justify-between px-4 h-12 border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleCopyCode}
                        className={`bg-gray-200 bg-opacity-50 border flex hover:bg-gray-200 items-center px-3 py-1.5 rounded-md space-x-2 text-sm ${darkMode
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            }`}
                    >
                        {copySuccess ? (
                            <>
                                <Check className="h-4 w-4" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                <span>Copy Merged Code</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowPackageManager(true)}
                        className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                        title="Manage packages"
                    >
                        <Package className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                        title={darkMode ? "Light mode" : "Dark mode"}
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex min-h-0" ref={splitVerticalRef}>
                <div className="editors-container min-h-0" ref={splitHorizontalRef}>
                    <div className="html-editor editor-container">
                        <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <h2 className="text-sm font-medium">HTML</h2>
                        </div>
                        <div className="editor-content">
                            <Editor
                                language="html"
                                value={html}
                                onChange={setHtml}
                                theme={darkMode ? 'vs-dark' : 'vs'}
                            />
                        </div>
                    </div>

                    <div className="css-editor editor-container">
                        <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <h2 className="text-sm font-medium">CSS</h2>
                        </div>
                        <div className="editor-content">
                            <Editor
                                language="css"
                                value={css}
                                onChange={setCss}
                                theme={darkMode ? 'vs-dark' : 'vs'}
                            />
                        </div>
                    </div>

                    <div className="js-editor editor-container">
                        <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <h2 className="text-sm font-medium">JavaScript</h2>
                        </div>
                        <div className="editor-content">
                            <Editor
                                language="javascript"
                                value={js}
                                onChange={setJs}
                                theme={darkMode ? 'vs-dark' : 'vs'}
                            />
                        </div>
                    </div>
                </div>

                <div className="preview-pane h-full flex flex-col min-h-0">
                    <div className={`flex items-center justify-between px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                        <h2 className="text-sm font-medium">Preview</h2>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Preview html={html} css={css} js={js} packages={packages} />
                    </div>
                </div>
            </div>

            {showPackageManager && (
                <PackageManager
                    packages={packages}
                    addPackage={addPackage}
                    removePackage={removePackage}
                    onClose={() => setShowPackageManager(false)}
                    darkMode={darkMode}
                />
            )}
        </div>
    );
}

export default App;
