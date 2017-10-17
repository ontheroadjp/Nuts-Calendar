import userCalendarMemberModule from '../../../../../../src/store/modules/userCalendarMember/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/userCalendarMember/index.js', () => {
    const { state } = userCalendarMemberModule;
    const { init, add, remove } = userCalendarMemberModule.mutations;
    const userCalendarMembers = [
        { id: 1, user_calendar_id: 1, member_id: 1 },
        { id: 2, user_calendar_id: 1, member_id: 2 },
        { id: 3, user_calendar_id: 1, member_id: 3 },
        { id: 4, user_calendar_id: 2, member_id: 1 },
        { id: 5, user_calendar_id: 2, member_id: 2 },
        { id: 6, user_calendar_id: 3, member_id: 1 }
    ];

    const userCalendarMemberA = { id: 100, user_calendar_id: 1, member_id: 4 };
    const userCalendarMemberB = { id: 200, user_calendar_id: 1, member_id: 5 };
    const userCalendarMemberC = { id: 300, user_calendar_id: 2, member_id: 3 };
    const userCalendarMemberD = { id: 400, user_calendar_id: 2, member_id: 4 };
    const userCalendarMemberE = { id: 500, user_calendar_id: 3, member_id: 2 };
    const userCalendarMemberF = { id: 600, user_calendar_id: 3, member_id: 3 };

    describe('mutations', () => {
        it('init', () => {
            init(state, userCalendarMembers);
            expect(state.data.userCalendarMembers.length).is.eql(6);
        });

        it('add', () => {
            add(state, { obj: userCalendarMemberA });
            expect(state.data.userCalendarMembers.length).is.eql(7);
            add(state, { obj: userCalendarMemberB });
            add(state, { obj: userCalendarMemberC });
            add(state, { obj: userCalendarMemberD });
            add(state, { obj: userCalendarMemberE });
            add(state, { obj: userCalendarMemberF });
            expect(state.data.userCalendarMembers.length).is.eql(12);
        });

        it('remove', () => {
            remove(state, { obj: userCalendarMemberA });
            expect(state.data.userCalendarMembers.length).is.eql(11);
            remove(state, { obj: userCalendarMemberB });
            remove(state, { obj: userCalendarMemberC });
            remove(state, { obj: userCalendarMemberD });
            remove(state, { obj: userCalendarMemberE });
            remove(state, { obj: userCalendarMemberF });
            expect(state.data.userCalendarMembers.length).is.eql(6);
        });
    });
});
