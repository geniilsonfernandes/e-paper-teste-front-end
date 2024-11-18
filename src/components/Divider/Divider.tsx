import { cva, VariantProps } from "class-variance-authority";

const DividerVariants = cva("flex", {
  variants: {
    color: {
      default: "bg-neutral-200",
    },
    direction: {
      horizontal: "w-full h-[1px]",
      vertical: "w-[1px] h-full",
    },
    height: {
      1: "h-1",
      2: "h-2",
      3: "h-3",
      4: "h-4",
      5: "h-5",
      6: "h-6",
      7: "h-7",
      8: "h-8",
      9: "h-9",
      10: "h-10",
    },
  },
  defaultVariants: {
    color: "default",
    direction: "vertical",
    height: 1,
  },
});

type DividerProps = {} & VariantProps<typeof DividerVariants> &
  React.HTMLAttributes<HTMLSpanElement>;

export const Divider = ({
  color,
  direction,
  height,
  className,
}: DividerProps) => {
  return (
    <span
      className={DividerVariants({ color, direction, height, className })}
    />
  );
};
