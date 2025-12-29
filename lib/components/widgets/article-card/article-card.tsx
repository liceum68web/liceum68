import Image from "next/image";
import Link from "next/link";

import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Card, Tag } from "../../base";
import {
  articleCardContainer,
  articleCardTagsClass,
  articleCardTextClass,
  articleCardTitleClass,
  cardImageClass,
  cardImageContainerClass,
} from "./article-card.styles";

const renderTag = (tag: string) => (
  <li key={tag}>
    <Tag label={tag} />
  </li>
);

export interface IArticleCardProps extends IBaseProps {
  title?: string;
  text?: string;
  imageSrc?: string;
  tags?: string[];
  url?: string;
  onClick?: VoidFunction;
}

export const ArticleCard = ({
  className,
  imageSrc,
  tags = [],
  text,
  url = "",
  title,
  onClick,
}: IArticleCardProps) => {
  return (
    <Link href={url} onClick={onClick}>
      <Card className={cn(articleCardContainer, className)}>
        <div className={cardImageContainerClass}>
          <Image
            className={cardImageClass}
            src={imageSrc as string}
            alt={title as string}
            width={400}
            height={300}
          />
        </div>
        <h3 className={articleCardTitleClass}>{title}</h3>
        <p className={articleCardTextClass}>{text}</p>
        {!!tags?.length && (
          <ul className={articleCardTagsClass}>{tags.map(renderTag)}</ul>
        )}
      </Card>
    </Link>
  );
};
