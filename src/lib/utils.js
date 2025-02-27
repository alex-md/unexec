import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const createPreviewContent = (html, css, js) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Code preview generated in Unexec Playground" />
                <meta name="robots" content="noindex, nofollow" />
                <style>${css}</style>
            </head>
            <body>
                <main>${html}</main>
                <script type="application/javascript">${js}</script>
            </body>
        </html>
    `;
};

export const generateMetaTags = (title, description) => {
    return {
        title: `${title} | Unexec Playground`,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description }
        ]
    };
};
