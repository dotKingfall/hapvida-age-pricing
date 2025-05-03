export class Company{
  constructor(
    private age: number,
    private range: number[],
    private discount: number,
    private smt: number,
    private smt_up: number,
    private nosso_medico: number,
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

  getSmt(): number {
    return this.smt;
  }

  getSmtUp(): number {
    return this.smt_up;
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

  setSmt(smt: number): void {
    this.smt = smt;
  }

  setSmtUp(smt_up: number): void {
    this.smt_up = smt_up;
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
      smt: this.smt,
      smt_up: this.smt_up,
      nosso_medico: this.nosso_medico
    };
  }
}