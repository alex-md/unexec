import { useState, useEffect } from 'react';
import { TooltipProvider } from './ui/tooltip';
import { createPreviewContent } from '../lib/utils';
import { welcomeHtml, welcomeCss, welcomeJs } from '../lib/defaultContent';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { Preview } from './playground/Preview';
import { SplitPanels } from './playground/SplitPanels';

const Playground = () => {
    const [html, setHtml] = useState(welcomeHtml);
    const [css, setCss] = useState(welcomeCss);
    const [js, setJs] = useState(welcomeJs);
    const [copySuccess, setCopySuccess] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [previewContent, setPreviewContent] = useState('');

    useEffect(() => {
        // Add JSON-LD structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Unexec Playground',
            'description': 'Interactive code editor for web development with live preview capabilities',
            'applicationCategory': 'DeveloperApplication',
            'operatingSystem': 'Any',
            'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
            },
            'featureList': [
                'Live Preview',
                'Multi-pane Editor',
                'Syntax Highlighting',
                'Code Sharing'
            ]
        });
        document.head.appendChild(script);
        return () => script.remove();
    }, []);

    // Function to update the preview content
    const updatePreview = () => {
        setPreviewContent(createPreviewContent(html, css, js));
    };

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const timeout = setTimeout(() => {
            updatePreview();
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js, autoRefresh]);

    // Function to copy all code to clipboard
    const handleCopyAll = async () => {
        const combinedCode = createPreviewContent(html, css, js);
        try {
            await navigator.clipboard.writeText(combinedCode);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    // Placeholder functions for future implementation
    const handleShare = () => {
        // TODO: Implement share functionality
        console.log('Share functionality to be implemented');
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Save functionality to be implemented');
    };

    return (
        <TooltipProvider>
            <div className="playground" role="application" aria-label="Code Playground">
                <PlaygroundHeader
                    onCopyAll={handleCopyAll}
                    copySuccess={copySuccess}
                    autoRefresh={autoRefresh}
                    onToggleAutoRefresh={() => {
                        setAutoRefresh(!autoRefresh);
                        if (!autoRefresh) updatePreview();
                    }}
                    onShare={handleShare}
                    onSave={handleSave}
                />

                <div className="playground-content" role="main">
                    <section aria-label="Code Editors">
                        <SplitPanels
                            html={html}
                            css={css}
                            js={js}
                            onHtmlChange={setHtml}
                            onCssChange={setCss}
                            onJsChange={setJs}
                        />
                    </section>

                    <section aria-label="Preview Panel">
                        <Preview
                            autoRefresh={autoRefresh}
                            onRefresh={updatePreview}
                            content={previewContent}
                        />
                    </section>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default Playground;
