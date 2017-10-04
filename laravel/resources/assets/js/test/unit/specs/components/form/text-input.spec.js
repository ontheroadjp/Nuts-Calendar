import textInput from '../../../../../src/components/form/text-input.vue';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

describe('components/form/text-input.vue', () => {

    const propsData = {
        id: 'input-id',
        initialValue: 'hoge',
        minTextLength: 5,
        maxTextLength: 20
    };

    describe('state values', () => {
        const wrapper = mount(textInput, { propsData });
        const inputForm = wrapper.find('input#input-id');

        it('when mounted', () => {
            const value = {
                initial: wrapper.vm.initialValue,
                input: wrapper.vm.input.value,
                form: inputForm.element.value
            };

            expect(value.initial).to.be.eql('hoge');
            expect(value.input).to.be.eql('hoge');
            expect(value.form).to.be.eql('hoge');
        });

        it('when form-value is change to \'foo\'', () => {
            inputForm.element.value = 'foo';
            inputForm.trigger('input');
            const value = {
                initial: wrapper.vm.initialValue,
                input: wrapper.vm.input.value,
                form: inputForm.element.value
            };

            expect(value.initial).to.be.eql('hoge');
            expect(value.input).to.be.eql('foo');
            expect(value.form).to.be.eql('foo');
        });
    });

    describe('errorResult', () => {
        // props: { min: 5, max: 20 .. }
        const wrapper = mount(textInput, { propsData });

        it('input.value < minTextLength ', () => {
            wrapper.vm.input.value = '1234';
            expect(wrapper.vm.errorResult).to.be.eql(true)
        });

        it('input.value > minTextLength', () => {
            wrapper.vm.input.value = '12345';
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value < maxTextLength', () => {
            wrapper.vm.input.value = '12345678901234567890';
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value > maxTextLength', () => {
            wrapper.vm.input.value = '123456789012345678901';
            expect(wrapper.vm.errorResult).to.be.eql(true);
        });
    });

    describe('fire event', () => {
        const wrapper = mount(textInput, { propsData });
        const inputForm = wrapper.find('input#input-id');
        const emitData = {
            id: wrapper.vm.id,
            initialValue: wrapper.vm.initialValue,
            inputValue: wrapper.vm.input.value,
            error: wrapper.vm.errorResult,
            isReady: false
        };

        it('when keyup event occured', () => {
            const fireEvent = sinon.spy(wrapper.vm, 'fireEvent');
            const emit = sinon.spy(wrapper.vm, '$emit');
            inputForm.trigger('keyup');
            expect(fireEvent.callCount).to.be.eql(1);
            expect(emit.calledWith('changeValue', emitData)).to.be.ok;
            fireEvent.restore();
            emit.restore();
        });

        it('when blur event occured', () => {
            const fireEvent = sinon.spy(wrapper.vm, 'fireEvent');
            const emit = sinon.spy(wrapper.vm, '$emit');
            inputForm.trigger('blur');
            expect(fireEvent.callCount).to.be.eql(1);
            expect(emit.calledWith('blurValue', emitData)).to.be.ok;
            fireEvent.restore();
            emit.restore();
        });
    });
});
