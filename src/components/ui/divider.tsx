import { cn } from "@/lib/utils/cn";

type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn("border-t border-border-default", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)} role="none">
      <span className="flex-1 border-t border-border-default" />
      <span className="text-sm text-text-tertiary">{label}</span>
      <span className="flex-1 border-t border-border-default" />
    </div>
  );
}
