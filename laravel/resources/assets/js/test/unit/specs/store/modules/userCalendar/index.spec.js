import userCalendarModule from '../../../../../../src/store/modules/userCalendar/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/userCalendar/index.js', () => {
    const { state } = userCalendarModule;
    const { init, add, remove } = userCalendarModule.mutations;
    const userCalendars = {
        1: { name: 'user calendar 1' },
        2: { name: 'user calendar 2' }
    };

    const userCalendarA = { name: 'user Calendar A' };
    const userCalendarB = { name: 'user Calendar B' };
    const userCalendarC = { name: 'user Calendar C' };

    describe('mutations', () => {
        it('init', () => {
            init(state, userCalendars);
            expect(Object.keys(state.data.userCalendars).length).is.eql(2);
        });

        it('add', () => {
            add(state, {id: 100, userCalendarA});
            expect(Object.keys(state.data.userCalendars).length).is.eql(3);
            add(state, {id: 200, userCalendarB});
            add(state, {id: 300, userCalendarC});
            expect(Object.keys(state.data.userCalendars).length).is.eql(5);
        });

        it('remove', () => {
            remove(state, {id: 100});
            expect(Object.keys(state.data.userCalendars).length).is.eql(4);
            remove(state, {id: 200});
            remove(state, {id: 300});
            expect(Object.keys(state.data.userCalendars).length).is.eql(2);
        });
    });
});
