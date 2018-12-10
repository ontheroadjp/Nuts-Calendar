import testModule from '../../../../../../src/store/modules/calendar/table-view/item/remove.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/item/remove.js', () => {
    const { state } = testModule;
    const { prepare, remove, reset } = testModule.actions;
    const { PREPARE, REMOVE, IS_LOADING, RESET, NOTIFY_SUCCESS, NOTIFY_DANGER } = testModule.mutations;

    describe('actions', () => {
        it('prepare', (done) => {
            const cellItems = [];
            const removingItem = {};

            testAction(prepare, { cellItems, removingItem }, { rootGetters: {} }, [
                { type: 'PREPARE', payload: { cellItems, removingItem } }
            ], done);
        });

        it('remove', (done) => {
            const resolved = new Promise.resolve();
            const httpStub = sinon.stub(http, 'fetchDelete').returns(resolved);

            testAction(remove, null, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'REMOVE' },
                { type: 'calendar/tableView/updateCellItems', payload: state.cellItems },
                { type: 'NOTIFY_SUCCESS', payload: {content: 'success remove item', isImportant: false} },
                { type: 'RESET' }
            ], done);

            http.fetchDelete.restore();
        });
    });

    describe('mutations', () => {
        it('PREPARE', () => {
            PREPARE(state, { cellItems: {}, removingItem: {id: 12345} } );
            expect(state.cellItems).to.be.eql({});
            expect(state.removingItem).to.be.eql({id: 12345});
            expect(state.isActive).to.be.true;
        });

        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });

        it('REMOVE', () => {
            state.cellItems = [
                { id: 123 },
                { id: 456 },
                { id: 789 }
            ];
            expect(state.cellItems.length).to.be.eql(3);
            REMOVE(state);
            expect(state.cellItems.length).to.be.eql(2);
        });

        it('RESET', () => {
            RESET(state);
            expect(state.isActive).to.be.false;
            expect(state.isLoading).to.be.false;
            expect(state.cellItems).to.be.eql('');
            expect(state.removingItem).to.be.eql('');
        });
    });
});
