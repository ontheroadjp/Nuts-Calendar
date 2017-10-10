import itemModule from '../../../../../../src/store/modules/item/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/item/index.js', () => {
    const { state } = itemModule;
    const { init } = itemModule.mutations;
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

    it('init', () => {
        init(state, items);
        expect(Object.keys(state.data.items).length).is.eql(8);
    });
});
