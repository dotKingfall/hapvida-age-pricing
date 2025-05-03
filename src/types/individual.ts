export class Individual{
  constructor(
    private age: number,
    private range: number[],
    private discount: number,
    private ntr: number,
    private ntr50: number,
    private nosso_medico: number
  ){}

  // Getters
  getAge(): number {
    return this.age;
  }

  getRange(): number[] {
    return this.range;
  }

  getDiscount(): number {
    return this.discount;
  }

  getNtr(): number {
    return this.ntr;
  }

  getNtr50(): number {
    return this.ntr50;
  }

  getNossoMedico(): number {
    return this.nosso_medico;
  }

  // Setters
  setAge(age: number): void {
    this.age = age;
  }

  setRange(range: number[]): void {
    this.range = range;
  }

  setDiscount(discount: number): void {
    this.discount = discount;
  }

  setNtr(ntr: number): void {
    this.ntr = ntr;
  }

  setNtr50(ntr50: number): void {
    this.ntr50 = ntr50;
  }

  setNossoMedico(nosso_medico: number): void {
    this.nosso_medico = nosso_medico;
  }

  // JSON serialization
  toJSON(): object {
    return {
      age: this.age,
      range: this.range,
      discount: this.discount,
      ntr: this.ntr,
      ntr50: this.ntr50,
      nosso_medico: this.nosso_medico
    };
  }
}