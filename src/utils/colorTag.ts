export const colorTag: string[] = [
  'text-gray-500 bg-gray-300',

  'text-red-500 bg-red-300',

  'text-yellow-500 bg-yellow-300',

  'text-green-500 bg-green-300',

  'text-blue-500 bg-blue-300',

  'text-purple-500 bg-purple-300',

  'text-pink-500 bg-pink-300',

  'text-fuchsia-500 bg-fuchsia-300',

  'text-cyan-500 bg-cyan-300',

  'text-lime-500 bg-lime-300',
];

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
