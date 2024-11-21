import { cn } from "@/shared/utils";
import { ReactNode } from "react";

type PageHeaderProps = {
  title?: string;
  subtitle?: string;
  rightSection?: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PageHeader = ({
  title,
  subtitle,
  rightSection,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-4 justify-between md:items-end mb-6",
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-bold text-neutral-700">{title}</h2>
        <p className="text-sm text-neutral-500">{subtitle} </p>
      </div>
      {rightSection && <>{rightSection}</>}
    </div>
  );
};

export default PageHeader;
