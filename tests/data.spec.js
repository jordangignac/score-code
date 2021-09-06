const tools = require('../tools/data');

describe('sortData', () => {
  test('returns original data set when no field arg supplied', () => {
    const testVals = ['3', '2', '5', '2', '1', '6', '7', '8'];
    const result = tools.sortData()(testVals);

    expect(result[0]).toBe('3');
    expect(result[result.length - 1]).toBe('8');
  });
  test('properly sorts dataset containing numbers', () => {
    const testVals = [3, 2, 5, 2, 1, 6, 7, 8];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds')(testObjs);

    expect(result[0].Yds).toBe(1);
    expect(result[result.length - 1].Yds).toBe(8);
  });
  test('properly sorts dataset containing strings', () => {
    const testVals = ['aaa', 'bbb', 'ccc', 'aab', 'ddd', 'BBe'];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds')(testObjs);

    expect(result[0].Yds).toBe('aaa');
    expect(result[result.length - 1].Yds).toBe('ddd');
  });
  test('properly sorts dataset containing numbers as strings', () => {
    const testVals = ['3', '2', '5', '2', '1', '6', '7', '8'];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds')(testObjs);

    expect(result[0].Yds).toBe('1');
    expect(result[result.length - 1].Yds).toBe('8');
  });
  test('properly sorts dataset containing negative numbers', () => {
    const testVals = [3, 2, 5, -2, 1, 6, 7, -8];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds')(testObjs);

    expect(result[0].Yds).toBe(-8);
    expect(result[result.length - 1].Yds).toBe(7);
  });
  test('properly sorts dataset containing numbers with included strings', () => {
    const testVals = ['3', '2T', '5', '-2', '1', '6', '7T', '8T'];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds')(testObjs);

    expect(result[0].Yds).toBe('-2');
    expect(result[result.length - 1].Yds).toBe('8T');
  });
  test('sorts in descending order when desc supplied as second arg', () => {
    const testVals = [3, 2, 5, 2, 1, 6, 7, 8];
    const testObjs = testVals.map(i => ({Yds: i}));
    const result = tools.sortData('Yds', 'desc')(testObjs);

    expect(result[0].Yds).toBe(8);
    expect(result[result.length - 1].Yds).toBe(1);
  });
});

describe('filterData', () => {
  const testVals = ['aaa', 'bbb', 'ccc', 'aab', 'ddd', 'BBe'];

  test('is case insensitive when filtering data', () => {
    const testArr = testVals.map(i => ({Player: i}));
    const result = tools.filterData('bb')(testArr);

    expect(result.length).toBe(2);
  });

  test('returns all items when no search term is supplied', () => {
    const testArr = testVals.map(i => ({Player: i}));
    const result = tools.filterData()(testArr);

    expect(result.length).toBe(testArr.length);
  });

  test('returns only objects where property "Player" includes search term when no field arg supplied', () => {
    const testArr = testVals.map(i => ({Player: i}));
    const result = tools.filterData('aa')(testArr);

    expect(result.length).toBe(2);
  });

  test('filters on field supplied as second arg instead of default Player when present', () => {
    const testArr = testVals.map(i => ({Test: i}));
    const result = tools.filterData('cc', 'Test')(testArr);

    expect(result.length).toBe(1);
  });

  test('returns no items when search term is not found in dataset', () => {
    const testArr = testVals.map(i => ({Player: i}));
    const result = tools.filterData('zz')(testArr);

    expect(result.length).toBe(0);
  });
});

describe('paginateData', () => {
  const testVals = Array(35)
    .fill(0)
    .map((_, i) => i + 1);

  test('returns first 25 items of data when no args or page=1 arg supplied', () => {
    const result = tools.paginateData()(testVals);
    const expectVals = Array(25)
      .fill(0)
      .map((_, i) => i + 1);

    expect(result.length).toBe(25);
    expect(result.every(i => expectVals.includes(i))).toBe(true);

    const result2 = tools.paginateData(1)(testVals);

    expect(result2.length).toBe(25);
    expect(result2.every(i => expectVals.includes(i))).toBe(true);
  });

  test('returns next 25 items when page=2 is supplied to args', () => {
    const result = tools.paginateData(2)(testVals);
    const expectVals = Array(testVals.length - 25)
      .fill(0)
      .map((_, i) => i + 1 + 25);

    expect(result.length).toBe(testVals.length - 25);
    expect(result.every(i => expectVals.includes(i))).toBe(true);
  });

  test('returns data chunked into supplied size arg', () => {
    const size = 5;
    const result = tools.paginateData(1, size)(testVals);

    expect(result.length).toBe(size);
  });

  test('returns all data when supplied size arg is greater than data length', () => {
    const size = 100;
    const result = tools.paginateData(1, size)(testVals);

    expect(result.length).toBe(testVals.length);
  });

  test('returns no items when page * size is greater than total items', () => {
    const result = tools.paginateData(10, 25)(testVals);

    expect(result.length).toBe(0);
  });
});

describe('validateRequestParams', () => {
  test('returns null when all params are valid', () => {
    const params = [25, 'Yds', 'asc'];
    const result = tools.validateRequestParams(...params);

    expect(result).toBe(null);
  });
  test('returns proper error string when field arg invalid', () => {
    const params = [25, 'Random', 'asc'];
    const result = tools.validateRequestParams(...params);

    expect(result).toBe('Invalid sort field param');
  });
  test('returns proper error string when direction arg invalid', () => {
    const params = [25, 'Yds', 'up'];
    const result = tools.validateRequestParams(...params);

    expect(result).toBe('Invalid sort direction param');
  });
  test('returns proper error string when size arg invalid', () => {
    const params = [1000, 'Yds', 'asc'];
    const result = tools.validateRequestParams(...params);

    expect(result).toBe('Invalid row size param');
  });
});
