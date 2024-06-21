# Changelog

All notable changes to Smart Business are documented in this file.

## [3.9.0] - 2026-06-06

### Added
- Docker and Docker Compose production deployment support
- Comprehensive unit test suite with full coverage on core modules
- Health check API endpoint at `/api/health`

### Changed
- Rebranded platform identity to Smart Business across UI and configuration
- Replaced default Next.js scaffold documentation with project-specific guides

### Fixed
- Module parameter persistence across shallow route transitions
- Store schedule validation for overnight operating hours

## [3.8.2] - 2026-03-14

### Added
- Flash sales carousel on home module landing
- Prescription upload validation for pharmacy checkout

### Fixed
- Wallet bonus calculation on partial refunds
- RTL layout spacing in Arabic locale header

## [3.8.0] - 2025-11-22

### Added
- Rental module vehicle review flow
- Referral share modal with social channel presets

### Changed
- Upgraded to Next.js 15 and React 19
- Migrated image domains to `remotePatterns` in Next config

## [3.7.0] - 2025-07-18

### Added
- Parcel tracking timeline component
- Guest checkout address capture form

### Fixed
- Coupon stacking rules for store-level discounts

## [3.6.0] - 2025-03-09

### Added
- Multi-module selector with slug-based routing
- Redux persist for cart and wishlist state

### Changed
- API client retry policy for transient 502 responses

## [3.5.0] - 2024-11-30

### Added
- Campaign landing pages with SSR metadata
- Store registration multi-step wizard

### Fixed
- Google Maps marker clustering on dense zones

## [3.4.0] - 2024-08-17

### Added
- i18n scanner and watch scripts for translation maintenance
- Firebase push notification token registration

### Changed
- Consolidated checkout payment hooks into shared react-query layer

## [3.3.0] - 2024-06-06

### Added
- Initial Smart Business customer web application
- Food, grocery, pharmacy, e-commerce, parcel, and rental modules
- Authentication, cart, checkout, and order tracking foundations
