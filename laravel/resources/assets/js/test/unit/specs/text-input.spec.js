import textInput from '../../../src/components/form/text-input.vue';
import { mount } from 'avoriaz';

describe('text-input.vue', () => {
    const wrapper = mount(textInput, {
        propsData: {
            id: 'input-id',
            initialValue: 'hoge',
            minTextLength: 10,
            maxTextLength: 20
        }
    });

    describe('when component mounted', () => {
        it('initialValue should equal to \'hoge\'', () => {
            expect(wrapper.vm.initialValue).to.be.eql('hoge');
        });

        it('input.value should equal to initialValue', () => {
            expect(wrapper.data().input.value).to.be.eql(wrapper.vm.initialValue);
        });

        it('form value should equal to input.value', () => {
            const input = wrapper.find('input#input-id')[0]
            expect(input.element.value).to.be.eql(wrapper.data().input.value);
        });
    });

    describe('when form value changed to \'foo\'', () => {
        it('input.value should equal to \'foo\'', () => {
            const input = wrapper.find('input#input-id')[0];
            input.element.value = 'foo';
            input.trigger('input');
            expect(wrapper.data().input.value).to.be.eql('foo');
        });

        it('form value should not equal to initialValue', () => {
            const input = wrapper.find('input#input-id')[0];
            expect(input.element.value).to.be.eql('foo');
            expect(wrapper.vm.initialValue).to.be.eql('hoge');
        });
    });

    describe('errorResult', () => {
        it('input.value < minTextLength ', () => {
            expect(wrapper.vm.errorResult).to.be.eql(true)
        });

        it('input.value > minTextLength', () => {
            wrapper.data().input.value = 'hogehogehoge';
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value < maxTextLength', () => {
            expect(wrapper.vm.errorResult).to.be.eql(false);
        });

        it('input.value > maxTextLength', () => {
            wrapper.data().input.value = 'hogehogehogehogehogehoge';
            expect(wrapper.vm.errorResult).to.be.eql(true);
        });

    });

    describe('when fire blur event on form fireEvent() called onece', () => {
        it('blur event on form', () => {
            const fireEvent = sinon.spy(wrapper.vm, 'fireEvent');
            wrapper.find('input#input-id')[0].trigger('blur');
            expect(typeof wrapper.vm.fireEvent).to.be.eql('function');
            expect(fireEvent).to.be.calledOnce;
        });
    });

});
