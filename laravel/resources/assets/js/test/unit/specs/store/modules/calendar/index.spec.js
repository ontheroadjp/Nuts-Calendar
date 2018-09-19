import testModule from '../../../../../../src/store/modules/calendar/index.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/modules/calendar/index.js', () => {
    const { state } = testModule;
    const { fetchCalendar } = testModule.actions;
    const { INIT, SET_VALUE, IS_LOADING } = testModule.mutations;

    const calendars = {
        days: [
            {items: {memberId: 10}},
            {items: {memberId: 12}},
            {items: {memberId: 20}},
            {items: {memberId: 32}},
        ]
    };

    describe('actions', () => {
        it('fetchCalendar(viewMode: dayly)', (done) => {
            const response = {
                data: calendars
            };
            const resolved = new Promise.resolve(response);
            const httpStub = sinon.stub(http, 'fetchGet').returns(resolved);

            SET_VALUE(state, {key: 'viewMode', value: 'dayly'});

            testAction(fetchCalendar, { calendarId: 8 }, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'tableView/updateCellItems', payload: calendars.days[0].items.memberId },
                { type: 'tableView/updateCellItems', payload: calendars.days[1].items.memberId },
                { type: 'tableView/updateCellItems', payload: calendars.days[2].items.memberId },
                { type: 'tableView/updateCellItems', payload: calendars.days[3].items.memberId },
                { type: 'INIT', payload: calendars.days },
                { type: 'IS_LOADING', payload: false },
            ], done);

            http.fetchGet.restore();
        });
    });

    describe('mutations', () => {
        it('INIT', () => {
            INIT(state, calendars);
            expect(Object.keys(state.data.calendars).length).to.be.eql(1);
        });

        it('SET_VALUE: currentId', () => {
            SET_VALUE(state, {key: 'currentId', value: 8});
            expect(state.currentId).to.be.eql(8);
            expect(parseInt(window.localStorage.getItem('currentCalendarId'))).to.be.eql(state.currentId);
        });

        it('SET_VALUE: not currentId', () => {
            SET_VALUE(state, {key: 'currentYear', value: 2019});
            expect(state.currentYear).to.be.eql(2019);
        });

        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });
    });
});
