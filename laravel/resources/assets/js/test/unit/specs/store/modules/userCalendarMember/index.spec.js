import userCalendarMemberModule from '../../../../../../src/store/modules/userCalendarMember/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/userCalendarMember/index.js', () => {
    const { state } = userCalendarMemberModule;
    const { init } = userCalendarMemberModule.mutations;
    const userCalendarMembers = {
        1: {
            name: 'user calendar member 1'
        },
        2: {
            name: 'user calendar member 2'
        },
        3: {
            name: 'user calendar member 3'
        },
        4: {
            name: 'user calendar member 4'
        },
        5: {
            name: 'user calendar member 5'
        },
        6: {
            name: 'user calendar member 6'
        }
    };

    it('init', () => {
        init(state, userCalendarMembers);
        expect(Object.keys(state.data.userCalendarMembers).length).is.eql(6);
    });
});
