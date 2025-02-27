import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
    return (
        <Editor
            height="100%"
            defaultLanguage={language}
            value={value}
            onChange={onChange}
            theme="vs-dark"
            options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                padding: { top: 8, bottom: 8 },
                renderWhitespace: 'selection',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                bracketPairColorization: { enabled: true },
                wordWrap: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 15,
                renderLineHighlight: 'all',
                quickSuggestions: true,
                contextmenu: true,
                suggest: {
                    showWords: true,
                    showSnippets: true,
                    showClasses: true,
                    showProperties: true,
                },
                hover: { enabled: true },
                links: { enabled: true },
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                    useShadows: true,
                    verticalHasArrows: false,
                    horizontalHasArrows: false,
                    vertical: 'visible',
                    horizontal: 'visible',
                }
            }}
        />
    );
};

export default CodeEditor;
