import {ReversePipe} from './reverse.pipe';

describe('ReversePipe', () => {
  let reversePipe: ReversePipe;
  beforeEach(() => {
    reversePipe = new ReversePipe();
  });

  it('should pipe', () => {
    expect(reversePipe.transform('Hello')).toEqual('olleH');
  });
});
