export class Drugs {
  _drugs = [];

  constructor() {}

  getDrugQuantity(type) {
    return this._drugs.reduce((sum, d) => sum + (d.type === type ? 1 : 0), 0);
  }

  addDrugWithQuantity(type, quantity) {
    const drugs = new Array(Number(quantity));

    drugs.fill({ type });

    this._drugs.push(...drugs);
  }
  
  removeDrugsWithQuantity(type, quantity) {
    const drugs = new Array(Number(quantity));
    drugs.fill({ type });

    for (const drug of drugs) {
      const index = this._drugs.findIndex((d) => d.type === drug.type);

      if (index !== -1) {
        this._drugs.splice(index, 1);
      }
    }
  }

  hasDrugType(type) {
    return this.availableDrugs().has(type);
  }

  hasDrugTypeAmount(type, amount) {
    return (
      this._drugs.reduce((sum, d) => sum + (d.type === type ? 1 : 0), 0) >=
      amount
    );
  }

  availableDrugs() {
    return this._drugs.reduce((set, d) => {
      set.add(d.type);
      return set;
    }, new Set());
  }
}
