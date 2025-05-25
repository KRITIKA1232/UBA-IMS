import { getUsers, saveUsers } from '../../app/src/helpers/helper';

describe('Edge Case Testing for Helper Functions', () => {
    it('should handle saving users correctly when the array is empty', () => {
        saveUsers([]);
        expect(getUsers()).toEqual([]);
    });

    it('should correctly identify duplicates in getUsers', () => {
        saveUsers([{ fname: 'Alice', lname: 'Doe' }, { fname: 'Alice', lname: 'Doe' }]);
        const users = getUsers();
        expect(users.filter(user => user.fname === 'Alice').length).toBeGreaterThan(1); // ✅ Ensures duplicate exists
    });

    it('should process user saving for multiple users', () => {
        const users = [{ fname: 'Test1', lname: 'User1' }, { fname: 'Test2', lname: 'User2' }];
        saveUsers(users);
        expect(getUsers()).toEqual(users);
    });

    it('should correctly retrieve users when list is populated', () => {
        const mockUsers = [{ fname: 'John', lname: 'Doe' }, { fname: 'Jane', lname: 'Smith' }];
        saveUsers(mockUsers);
        expect(getUsers()).toEqual(mockUsers);
    });
});
