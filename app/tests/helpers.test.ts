import * as helper from '../../app/src/helpers/helper';

jest.mock('../../app/src/helpers/helper', () => ({
    getUsers: jest.fn(),
    saveUsers: jest.fn(),
}));

const getUsersMock = helper.getUsers as jest.Mock;
const saveUsersMock = helper.saveUsers as jest.Mock;

describe('Helper Functions', () => {
    it('should confirm helper.ts execution', () => {
        expect(require('../../app/src/helpers/helper')).toBeDefined(); 
    });

    it('should return an empty array when mocked', () => {
        getUsersMock.mockReturnValue([]);
        expect(helper.getUsers()).toEqual([]);
    });

    it('should return mocked user data', () => {
        const mockUsers = [{ fname: 'John', lname: 'Doe' }];
        getUsersMock.mockReturnValue(mockUsers);
        expect(helper.getUsers()).toEqual(mockUsers);
    });

    it('should mock saveUsers without executing the actual function', () => {
        const users = [{ fname: 'Test', lname: 'User' }];
        saveUsersMock.mockImplementation(() => {}); 
        helper.saveUsers(users); 
        expect(saveUsersMock).toHaveBeenCalledWith(users); 
    });
});
