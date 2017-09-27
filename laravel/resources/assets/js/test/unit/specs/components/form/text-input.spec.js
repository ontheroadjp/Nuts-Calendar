import textInput from '../../../../../src/components/form/text-input.vue';
import { mount } from 'avoriaz';
import { expect } from 'chai';
import sinon from 'sinon';

describe('components/form/text-input.vue', () => {

    const propsData = {
        id: 'input-id',
        initialValue: 'hoge',
        minTextLength: 5,
        maxTextLength: 20
    };

    describe('value state', () => {
        const wrapper = mount(textInput, { propsData });
        const inputForm = wrapper.find('input#input-id')[0];

        it('when mounted', () => {
            const value = {
                initial: wrapper.vm.initialValue,
                input: wrapper.data().input.value,
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
                input: wrapper.data().input.value,
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
            wrapper.data().input.value = '1234';
            expect(wrapper.vm.errorResult).to.be.eql(true)
        });

        it('input.value > minTextLength', () => {
            wrapper.data().input.value = '12345';
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value < maxTextLength', () => {
            wrapper.data().input.value = '12345678901234567890';
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value > maxTextLength', () => {
            wrapper.data().input.value = '123456789012345678901';
            expect(wrapper.vm.errorResult).to.be.eql(true);
        });
    });

    describe('fire event', () => {
        const wrapper = mount(textInput, { propsData });
        const inputForm = wrapper.find('input#input-id')[0]
        const emitData = {
            id: wrapper.vm.id,
            initialValue: wrapper.vm.initialValue,
            inputValue: wrapper.data().input.value,
            error: wrapper.vm.errorResult,
            isReady: false
        };

        it('when keyup event occured', () => {
            const fireEventSpy = sinon.spy(wrapper.vm, 'fireEvent');
            const emitSpy = sinon.spy(wrapper.vm, '$emit');
            inputForm.trigger('keyup');
            expect(fireEventSpy.callCount).to.be.eql(1);
            expect(emitSpy.calledWith('changeValue', emitData)).to.be.ok;
            fireEventSpy.restore();
            emitSpy.restore();
        });

        it('when blur event occured', () => {
            const fireEventSpy = sinon.spy(wrapper.vm, 'fireEvent');
            const emitSpy = sinon.spy(wrapper.vm, '$emit');
            inputForm.trigger('blur');
            expect(fireEventSpy.callCount).to.be.eql(1);
            expect(emitSpy.calledWith('blurValue', emitData)).to.be.ok;
            fireEventSpy.restore();
            emitSpy.restore();
        });
    });
});
