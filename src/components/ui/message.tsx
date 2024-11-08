import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const messageVariants = cva("inline-block max-w-[80%] rounded-lg p-3 text-sm", {
  variants: {
    variant: {
      inbound: "bg-secondary text-secondary-foreground",
      outbound: "bg-primary text-primary-foreground ml-auto",
    },
  },
  defaultVariants: {
    variant: "inbound",
  },
});

export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  content: string;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, variant, content, ...props }, ref) => {
    return (
      <div
        className={cn(messageVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </div>
    );
  },
);
Message.displayName = "Message";

export { Message, messageVariants };
