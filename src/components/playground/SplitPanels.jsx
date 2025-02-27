import { useEffect } from 'react';
import Split from 'split.js';
import CodeEditor from '../Editor';

export const SplitPanels = ({ html, css, js, onHtmlChange, onCssChange, onJsChange }) => {
    useEffect(() => {
        const updatePreviewDragging = (isDragging) => {
            const preview = document.getElementById('preview-container');
            const iframe = document.getElementById('preview-iframe');

            if (preview) {
                preview.classList[isDragging ? 'add' : 'remove']('dragging');
            }
            if (iframe) {
                iframe.style.pointerEvents = isDragging ? 'none' : 'auto';
            }
        };

        const updateGutterDragging = (selector, isDragging) => {
            document.querySelectorAll(selector).forEach(el => el.classList[isDragging ? 'add' : 'remove']('dragging'));
        };

        const horizontalSplit = Split(['#editor-container', '#preview-container'], {
            sizes: [50, 50],
            minSize: [300, 300],
            gutterSize: 12,
            dragInterval: 1,
            cursor: 'col-resize',
            elementStyle: (dimension, size, gutterSize) => ({ 'flex-basis': `calc(${size}% - ${gutterSize}px)`, 'width': `${size}%` }),
            gutterStyle: (dimension, gutterSize) => ({ 'flex-basis': `${gutterSize}px` }),
            onDrag: () => updatePreviewDragging(true),
            onDragEnd: () => {
                updatePreviewDragging(false);
                updateGutterDragging('.gutter-horizontal', false);
            }
        });

        const verticalSplit = Split(['#html-editor', '#css-editor', '#js-editor'], {
            sizes: [33, 33, 34],
            direction: 'vertical',
            gutterSize: 12,
            dragInterval: 1,
            cursor: 'row-resize',
            elementStyle: (dimension, size, gutterSize) => ({ 'flex-basis': `calc(${size}% - ${gutterSize}px)`, 'height': `${size}%` }),
            gutterStyle: (dimension, gutterSize) => ({ 'flex-basis': `${gutterSize}px` }),
            onDragStart: () => updateGutterDragging('.gutter-vertical', true),
            onDragEnd: () => updateGutterDragging('.gutter-vertical', false),
        });

        return () => {
            horizontalSplit.destroy();
            verticalSplit.destroy();
        };
    }, []);

    return (
        <div className="editor-container" id="editor-container">
            <div className="editor-wrapper relative" id="html-editor">
                <div className="editor-label">HTML</div>
                <div className="hidden">HTML</div>
                <CodeEditor language="html" value={html} onChange={onHtmlChange} />
            </div>
            <div className="editor-wrapper relative" id="css-editor">
                <div className="editor-label">CSS</div>
                <div className="hidden">CSS</div>
                <CodeEditor language="css" value={css} onChange={onCssChange} />
            </div>
            <div className="editor-wrapper relative" id="js-editor">
                <div className="editor-label">JavaScript</div>
                <div className="hidden">JS</div>
                <CodeEditor language="javascript" value={js} onChange={onJsChange} />
            </div>
        </div>
    );
};
