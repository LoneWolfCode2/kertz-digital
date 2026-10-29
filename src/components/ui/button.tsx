import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold outline-none transition-[translate,box-shadow,background-color,color,border-color] duration-150 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        outline:
          "border-[1.5px] border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary:
          "border-[1.5px] border-transparent bg-secondary text-secondary-foreground hover:border-foreground",
        ghost: "text-foreground hover:bg-accent",
        link: "text-foreground underline decoration-[1.5px] underline-offset-4 hover:decoration-2",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-12 px-6 text-base",
        xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-11 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "size-12",
        "icon-sm": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
