import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { MedicineDTO } from './create-medicine.dto.js';

describe('MedicineDTO Validation Tests', () => {
  async function validateMedicine(data: object) {
    const dto = Object.assign(new MedicineDTO(), data);
    return validate(dto);
  }

  // Test 1: Valid data
  it('should accept valid medicine data', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    });

    expect(errors).toHaveLength(0);
  });

  // Test 2: Empty medicine name
  it('should reject empty medicine name', async () => {
    const errors = await validateMedicine({
      name: '',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    });

    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });

  // Test 3: Missing generic name
  it('should reject missing generic name', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      price: 10,
      stock_quantity: 20,
    });

    expect(errors.some((e) => e.property === 'generic_name')).toBe(true);
  });

  // Test 4: Negative price
  it('should reject negative price', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: -10,
      stock_quantity: 20,
    });

    expect(errors.some((e) => e.property === 'price')).toBe(true);
  });

  // Test 5: Negative stock
  it('should reject negative stock quantity', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: -1,
    });

    expect(errors.some((e) => e.property === 'stock_quantity')).toBe(true);
  });

  // Test 6: Decimal stock
  it('should reject decimal stock quantity', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 2.5,
    });

    expect(errors.some((e) => e.property === 'stock_quantity')).toBe(true);
  });

  // Test 7: Negative price and stock together
  it('should reject negative price and stock together', async () => {
    const errors = await validateMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: -1,
      stock_quantity: -1,
    });

    expect(errors.some((e) => e.property === 'price')).toBe(true);
    expect(errors.some((e) => e.property === 'stock_quantity')).toBe(true);
  });
});
