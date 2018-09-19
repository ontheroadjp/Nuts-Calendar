import userModule from '../../../../../../src/store/modules/user/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/user/index.js', () => {
    const { state } = userModule;
    const { init } = userModule.mutations;
    const user = {
        name: 'test user',
        max_calendars: 3,
        max_members: 10,
        max_shared_members: 1
    };

    const userPlan = {};

    describe('mutations', () => {
        it('init', () => {
            init(state, {user, userPlan});
            expect(state.data.user).is.eql(user);
            expect(state.data.name).is.eql(user.name);
//            expect(state.data.maxCalendars).is.eql(user.max_calendars);
//            expect(state.data.maxMembers).is.eql(user.max_members);
//            expect(state.data.maxSharedMembers).is.eql(user.max_shared_members);
        });
    });
});
