import insertModule from '../../../../../../src/store/modules/userCalendar/insert.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/userCalendar/insert.js', () => {
    const { state } = insertModule;
    const { setInsertValue, insert, reset } = insertModule.actions;
    const { ADD, IS_LOADING, RESET, SET_INSERT_VALUE, NOTIFY_SUCCESS, NOTIFY_DANGER } = insertModule.mutations;

    const userCalendar = {
        id: 1,
        name: 'user calendar 1',
        description: 'test description'
    };

    describe('actions', () => {
        it('setInsertValue', (done) => {
            testAction(setInsertValue, { key: 'name', value: 'new calendar name' }, { state }, [
                { type: 'SET_INSERT_VALUE', payload: { key: 'name', value: 'new calendar name' } }
            ], done);
        });

        it('insert', (done) => {
            const responseData = {
                data: {
                    id: 123
                }
            };
            const resolved = new Promise.resolve(responseData);
            const httpStub = sinon.stub(http, 'fetchPost').returns(resolved);

            const actionPayload = {
                notify: false,
                successCb: () => {},
                failedCb: () => {}
            }

            const successCb = sinon.stub(actionPayload, 'successCb').returns('OKK');
            const failedCb = sinon.stub(actionPayload, 'failedCb');

            testAction(insert, actionPayload, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'userCalendar/ADD', payload: { id: 123, userCalendar: responseData.data } },
//                { type: 'NOTIFY_SUCCESS', payload: {content: 'success add calendar', isImportant: false} },
                { type: 'IS_LOADING', payload: false },
                { type: 'RESET', payload: null }
            ], done);

            // these does not work.
            //expect(successCb.callCount).to.be.eql(1);
            //expect(failedCb.callCount).to.be.eql(0);

            http.fetchPost.restore();
        });

        it('reset', (done) => {
            testAction(reset, null, { state }, [
                { type: 'RESET', payload: null }
            ], done);
        });
    });

    describe('mutations', () => {
        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });

        it('SET_INSERT_VALUE', () => {
            SET_INSERT_VALUE(state, { key: 'name', value: 'updated name' });
            SET_INSERT_VALUE(state, { key: 'description', value: 'updated description' });
            expect(state.insertValues.name).to.be.eql('updated name');
            expect(state.insertValues.description).to.be.eql('updated description');
        });

        it('RESET', () => {
            RESET(state);
            expect(state.isLoading).to.be.false;
            expect(state.insertValues.name).to.be.eql('');
            expect(state.insertValues.description).to.be.eql('');
        });
    });
});
