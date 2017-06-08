import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe ('Author Selector', () => {
  describe ('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {

      const authors = [
        {id: 'ian-will', firstName: 'Ian', lastName: 'Williams'},
        {id: 'barry-geiger', firstName: 'Barry', lastName: 'Geiger'}
      ];


      const expected = [
        {value: 'ian-will', text: 'Ian Williams'},
        {value: 'barry-geiger', text: 'Barry Geiger'}
      ];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
