export class Plan {
  constructor(
    private name: string,
    private enf: Model | null,
    private amb: Model | null,
    private apt: Model | null
  ) {}

  // Getters
  getName(): string {
    return this.name;
  }

  getEnf(): Model | null {
    return this.enf;
  }

  getAmb(): Model | null {
    return this.amb;
  }

  getApt(): Model | null {
    return this.apt;
  }

  // Setters
  setName(name: string): void {
    this.name = name;
  }

  setEnf(enf: Model | null): void {
    this.enf = enf;
  }

  setAmb(amb: Model | null): void {
    this.amb = amb;
  }

  setApt(apt: Model | null): void {
    this.apt = apt;
  }

  // JSON serialization
  toJSON(): object {
    return {
      name: this.name,
      enf: this.enf ? this.enf.toJSON() : null,
      amb: this.amb ? this.amb.toJSON() : null,
      apt: this.apt ? this.apt.toJSON() : null
    };
  }
}

export class Model {
  constructor(
    private name: string,
    private inner_model: number, // 0 to Coparticipação, 1 to Sem Coparticipação
    private tier1: Tier,
    private tier2: Tier,
    private tier3: Tier,
    private tier4: Tier,
    private tier5: Tier,
    private tier6: Tier,
    private tier7: Tier,
    private tier8: Tier,
    private tier9: Tier,
    private tier10: Tier
  ) {}

  // Getters
  getName(): string {
    return this.name;
  }

  getInnerModel(): number {
    return this.inner_model;
  }

  getTier1(): Tier {
    return this.tier1;
  }

  getTier2(): Tier {
    return this.tier2;
  }

  getTier3(): Tier {
    return this.tier3;
  }

  getTier4(): Tier {
    return this.tier4;
  }

  getTier5(): Tier {
    return this.tier5;
  }

  getTier6(): Tier {
    return this.tier6;
  }

  getTier7(): Tier {
    return this.tier7;
  }

  getTier8(): Tier {
    return this.tier8;
  }

  getTier9(): Tier {
    return this.tier9;
  }

  getTier10(): Tier {
    return this.tier10;
  }

  // Setters
  setName(name: string): void {
    this.name = name;
  }

  setInnerModel(inner_model: number): void {
    this.inner_model = inner_model;
  }

  setTier1(tier1: Tier): void {
    this.tier1 = tier1;
  }

  setTier2(tier2: Tier): void {
    this.tier2 = tier2;
  }

  setTier3(tier3: Tier): void {
    this.tier3 = tier3;
  }

  setTier4(tier4: Tier): void {
    this.tier4 = tier4;
  }

  setTier5(tier5: Tier): void {
    this.tier5 = tier5;
  }

  setTier6(tier6: Tier): void {
    this.tier6 = tier6;
  }

  setTier7(tier7: Tier): void {
    this.tier7 = tier7;
  }

  setTier8(tier8: Tier): void {
    this.tier8 = tier8;
  }

  setTier9(tier9: Tier): void {
    this.tier9 = tier9;
  }

  setTier10(tier10: Tier): void {
    this.tier10 = tier10;
  }

  // JSON serialization
  toJSON(): object {
    return {
      name: this.name,
      inner_model: this.inner_model,
      tier1: this.tier1.toJSON(),
      tier2: this.tier2.toJSON(),
      tier3: this.tier3.toJSON(),
      tier4: this.tier4.toJSON(),
      tier5: this.tier5.toJSON(),
      tier6: this.tier6.toJSON(),
      tier7: this.tier7.toJSON(),
      tier8: this.tier8.toJSON(),
      tier9: this.tier9.toJSON(),
      tier10: this.tier10.toJSON()
    };
  }
}

export class Tier {
  constructor(
    private range: number,
    private price: number
  ) {}

  // Getters
  getRange(): number {
    return this.range;
  }

  getPrice(): number {
    return this.price;
  }

  // Setters
  setRange(range: number): void {
    this.range = range;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  // JSON serialization
  toJSON(): object {
    return {
      range: this.range,
      price: this.price
    };
  }
}