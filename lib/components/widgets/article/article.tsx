// TODO: Implement loading state with skeletons in the future
// if any significant performance issues arise.

import { clsx } from "clsx";
import Image, { ImageProps } from "next/image";

import { IBaseProps } from "@/lib/types";

import {
  articleContainerClass,
  bannerContainerClass,
  bannerImageClass,
} from "./article.styles";

export interface IArticleProps extends IBaseProps, Partial<ImageProps> {
  title?: string;
  text?: string;
}

export const Article = ({ src, title, text, className }: IArticleProps) => {
  return (
    <article
      data-testid="article-widget"
      className={clsx(articleContainerClass, className)}
    >
      {title && src && (
        <div data-testid="article-banner" className={bannerContainerClass}>
          <Image
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className={bannerImageClass}
            alt={title}
            src={src}
          />
        </div>
      )}
      <h1 data-testid="article-title">{title}</h1>
      <p data-testid="article-content">{text}</p>
    </article>
  );
};
