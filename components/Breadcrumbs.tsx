import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="list-none mb-1 text-sm flex gap-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href} aria-current={isLast ? "page" : undefined} className={isLast ? "text-base-gray" : "text-secondary-green"}>
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Render separator only if not last */}
            {!isLast && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
}
