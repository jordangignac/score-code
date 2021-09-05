/**
 * Reduce collection of functions piping output to next function
 * (To make things a little more functional)
 */
export const pipeData = (...functions) => {
  return data =>
    functions.reduce((data, func) => {
      return func(data);
    }, data);
};
