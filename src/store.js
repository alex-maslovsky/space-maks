let maxX = null;
let maxPolygon = [];
let score = 0;

export const setMaxX = (x) => maxX = x;
export const getMaxX = () => maxX;

export const setMaxPolygon = (polygon) => {
    maxPolygon = polygon.map(({ x, y }) => [ x, y ]);
};
export const getMaxPolygon = () => maxPolygon;

export const getScore = () => score;
export const setScore = (value) => score = value;
