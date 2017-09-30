import Checkbox from '../../../../../src/components/form/checkbox.vue';
import { mount } from 'avoriaz';
//import sinon from 'sinon';


describe('components/form/checkbox.vue', () => {
    const propsData = {
        id: 'input-id',
        initialValue: false
    }

    describe('state values', () => {
        const wrapper = mount(Checkbox, { propsData });
        const input = wrapper.find('input#input-id')[0];

        it('should have values when mounted', () => {
            expect(wrapper.vm.initialValue).to.be.eql(false);
            expect(wrapper.data().input).to.be.eql(false);
            expect(input.element.checked).to.be.eql(false);
            expect(wrapper.vm.isReadyResult).to.be.eql(false);
        });

        it('should have values when checkbox is checked', () => {
            wrapper.setData({input: true});

            expect(wrapper.vm.initialValue).to.be.eql(false);
            expect(wrapper.vm.input).to.be.eql(true);
            expect(input.element.checked).to.be.eql(true);
            expect(wrapper.vm.isReadyResult).to.be.eql(true);
        });
    });

    describe('event', () => {
        const onChange = sinon.spy(Checkbox.methods, 'onChange');
        const wrapper = mount(Checkbox, { propsData });
        const emit = sinon.spy(wrapper.vm, '$emit');
        const input = wrapper.find('input#input-id')[0];

        it('will call $emit via onChange() when change event occured', () => {
            input.element.checked = true;
            input.trigger('change');

            expect(onChange.callCount).to.be.eql(1);
            expect(emit.calledWith('changeValue',{
                value: wrapper.data().input,
               error: false,
               isReady: wrapper.vm.isReadyResult
            })).to.be.ok;
        });
    });
});
