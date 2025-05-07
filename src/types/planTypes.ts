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

  //GET AGE FUNCTION
  // GET AGE FUNCTION
  public getAgePrice(age: number): { age: number, range: string, enf: (number | null)[], amb: (number | null)[], apt: (number | null)[] } {
    let rangeStart = 0;
    let selectedTier: Tier | null = null;

    // Find the appropriate tier based on age
    for (const tier of this.tiers) {
      const rangeEnd = tier.getRange();
      if (age >= rangeStart && age <= rangeEnd) {
        selectedTier = tier;
        break;
      }
      rangeStart = rangeEnd + 1;
    }

    // If no tier is found, use the last tier
    if (!selectedTier && this.tiers.length > 0) {
      selectedTier = this.tiers[this.tiers.length - 1];
      rangeStart = this.tiers[this.tiers.length - 2]?.getRange() + 1 || 59;
    }

    const rangeEnd = selectedTier ? selectedTier.getRange() : 1000;
    const rangeString = `${rangeStart.toString().padStart(2, '0')} a ${rangeEnd.toString().padStart(2, '0')}`;

    return {
      age,
      range: rangeString,
      enf: selectedTier ? selectedTier.getEnf() : [null, null],
      amb: selectedTier ? selectedTier.getAmb() : [null, null],
      apt: selectedTier ? selectedTier.getApt() : [null, null],
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