export class Plan {
  constructor(
    private id: number,
    private name: string,
    private tiers: Tier[],
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

    //0: Coparticipação Parcial | 1: Coparticipação Total
    private enf: number[],
    private amb: number[],
    private apt: number[],
  ){}

  // Getters
  public getRange(): number {
    return this.range;
  }

  public getEnf(): number[] {
    return this.enf;
  }

  public getAmb(): number[] {
    return this.amb;
  }

  public getApt(): number[] {
    return this.apt;
  }

  // Setters
  public setRange(range: number): void {
    this.range = range;
  }

  public setEnf(enf: number[]): void {
    this.enf = enf;
  }

  public setAmb(amb: number[]): void {
    this.amb = amb;
  }

  public setApt(apt: number[]): void {
    this.apt = apt;
  }

  // toJSON method
  public toJSON(): object {
    return {
      range: this.range,
      enf: this.enf,
      amb: this.amb,
      apt: this.apt
    };
  }
}