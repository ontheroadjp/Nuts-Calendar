import testModule from '../../../../../../../../src/store/modules/calendar/table-view/item/dnd.js';
import { testAction } from '../../../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/calendar/table-view/item/dnd.js', () => {
    const { state } = testModule;
    const { dragStart, dragEnter, dragOver, drop, setOnMiniCal, dragEnd } = testModule.actions;
    const { DRAG_START, DRAG_ENTER, DROP, REVERSE_ITEM, SET_ON_MINI_CAL, DRAG_END } = testModule.mutations;

    describe('actions', () => {
        const item = {
            id: 100,
            dayIndex: 0,
            member_id: 1,
            itemIndex: 0
        };

        const cellItems = [item];
        const rootGetters = {
            getCellAddress: sinon.stub().returns('1-1'),
            getRowIndex: sinon.stub().returns(0)
        }

        it('dragStart', (done) => {
            testAction(dragStart, { cellItems, draggingItem: item}, { state, rootGetters }, [
                { type: 'DRAG_START', payload: {
                        dayIndex: item.dayIndex,
                        memberId: item.member_id,
                        cellAddress: '1-1',
                        cellItems,
                        itemIndex: item.itemIndex,
                        draggingItem: item
                    }
                }
            ], done);
        });

        it('dragEnter', (done) => {
            testAction(dragEnter, {dayString: '1-1', memberId: 1, cellItems}, { state, rootGetters }, [
                { type: 'DRAG_ENTER', payload: {
                    dayIndex: 0,
                    memberId: 1,
                    cellAddress: '1-1',
                    cellItems
                }}
            ], done);
        });

        it('drop', (done) => {
            const rootState = {
                calendar: {
                    currentYear: '2017',
                    currentMonth: '10'
                }
            };

            state.fromCell.cellAddress = '1-1';
            state.enterCell.cellAddress = '3-2';

            const resolved = new Promise.resolve();
            const httpStub = sinon.stub(http, 'fetchPut').returns(resolved);

            testAction(drop, null, { state, rootState }, [
                { type: 'DROP', payload: { y: '2017', m: '10' } },
                { type: 'calendar/tableView/updateCellItems', payload: { cellItems } },
                { type: 'calendar/tableView/updateCellItems', payload: { cellItems } },
                { type: 'DRAG_END' }
            ], done);

            http.fetchPut.restore();
        });

        it('setOnMiniCal', (done) => {
            const value = 4;
            testAction(setOnMiniCal, { value }, { state }, [
                { type: 'SET_ON_MINI_CAL', payload: { value }}
            ], done);
        });

        it('dragEnd', (done) => {
            testAction(dragEnd, null, { state }, [
                { type: 'DRAG_END' }
            ], done);
        });
    });

    describe('mutations', () => {
        const from = {
            cellAddress: '1-1',
            dayIndex: 0,
            memberId: 1,
            cellItems: [
                {id: 10}
            ],
            itemIndex: 0,
            draggingItem: {
                id: 10,
                content: 'test shopping'
            }
        };

        const to = {
            cellAddress: '2-2',
            dayIndex: 1,
            memberId: 2,
            cellItems: []
        };

        const y = 2017;
        const m = 8;

        it('DRAG_START', () => {
            DRAG_START(state, from);
            expect(state.fromCell.cellAddress).to.be.eql(from.cellAddress);
            expect(state.fromCell.dayIndex).to.be.eql(from.dayIndex);
            expect(state.fromCell.memberId).to.be.eql(from.memberId);
            expect(state.fromCell.cellItems).to.be.eql(from.cellItems);
            expect(state.fromCell.itemIndex).to.be.eql(from.itemIndex);
            expect(state.draggingItem).to.be.eql(from.draggingItem);
        });

        it('DRAG_ENTER', () => {
            DRAG_ENTER(state, to);
            expect(state.enterCell.cellAddress).to.be.eql(to.cellAddress);
            expect(state.enterCell.cellItems).to.be.eql(to.cellItems);
            expect(state.enterCell.dayIndex).to.be.eql(to.dayIndex);
            expect(state.enterCell.memberId).to.be.eql(to.memberId);
            expect(state.onMiniCal).to.be.eql('');
        });

        it('DROP', () => {
            DRAG_START(state, from);
            DRAG_ENTER(state, to);
            DROP(state, { y, m});
            expect(state.isLoading).to.be.true;
            expect(state.isDropped).to.be.true;
            expect(state.draggingItem.date).to.be.eql('2017-8-2');
            expect(state.draggingItem.member_id).to.be.eql(2);

            // from
            expect(state.fromCell.cellItems.length).to.be.eql(0);

            // to
            expect(state.enterCell.cellItems.length).to.be.eql(1);
            expect(state.enterCell.cellItems[0].id).to.be.eql(10);
        });

        it('REVERSE_ITEM', () => {
            REVERSE_ITEM(state, {y, m});
            expect(state.draggingItem.date).to.be.eql('2017-8-1');
            expect(state.draggingItem.member_id).to.be.eql(1);

            // from
            expect(state.fromCell.cellItems.length).to.be.eql(1);
            expect(state.fromCell.cellItems[0].id).to.be.eql(10);

            // to
            expect(state.enterCell.cellItems.length).to.be.eql(0);
        });

        it('SET_ON_MINI_CAL', () => {
            SET_ON_MINI_CAL(state, { value: '03'});
            expect(state.onMiniCal).to.be.eql('03');
            expect(state.enterCell.cellAddress).to.be.eql('');
            expect(state.enterCell.dayIndex).to.be.eql('');
            expect(state.enterCell.memberId).to.be.eql('');
            expect(state.enterCell.cellItems).to.be.eql([]);
        });

        it('DRAG_END', () => {
            DRAG_END(state);
            expect(state.isLoading).to.be.false;
            expect(state.isDropped).to.be.false;
            expect(state.draggingItem).to.be.eql('');
            expect(state.fromCell.cellAddress).to.be.eql('');
            expect(state.fromCell.dayIndex).to.be.eql('');
            expect(state.fromCell.memberId).to.be.eql('');
            expect(state.fromCell.cellItems).to.be.eql([]);
            expect(state.fromCell.itemIndex).to.be.eql('');
            expect(state.enterCell.cellAddress).to.be.eql('');
            expect(state.enterCell.dayIndex).to.be.eql('');
            expect(state.enterCell.memberId).to.be.eql('');
            expect(state.enterCell.cellItems).to.be.eql([]);
            expect(state.onMiniCal).to.be.eql('');
        });
    });
});
