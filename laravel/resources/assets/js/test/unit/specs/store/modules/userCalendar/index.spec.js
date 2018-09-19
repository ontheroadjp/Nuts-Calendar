import userCalendarModule from '../../../../../../src/store/modules/userCalendar/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/userCalendar/index.js', () => {
    const { state } = userCalendarModule;
    const { INIT, ADD, REMOVE } = userCalendarModule.mutations;
    const userCalendars = {
        1: { name: 'user calendar 1' },
        2: { name: 'user calendar 2' }
    };

    const userCalendarA = { name: 'user Calendar A' };
    const userCalendarB = { name: 'user Calendar B' };
    const userCalendarC = { name: 'user Calendar C' };

    describe('mutations', () => {
        it('INIT', () => {
            INIT(state, userCalendars);
            expect(Object.keys(state.data.userCalendars).length).is.eql(2);
        });

        it('ADD', () => {
            ADD(state, {id: 100, userCalendarA});
            expect(Object.keys(state.data.userCalendars).length).is.eql(3);
            ADD(state, {id: 200, userCalendarB});
            ADD(state, {id: 300, userCalendarC});
            expect(Object.keys(state.data.userCalendars).length).is.eql(5);
        });

        it('REMOVE', () => {
            REMOVE(state, {id: 100});
            expect(Object.keys(state.data.userCalendars).length).is.eql(4);
            REMOVE(state, {id: 200});
            REMOVE(state, {id: 300});
            expect(Object.keys(state.data.userCalendars).length).is.eql(2);
        });
    });
});
