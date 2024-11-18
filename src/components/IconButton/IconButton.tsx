import { cva, VariantProps } from "class-variance-authority";

const IconButtonVariants = cva(
  "center hover:bg-neutral-100 rounded-md user-focus",
  {
    variants: {
      size: {
        default: "w-10 h-10",
        small: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type IconButtonProps = {} & VariantProps<typeof IconButtonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ size, className, ...props }: IconButtonProps) => {
  return (
    <button className={IconButtonVariants({ size, className })} {...props} />
  );
};
