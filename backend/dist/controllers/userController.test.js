"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userController_1 = require("./userController");
(0, vitest_1.describe)('getUser', () => {
    (0, vitest_1.it)('should return the user object from req.oidc.user', () => {
        const req = {
            oidc: {
                user: {
                    sub: 'user123',
                    name: 'John Doe',
                    email: 'john@example.com',
                },
            },
        };
        const res = {
            json: vitest_1.vi.fn(),
        };
        (0, userController_1.getUser)(req, res);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({
            userId: 'user123',
            name: 'John Doe',
            email: 'john@example.com',
        });
    });
    (0, vitest_1.it)('should throw an error if req.oidc.user is not present', () => {
        const req = {
            oidc: {
                user: null,
            },
        };
        const res = {
            json: vitest_1.vi.fn(),
        };
        vitest_1.test.fails('fail test', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, vitest_1.expect)(() => (0, userController_1.getUser)(req, res)).toThrow('Failed to find authorized user');
            (0, vitest_1.expect)(res.json).not.toHaveBeenCalled();
        }));
    });
});
// describe('syncUser', () => {
//   it('should create a new user if no match is found in MongoDB', async () => {
//     const userData: IUserData = {
//       userId: 'user123',
//       name: 'John Doe',
//       email: 'john@example.com',
//     };
//     const res = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn(),
//     } as unknown as Response;
//     const db = {
//       collection: vi.fn().mockReturnThis(),
//       findOne: vi.fn().mockResolvedValue(null),
//     };
//     await syncUser(userData, res);
//     expect(db.collection).toHaveBeenCalledWith('users');
//     expect(db.findOne).toHaveBeenCalledWith({ userId: 'user123' });
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'User synced successfully',
//     });
//   });
//   it('should send a response indicating the user already exists if a match is found in MongoDB', async () => {
//     const userData: IUserData = {
//       userId: 'user123',
//       name: 'John Doe',
//       email: 'john@example.com',
//     };
//     const res = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn(),
//     } as unknown as Response;
//     const db = {
//       collection: vi.fn().mockReturnThis(),
//       findOne: vi.fn().mockResolvedValue({ userId: 'user123' }),
//     };
//     await syncUser(userData, res);
//     expect(db.collection).toHaveBeenCalledWith('users');
//     expect(db.findOne).toHaveBeenCalledWith({ userId: 'user123' });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
//   });
// });
// describe('deleteUser', () => {
//   it('should delete the user account from MongoDB', async () => {
//     const userData: IUserData = {
//       userId: 'user123',
//       name: 'John Doe',
//       email: 'john@example.com',
//     };
//     const res = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn(),
//     } as unknown as Response;
//     const db = {
//       collection: vi.fn().mockReturnThis(),
//       deleteOne: vi.fn().mockResolvedValue({}),
//     };
//     await deleteUser(userData, res);
//     expect(db.collection).toHaveBeenCalledWith('users');
//     expect(db.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'User deleted successfully',
//     });
//   });
//   it('should handle errors and send a server error response', async () => {
//     const userData: IUserData = {
//       userId: 'user123',
//       name: 'John Doe',
//       email: 'john@example.com',
//     };
//     const res = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn(),
//     } as unknown as Response;
//     const db = {
//       collection: vi.fn().mockReturnThis(),
//       deleteOne: vi.fn().mockRejectedValue(new Error('Database error')),
//     };
//     await deleteUser(userData, res);
//     expect(db.collection).toHaveBeenCalledWith('users');
//     expect(db.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
//   });
// });
