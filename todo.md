# Game Development To-Do List

## High Priority

### Images
- [x] Add images for buildings
  - [x] Tower
  - [x] Wall
  - [x] Monster
  - [x] Boss

## Terrain
- [x] Terrain generation 

### Currency
- [x] Add currency
  - [x] Towers = 20 coins
  - [x] Walls = 5 coins
  - [x] Convert monster HP to coins
  - [ ] Boss = 200 coins

### Upgrading
- going from normal to ice/bomb/poison/laser tower
- [x] going from normal to bomb tower
  - [ ] Use some kind of UI to select which tower to upgrade to
 
### Improving
- improving existing towers
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
  - [x] Bomb tower with AOE attack 
  - [ ] Ice tower to slow enemies 
  - [ ] Poison tower to do damage over time 
  - [ ] Laser tower that shoots a beam in a straight line, hitting everything 
    - [ ] Cons: slow, expensive, cannot shoot diagonally

### Enemy Types
- [ ] Add different enemy types
  - [X] Normal
  - [ ] Speed
  - [ ] Tanky 
  - [ ] Flying
  - [x] Boss 

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
- [X] Cache enemy path to improve performance

### Menu
- [ ] Add a menu
  - [ ] Start
  - [ ] Restart
  - [ ] Quit
