import { billowProperties } from "./billow/properties.data";

export class RealEstateController {
  getPropertyById(propertyId) {
    return billowProperties.find((p) => p.id === propertyId);
  }

  buy(player, propertyId) {
    const property = this.getPropertyById(propertyId);

    if (player.cash.greaterThanOrEqual(property.price)) {
      player.cash = player.cash.subtract(property.price);

      player.properties.push({
        ...property,
        id: crypto.randomUUID(),
      });

      return true;
    }

    return false;
  }

  buyWithMortgage(player, propertyId) {
    const property = this.getPropertyById(propertyId);
    const downPayment = property.price.multiply(0.2);

    if (player.cash.greaterThanOrEqual(downPayment)) {
      player.cash = player.cash.subtract(downPayment);

      const mortgageTerm = 30; // 30 years
      const mortgageInterestRate = 5; // 5%

      const mortgageBalance = property.price.subtract(downPayment);
      let yearlyMortgagePayment = mortgageBalance.divide(mortgageTerm);

      yearlyMortgagePayment = yearlyMortgagePayment.add(
        mortgageBalance.multiply(mortgageInterestRate / 100)
      );

      player.properties.push({
        ...property,
        id: crypto.randomUUID(),
        mortgage: {
          yearsLeft: mortgageTerm,
          balance: mortgageBalance,
          yearlyMortgagePayment,
        },
      });

      return true;
    }

    return false;
  }
}
