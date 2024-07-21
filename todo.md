# Game Development To-Do List

## High Priority

### Currency
- [ ] Add currency
  - [ ] Towers = 10 coins
  - [ ] Walls = 2 coins
  - [ ] Convert monster HP to coins
  - [ ] Boss = 200 coins

### Upgrading
- [ ] Implement upgrading
  - [ ] Make it exponentially expensive
  - [ ] Double damage and HP on upgrade

### Repairing
- [ ] Add repairing mechanism
  - [ ] 1 coin per HP
  - [ ] Cannot repair if enemy is closer than 5-10 tiles

### UI Improvements
- [ ] Add UI to choose which building to place
- [ ] Implement drag feature to create long walls

## Medium Priority

### Additional Buildings
- [ ] Add more buildings
  - [ ] Mine to get currency ($)
    - [ ] Consider a minecart that goes back and forth
    - [ ] Determine if it needs resources or can be placed anywhere
  - [ ] Barracks to recruit troops (B)
  - [X] Bomb tower with AOE attack (B)
    - [X] Use 'o' as icon
    - [ ] Use '#' as AOE icon (radius circle)
  - [ ] Ice tower to slow enemies (I)
    - [ ] Cyan arrow (*)
  - [ ] Poison tower to do damage over time (P)
    - [ ] Green arrow (*)
  - [ ] Laser tower that shoots a beam in a straight line, hitting everything (L)
    - [ ] Projectile is a line '-' or '|'
    - [ ] Cons: slow, expensive, cannot shoot diagonally

### Enemy Types
- [ ] Add different enemy types
  - [X] Normal (M)
  - [ ] Speed (S)
  - [ ] Tanky (T)
  - [ ] Flying (F)
  - [X] Boss (X)

## Low Priority

### Waves and Enemy Base
- [ ] Implement enemy waves instead of continuous spawn
  - [ ] 10 waves
  - [ ] 10 * wave number enemies
    - [ ] HP = wave number * 10
    - [ ] Damage = wave number * 2
  - [ ] 10 seconds between waves
- [ ] Add an enemy base that can be attacked with troops

### Performance Enhancements
- [ ] Cache enemy path to improve performance

### Menu
- [ ] Add a menu
  - [ ] Start
  - [ ] Restart
  - [ ] Quit
