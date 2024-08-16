import type { Filter } from "./filters";
import type { Snapshot } from "./index";

type Child = string | HTMLElement | Tag;

export type Tag<T extends HTMLElement = HTMLElement> = T & {
    att$ : (name: string, value: string) => Tag<T>;
    onclick$ : (callback: (this: GlobalEventHandlers, ev: MouseEvent) => Tag<T>) => Tag<T>;
    paramsSnapshot$ : () => Snapshot;
    selectedImage$ : () => Tag<HTMLImageElement>;
    selectedFileName$ : () => string;
    updateFiles$ : (files: FileList) => void;
    selectedFilter$ : () => Filter;
    render$ : (filename: string) => GIF | undefined;
    updateImage$ : Function; // TODO: change this to the actual function type

    files : FileList;
    value : any;
};

export function tag<T extends HTMLElement = HTMLElement>(name: string, ...children: Child[]): Tag<T> {
    const result = document.createElement(name) as Tag<T>;
    for (const child of children) {
        if (typeof child === 'string') {
            result.appendChild(document.createTextNode(child));
        } else {
            result.appendChild(child);
        }
    }

    result.att$ = function (this, name : string, value) {
        this.setAttribute(name, value);
        return this;
    };


    result.onclick$ = function(this, callback) {
        this.onclick = callback;
        return this;
    };

    return result;
}

export const canvas = (...children: Child[]) => tag<HTMLCanvasElement>("canvas", ...children);
export const h1     = (...children: Child[]) => tag<HTMLHeadingElement>("h1", ...children);
export const h2     = (...children: Child[]) => tag<HTMLHeadingElement>("h2", ...children);
export const h3     = (...children: Child[]) => tag<HTMLHeadingElement>("h3", ...children);
export const p      = (...children: Child[]) => tag<HTMLParagraphElement>("p", ...children);
export const a      = (...children: Child[]) => tag<HTMLAnchorElement>("a", ...children);
export const div    = (...children: Child[]) => tag<HTMLDivElement>("div", ...children);
export const span   = (...children: Child[]) => tag<HTMLSpanElement>("span", ...children);
export const select = (...children: Child[]) => tag<HTMLSelectElement>("select", ...children);

export const img   = (src: string)  => tag<HTMLImageElement>("img").att$("src", src);
export const input = (type: string) => tag<HTMLInputElement>("input").att$("type", type);

export function router(routes: Record<string, Tag>) {
    const result = div();

    function syncHash() {
        let hashLocation = document.location.hash.split('#')[1];
        if (!hashLocation) {
            hashLocation = '/';
        }

        if (!(hashLocation in routes)) {
            const route404 = '/404';
            console.assert(route404 in routes);
            hashLocation = route404;
        }

        while (result.firstChild) {
            result.removeChild(result.lastChild!);
        }
        result.appendChild(routes[hashLocation]!);

        return result;
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return result;
}
