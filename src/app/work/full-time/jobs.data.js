import { Money } from "../../items/money.model";

export const fullTimeJobs = [
  {
    id: crypto.randomUUID(),
    job: "Coffee Shop Barista",
    description: "Apply for this full-time position today!",
    employer: "Brewed Awakenings",
    salary: new Money({
      dollars: 55_250,
    }),
  },
];
