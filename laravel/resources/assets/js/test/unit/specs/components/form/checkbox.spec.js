
import checkbox from '../../../../../src/components/form/checkbox.vue';
import { mount } from 'avoriaz';

describe('checkbox.vue', () => {
    const wrapper = mount(checkbox, {
        propsData: {
            id: 'input-id',
            initialValue: false
        }
    });

    describe('when component mounted', () => {
        it('initialValue should equal to false', () => {
            expect(wrapper.vm.initialValue).to.be.eql(false);
        });

        it('input.value should equal to initialValue', () => {
            expect(wrapper.data().input).to.be.eql(wrapper.vm.initialValue);
        });

        it('form value should equal to input.value', () => {
            const input = wrapper.find('input#input-id')[0]
            expect(input.element.checked).to.be.eql(wrapper.data().input);
        });

        it('isReadyResult should be false', () => {
            expect(wrapper.vm.isReadyResult).to.be.eql(false);
        });
    });

    describe('when form value changed to true', () => {
        it('input.value should equal to true', () => {
            const input = wrapper.find('input#input-id')[0];
            input.element.checked = true;
            input.trigger('change');
            expect(wrapper.data().input).to.be.eql(true);
        });

        it('form value should not equal to initialValue', () => {
            const input = wrapper.find('input#input-id')[0];
            expect(wrapper.vm.initialValue).to.be.eql(false);
        });

        it('isReadyResult should be true', () => {
            expect(wrapper.vm.isReadyResult).to.be.eql(true);
        });

    });

    describe('when event occured on form, onChange() called', () => {
        const onChange = sinon.spy(wrapper.vm, 'onChange');
        it('change event occured', () => {
            wrapper.find('input#input-id')[0].trigger('change');
            expect(onChange.callCount).to.be.eql(1);
        });
    });
});
