import textInput from '../../../src/components/form/text-input.vue';
import { mount } from 'avoriaz';

describe('text-input.vue', () => {
    it('has error props:minTextValue value is 10 and initialValue is hoge', () => {
        const wrapper = mount(textInput, {
            propsData: {
                initialValue: 'hoge',
                minTextValue: 10
            }
        });
        expect(wrapper.instance().errorResult()).to.be.eql(false);
    });
});
