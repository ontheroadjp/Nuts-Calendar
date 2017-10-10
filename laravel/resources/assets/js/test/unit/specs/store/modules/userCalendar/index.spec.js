import userCalendarModule from '../../../../../../src/store/modules/userCalendar/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/userCalendar/index.js', () => {
    const { state } = userCalendarModule;
    const { init } = userCalendarModule.mutations;
    const userCalendars = {
        1: {
            name: 'user calendar 1'
        },
        2: {
            name: 'user calendar 2'
        }
    };

    it('init', () => {
        init(state, userCalendars);
        expect(Object.keys(state.data.userCalendars).length).is.eql(2);
    });
});
