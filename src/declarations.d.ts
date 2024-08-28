declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Для PNG файлов
declare module "*.png" {
  const value: string;
  export default value;
}

// Для JPEG и JPG файлов
declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

// Для GIF файлов
declare module "*.gif" {
  const value: string;
  export default value;
}

declare module 'wowjs' {
  export class WOW {
		constructor(options?: any);
		init(): void;
  }
}
