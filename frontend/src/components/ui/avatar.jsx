import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

const AvatarInitials = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-full w-full items-center justify-center rounded-full font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarInitials.displayName = "AvatarInitials";

export { Avatar, AvatarImage, AvatarFallback, AvatarInitials };
