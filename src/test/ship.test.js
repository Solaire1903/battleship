import Ship from "../ship.js";

describe("Function Test: hit", () => {
  const ship = new Ship(5);

  test("Ship starts with 0 hits taken", () => {
    expect(ship.hitsTaken).toBe(0);
  });

  test("Ship takes a hit", () => {
    ship.hit();
    expect(ship.hitsTaken).toBe(1);
  });

  test("Ship takes two more hits", () => {
    ship.hit();
    ship.hit();
    expect(ship.hitsTaken).toBe(3);
  });
});

describe("Function Test: isSunk", () => {
  const ship = new Ship(2);

  test("Ship is not sunk yet", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("Ship is sunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
