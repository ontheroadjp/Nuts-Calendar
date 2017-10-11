import itemModule from '../../../../../../src/store/modules/item/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/item/index.js', () => {
    const { state } = itemModule;
    const { init, add, remove } = itemModule.mutations;
    const items = {
        1: { id: 1, name: 'item 1' },
        2: { id: 2, name: 'item 2' },
        3: { id: 3, name: 'item 3' },
        4: { id: 4, name: 'item 4' },
        5: { id: 5, name: 'item 5' },
        6: { id: 6, name: 'item 6' },
        7: { id: 7, name: 'item 7' },
        8: { id: 8, name: 'item 8' },
    };

    describe('mutations', () => {

        const itemA = { id: 1000, name: 'itemA' };
        const itemB = { id: 2000, name: 'itemB' };
        const itemC = { id: 3000, name: 'itemC' };

        it('init', () => {
            init(state, items);
            expect(Object.keys(state.data.items).length).is.eql(8);
        });

        it('add', () => {
            add(state, itemA);
            expect(Object.keys(state.data.items).length).is.eql(9);
            add(state, itemB);
            add(state, itemC);
            expect(Object.keys(state.data.items).length).is.eql(11);
        });

        it('remove', () => {
            remove(state, itemA);
            expect(Object.keys(state.data.items).length).is.eql(10);
            remove(state, itemB);
            remove(state, itemC);
            expect(Object.keys(state.data.items).length).is.eql(8);
        });
    });
});
