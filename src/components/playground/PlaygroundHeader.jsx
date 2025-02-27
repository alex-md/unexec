import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

export const PlaygroundHeader = ({
    onCopyAll,
    copySuccess,
    autoRefresh,
    onToggleAutoRefresh,
    onShare,
    onSave
}) => {
    return (
        <header className="playground-header" role="banner">
            <nav className="flex items-center justify-between w-full" aria-label="Main navigation">
                <a href="/" className="playground-logo" aria-label="Unexec Playground Home">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                        <path d="M2 2l7.586 7.586"></path>
                        <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                    <span>Unexec Playground</span>
                </a>
                <div className="flex items-center gap-3" role="toolbar" aria-label="Editor controls">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={onCopyAll}
                                variant={copySuccess ? "secondary" : "default"}
                                size="sm"
                                className="min-w-[100px] transition-all duration-200"
                                aria-label={copySuccess ? "Code copied" : "Copy all code"}
                            >
                                {copySuccess ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 animate-in fade-in" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        <span>Copy All</span>
                                    </>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="select-none">
                            Copy all code to clipboard
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={onToggleAutoRefresh}
                                variant={autoRefresh ? "secondary" : "outline"}
                                size="sm"
                                className="min-w-[140px] transition-all duration-200"
                                aria-pressed={autoRefresh}
                                aria-label="Toggle auto-refresh"
                            >
                                <span
                                    className={cn(
                                        "w-2 h-2 rounded-full mr-2 transition-colors",
                                        autoRefresh ? "bg-primary animate-pulse" : "bg-muted-foreground"
                                    )}
                                    aria-hidden="true"
                                />
                                {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="select-none">
                            {autoRefresh ? 'Preview updates automatically' : 'Click to enable auto-updates'}
                        </TooltipContent>
                    </Tooltip>

                    <div className="flex items-center gap-2 ml-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={onShare}
                                    variant="ghost"
                                    size="sm"
                                    className="transition-all duration-200"
                                    aria-label="Share code"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                    <span>Share</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="select-none">
                                Share your code with others
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={onSave}
                                    variant="ghost"
                                    size="sm"
                                    className="transition-all duration-200"
                                    aria-label="Save code"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    <span>Save</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="select-none">
                                Save your work locally
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </nav>
        </header>
    );
};
