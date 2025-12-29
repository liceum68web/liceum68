// TODO: Implement loading state with skeletons in the future
// if any significant performance issues arise.

import { Calendar1Icon } from "lucide-react";
import Image, { ImageProps } from "next/image";

import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Tag } from "../../base";
import {
  articleContainerClass,
  articleTextClass,
  articleTitleClass,
  bannerContainerClass,
  bannerImageClass,
  delimiterClass,
  publicationDateClass,
  tagContainerClass,
} from "./article.styles";
import { formatToDdMmmmYyyy } from "./utils";

const renderTag = (tag: string, index: number) => (
  <li key={tag}>
    <Tag label={tag} />
  </li>
);

export interface IArticleProps extends IBaseProps, Partial<ImageProps> {
  title?: string;
  text?: string;
  publicationDate?: string;
  tags?: string[];
}

export const Article = ({
  src,
  title,
  text,
  publicationDate,
  tags = [],
  className,
}: IArticleProps) => {
  return (
    <article
      data-testid="article-widget"
      className={cn(articleContainerClass, className)}
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
      {publicationDate && (
        <time className={publicationDateClass} dateTime={publicationDate}>
          <Calendar1Icon size={16} />
          {formatToDdMmmmYyyy(publicationDate)}
        </time>
      )}
      <h1 data-testid="article-title" className={articleTitleClass}>
        {title}
      </h1>
      <hr className={delimiterClass} />
      <p data-testid="article-content" className={articleTextClass}>
        {text}
      </p>
      {!!tags?.length && (
        <ul data-testid="article-tags" className={tagContainerClass}>
          {tags.map(renderTag)}
        </ul>
      )}
    </article>
  );
};
