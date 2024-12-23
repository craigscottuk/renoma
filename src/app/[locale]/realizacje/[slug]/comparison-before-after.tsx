interface ComparisonBeforeAfterProps {
  imageBefore: string;
  imageAfter: string;
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
}

export function ComparisonBeforeAfter({
  imageBefore,
  imageAfter,
  labelBefore = "Przed",
  labelAfter = "Po",
  className,
}: ComparisonBeforeAfterProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <div className="flex-1">
        <img
          src={imageBefore}
          alt={labelBefore}
          className="h-auto max-h-96 w-full rounded-lg object-cover shadow-md"
        />
        <p className="mt-2 text-center font-medium text-zinc-700">
          {labelBefore}
        </p>
      </div>
      <div className="flex-1">
        <img
          src={imageAfter}
          alt={labelAfter}
          className="h-auto max-h-96 w-full rounded-lg object-cover object-center shadow-md"
        />
        <p className="mt-2 text-center font-medium text-zinc-700">
          {labelAfter}
        </p>
      </div>
    </div>
  );
}
