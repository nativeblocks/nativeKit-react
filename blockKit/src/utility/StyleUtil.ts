type Breakpoint = {
  query: string;
  styles: string[];
};

export function mergeStyles(styleStrings: string[]): string {
  const breakpoints: Breakpoint[] = [
    { query: "max-width: 767px", styles: [] },
    { query: "min-width: 768px", styles: [] },
    { query: "min-width: 1024px", styles: [] },
  ];

  styleStrings.forEach((styleString) => {
    breakpoints.forEach((breakpoint) => {
      const regex = new RegExp(`@media \\(${breakpoint.query}\\) {([^}]+)}`, "g");
      const match = regex.exec(styleString);
      if (match && match[1]) {
        breakpoint.styles.push(match[1].trim());
      } else {
        breakpoint.styles.push("");
      }
    });
  });

  return breakpoints.map((breakpoint) => `@media (${breakpoint.query}) { ${breakpoint.styles.join(" ")} }`).join(" ");
}

export function mergeClasses(classStrings: string[]): string {
  return classStrings.join(" ");
}
