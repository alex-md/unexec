import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';

export const Preview = ({ autoRefresh, onRefresh, content }) => {
    // Inject meta tags and SEO-friendly structure into preview content
    const enhancedContent = content.replace('</head>',
        `<meta name="robots" content="noindex, nofollow">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link rel="preconnect" href="https://fonts.googleapis.com">
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
         </head>`
    );

    return (
        <div className="preview-container" id="preview-container" role="complementary" aria-label="Code Preview">
            <iframe
                id="preview-iframe"
                title="Code Preview"
                sandbox="allow-scripts"
                className="preview-frame"
                srcDoc={enhancedContent}
                aria-live="polite"
            />
            {!autoRefresh && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={onRefresh}
                                variant="secondary"
                                size="sm"
                                className="absolute top-2 right-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                                aria-label="Refresh Preview"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Preview
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="select-none">
                            Update the preview with your changes
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
};
