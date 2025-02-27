import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRipple } from "../../lib/useRipple";

const Button = React.forwardRef(({
    className = "",
    asChild = false,
    loading = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";
    const createRipple = useRipple();

    const classes = twMerge(
        'button',
        loading && 'cursor-not-allowed opacity-70',
        className
    );

    return (
        <Comp
            className={classes}
            ref={ref}
            disabled={loading || props.disabled}
            onClick={(e) => {
                !loading && createRipple(e);
                props.onClick?.(e);
            }}
            data-loading={loading}
            {...props}
        >
            {props.children}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
            )}
        </Comp>
    );
});

Button.displayName = "Button";

export { Button };
