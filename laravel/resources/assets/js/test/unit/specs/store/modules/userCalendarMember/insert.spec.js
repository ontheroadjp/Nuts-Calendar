import insertModule from '../../../../../../src/store/modules/userCalendarMember/insert.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/userCalendarMember/insert.js', () => {
    const { state } = insertModule;
    const { insert } = insertModule.actions;
    const { IS_LOADING } = insertModule.mutations;

    const payload = {
        userCalendarId: 150,
        memberId: 200
    };

    describe('actions', () => {
        it('insert', (done) => {
            const responseData = {
                data: {
                    id: 123
                }
            };
            const resolved = new Promise.resolve(responseData);
            const httpStub = sinon.stub(http, 'fetchPost').returns(resolved);

            const actionPayload = {
                userCalendarId: 150,
                memberId: 200
            }

            testAction(insert, actionPayload, state, [
                { type: 'IS_LOADING', payload: true },
                { type: 'userCalendarMember/add', payload: { obj: responseData.data } },
                { type: 'IS_LOADING', payload: false }
            ], done);

            httpStub.restore();
        });
    });

    describe('mutations', () => {
        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });
    });
});
