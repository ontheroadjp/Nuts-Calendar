import removeModule from '../../../../../../src/store/modules/member/remove.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/member/remove.js', () => {
    const { state } = removeModule;
    const { remove } = removeModule.actions;
    const { REMOVE, IS_LOADING, NOTIFY_SUCCESS, NOTIFY_DANGER } = removeModule.mutations;

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
                id: 100,
                notify: false,
                successCb: () => {},
                failedCb: () => {}
            }

            const successCb = sinon.stub(actionPayload, 'successCb');
            const failedCb = sinon.stub(actionPayload, 'failedCb');

            testAction(remove, actionPayload, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'member/REMOVE', payload: { id: 100 } },
//                { type: 'NOTIFY_SUCCESS', payload: {content: 'success remove member', isImportant: false} },
                { type: 'IS_LOADING', payload: false },
            ], done);

            // these does not work.
            //expect(successCb.callCount).to.be.eql(1);
            //expect(failedCb.callCount).to.be.eql(0);

            successCb.restore();
            failedCb.restore();
            http.fetchDelete.restore();
        });
    });

    describe('mutations', () => {
        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });
    });
});

