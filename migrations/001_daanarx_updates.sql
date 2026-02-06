-- DaanaRx System Updates Migration
-- Run this in Supabase SQL Editor
-- Date: 2026-02-05

-- ============================================
-- Phase 1: Database Schema Changes
-- ============================================

-- 1.1 Make lots.source optional (nullable)
ALTER TABLE lots ALTER COLUMN source DROP NOT NULL;

-- 1.2 Make drugs.ndc_id optional (nullable)
ALTER TABLE drugs ALTER COLUMN ndc_id DROP NOT NULL;

-- 1.3 Add clinic setting for location (L/R) requirement
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS require_lot_location BOOLEAN DEFAULT false;

-- 1.4 Add lot_code column for 2-letter drawer codes (e.g., "AL", "CR")
ALTER TABLE lots ADD COLUMN IF NOT EXISTS lot_code VARCHAR(2);

-- ============================================
-- Verification Queries (run after migration)
-- ============================================

-- Verify lots.source is nullable
-- SELECT column_name, is_nullable FROM information_schema.columns
-- WHERE table_name = 'lots' AND column_name = 'source';

-- Verify drugs.ndc_id is nullable
-- SELECT column_name, is_nullable FROM information_schema.columns
-- WHERE table_name = 'drugs' AND column_name = 'ndc_id';

-- Verify clinics.require_lot_location exists
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'clinics' AND column_name = 'require_lot_location';

-- Verify lots.lot_code exists
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'lots' AND column_name = 'lot_code';
