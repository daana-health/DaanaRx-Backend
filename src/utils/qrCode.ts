/**
 * QR Code Generator Utility
 *
 * Generates QR codes in the format: {LotCode}-{MMDDYY}-{4LetterMed}-{Dosage}
 * Example: "BL-020526-AMLO-05" for Amlodipine 5mg in Drawer B Left on 02/05/2026
 */

/**
 * Generates a QR code string for a medication unit
 *
 * @param lotCode - 2-letter lot code (e.g., "BL", "CR")
 * @param date - Entry date
 * @param medicationName - Full medication name (e.g., "Amlodipine")
 * @param dosage - Dosage string (e.g., "5mg", "500mg")
 * @param sequence - Optional sequence number for multiple units (1, 2, 3...)
 * @returns QR code string
 */
export function generateQRCode(
  lotCode: string,
  date: Date,
  medicationName: string,
  dosage: string,
  sequence?: number
): string {
  // Format date as MMDDYY
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const dateStr = `${month}${day}${year}`;

  // Get first 4 letters of medication name (uppercase, alphanumeric only)
  const medCode = medicationName
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 4)
    .toUpperCase()
    .padEnd(4, 'X'); // Pad with X if less than 4 chars

  // Extract numeric dosage and pad to 2 digits
  const doseNum = dosage
    .replace(/[^0-9.]/g, '')
    .split('.')[0] // Get integer part
    .padStart(2, '0')
    .substring(0, 2); // Max 2 digits

  // Build base code
  const baseCode = `${lotCode.toUpperCase()}-${dateStr}-${medCode}-${doseNum}`;

  // Append sequence number if provided
  if (sequence !== undefined && sequence > 0) {
    return `${baseCode}-${String(sequence).padStart(2, '0')}`;
  }

  return baseCode;
}

/**
 * Parses a dosage string into strength and unit
 *
 * @param dosage - Dosage string (e.g., "500mg", "10mg/5ml", "5 mg")
 * @returns Object with strength (number) and strengthUnit (string)
 */
export function parseDosage(dosage: string): { strength: number; strengthUnit: string } {
  // Remove spaces and convert to lowercase for parsing
  const cleanDosage = dosage.trim();

  // Try to extract number and unit
  const match = cleanDosage.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z/]+)?$/);

  if (match) {
    const strength = parseFloat(match[1]);
    const strengthUnit = match[2] || 'unit';
    return { strength, strengthUnit };
  }

  // If no match, try more complex patterns like "10mg/5ml"
  const complexMatch = cleanDosage.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/);

  if (complexMatch) {
    const strength = parseFloat(complexMatch[1]);
    const strengthUnit = complexMatch[2];
    return { strength, strengthUnit };
  }

  // Default fallback
  return { strength: 0, strengthUnit: 'unit' };
}

/**
 * Generates a human-readable lot description
 *
 * @param lotCode - 2-letter lot code (e.g., "BL", "CR")
 * @returns Human-readable description (e.g., "Drawer B Left", "Drawer C Right")
 */
export function getLotDescription(lotCode: string): string {
  if (!lotCode || lotCode.length < 1) {
    return 'Unknown Location';
  }

  const drawer = lotCode[0]?.toUpperCase() || '';
  const side = lotCode[1]?.toUpperCase() || '';

  const drawerName = drawer ? `Drawer ${drawer}` : 'Unknown Drawer';

  let sideName = '';
  if (side === 'L') {
    sideName = ' Left';
  } else if (side === 'R') {
    sideName = ' Right';
  }

  return `${drawerName}${sideName}`;
}

/**
 * Validates a lot code format (should be 1-2 uppercase letters)
 *
 * @param lotCode - Lot code to validate
 * @param requireLocation - Whether the second letter (L/R) is required
 * @returns True if valid, false otherwise
 */
export function validateLotCode(lotCode: string, requireLocation: boolean = false): boolean {
  if (!lotCode) {
    return false;
  }

  // Must be 1-2 characters
  if (lotCode.length < 1 || lotCode.length > 2) {
    return false;
  }

  // First character must be A-Z (drawer letter)
  if (!/^[A-Z]/.test(lotCode.toUpperCase())) {
    return false;
  }

  // If location is required, must have second character and it must be L or R
  if (requireLocation) {
    if (lotCode.length !== 2) {
      return false;
    }
    const side = lotCode[1]?.toUpperCase();
    if (side !== 'L' && side !== 'R') {
      return false;
    }
  }

  // If second character exists, it should be L or R
  if (lotCode.length === 2) {
    const side = lotCode[1]?.toUpperCase();
    if (side !== 'L' && side !== 'R') {
      return false;
    }
  }

  return true;
}
