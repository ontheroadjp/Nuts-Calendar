import vuexModule from '../../../../../../src/store/modules/member/insert.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/member/insert.js', () => {
    const { state } = vuexModule;
    const { setInsertValue, insert, reset } = vuexModule.actions;
    const { ADD, IS_LOADING, RESET, SET_INSERT_VALUE, NOTIFY_SUCCESS, NOTIFY_DANGER } = vuexModule.mutations;

    describe('actions', () => {
        it('setInsertValue', (done) => {
            testAction(setInsertValue, { key: 'name', value: 'new member name' }, { state }, [
                { type: 'SET_INSERT_VALUE', payload: { key: 'name', value: 'new member name' } }
            ], done);
        });

        it('insert', (done) => {
            const responseData = {
                data: { id: 123456 }
            };
            const resolved = new Promise.resolve(responseData);
            const httpStub = sinon.stub(http, 'fetchPost').returns(resolved);

            testAction(insert, null, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'member/ADD', payload: { id: 123456, member: responseData.data } },
                { type: 'NOTIFY_SUCCESS', payload: {content: 'success add member', isImportant: false} },
                { type: 'IS_LOADING', payload: false },
                { type: 'RESET', payload: null }
            ], done);

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
