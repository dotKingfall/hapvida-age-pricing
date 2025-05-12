export class Plan {
  constructor(
    public id: number,
    public name: string,
    public tiers: Tier[],
  ) {}

  // Getters
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTiers(): Tier[] {
    return this.tiers;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setTiers(tiers: Tier[]): void {
    this.tiers = tiers;
  }

  // toJSON method
  public toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      tiers: this.tiers.map(tier => tier.toJSON())
    };
  }
}

export class Tier {
  constructor(
    private range: number,
    // 0: Coparticipação Parcial | 1: Coparticipação Total
    // For Smart plans: [single_partial, single_total, multi_partial, multi_total]
    private enf: (number | null)[],
    private amb: (number | null)[],
    private apt: (number | null)[],
  ) {}

  // Getters
  public getRange(): number {
    return this.range;
  }

  public getEnf(): (number | null)[] {
    return this.enf;
  }

  public getAmb(): (number | null)[] {
    return this.amb;
  }

  public getApt(): (number | null)[] {
    return this.apt;
  }

  // Setters
  public setRange(range: number): void {
    this.range = range;
  }

  public setEnf(enf: (number | null)[]): void {
    this.enf = enf;
  }

  public setAmb(amb: (number | null)[]): void {
    this.amb = amb;
  }

  public setApt(apt: (number | null)[]): void {
    this.apt = apt;
  }

  public toJSON(): object {
    return {
      range: this.range,
      enf: this.enf,
      amb: this.amb,
      apt: this.apt
    };
  }
}

export interface OutputTier {
  range: number | null
  enf: number | null
  amb: number | null
  apt: number | null
}

export type PriceData = {
  age: number
  range: string
  tier: OutputTier
}