import { PqvTopSegmentPipe } from './top-segment.pipe';
import { PqvTotalsBySegmentPipe } from './totals-by-segment.pipe';

describe('TopSegmentPipe', () => {
  it('create an instance', () => {
    const pipe = new PqvTopSegmentPipe(new PqvTotalsBySegmentPipe());
    expect(pipe).toBeTruthy();
  });
});
