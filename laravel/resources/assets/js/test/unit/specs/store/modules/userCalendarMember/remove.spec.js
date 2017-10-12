import removeModule from '../../../../../../src/store/modules/userCalendarMember/remove.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/userCalendarMember/remove.js', () => {
    const { state } = removeModule;
    const { remove } = removeModule.actions;
    const { IS_LOADING } = removeModule.mutations;

    describe('actions', () => {
        it('remove', (done) => {
            const responseData = {
                data: {
                    id: 123
                }
            };
            const resolved = new Promise.resolve(responseData);
            const httpStub = sinon.stub(http, 'fetchDelete').returns(resolved);

            const actionPayload = {
                userCalendarId: 1000,
                memberId: 1234
            }

            testAction(remove, actionPayload, state, [
                { type: 'IS_LOADING', payload: true },
                { type: 'userCalendarMember/remove', payload: { obj: responseData.data } },
                { type: 'IS_LOADING', payload: false },
            ], null, done);

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

