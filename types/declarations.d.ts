declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
  const Link: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement>
  >;
  export default Link;
}

declare module 'next/link.js' {
  export * from 'next/link';
  import Link from 'next/link';
  export default Link;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(url: string): void;
  };
  export function useSearchParams(): URLSearchParams;
  export function useParams<T extends Record<string, string | string[]> = Record<string, string>>(): T;
  export function notFound(): never;
  export function redirect(url: string): never;
}

declare module 'next/navigation.js' {
  export * from 'next/navigation';
}

declare module 'next/server' {
  export class NextRequest extends Request {
    nextUrl: URL;
    cookies: any;
    geo?: any;
    ip?: string;
  }
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static rewrite(destination: string | URL, init?: ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
  }
}

declare module 'next/server.js' {
  export * from 'next/server';
  export { NextRequest, NextResponse } from 'next/server';
}

declare module 'next/dist/lib/metadata/types/metadata-interface.js' {
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
}
