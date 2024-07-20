export class Car {
  id = crypto.randomUUID();

  constructor({
    name,
    brand,
    model,
    acceleration,
    topSpeed,
    condition,
    handling,
    value,
  }) {
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.acceleration = acceleration;
    this.topSpeed = topSpeed;
    this.condition = condition;
    this.handling = handling;
    this.value = value;
  }
}
