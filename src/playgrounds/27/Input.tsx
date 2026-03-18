const Input = () => {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="w-64 md:w-80">
          <div className="relative w-full min-w-0 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              placeholder="Search by filename..."
              className="w-full rounded-lg border border-border bg-background py-2 pr-10 pl-10 text-foreground text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              type="text"
              value=""
            />
            <kbd className="absolute top-1/2 right-3 hidden h-5 -translate-y-1/2 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
              /
            </kbd>
          </div>
        </div>
        <label for="dataset-filter" className="sr-only">
          Filter by data set
        </label>
        <div className="relative">
          <select
            id="dataset-filter"
            className="w-40 appearance-none rounded-lg border border-border bg-background py-2 pr-8 pl-3 text-foreground text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All data sets</option>
            <option value="2">Data Set 2</option>
            <option value="3">Data Set 3</option>
            <option value="4">Data Set 4</option>
            <option value="6">Data Set 6</option>
            <option value="7">Data Set 7</option>
            <option value="8">Data Set 8</option>
            <option value="9">Data Set 9</option>
            <option value="10">Data Set 10</option>
            <option value="11">Data Set 11</option>
            <option value="12">Data Set 12</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevron-down pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
      <div className="whitespace-nowrap text-right font-medium text-muted-foreground text-sm">
        Showing 1296 documents
      </div>
    </div>
  );
};
export { Input };
