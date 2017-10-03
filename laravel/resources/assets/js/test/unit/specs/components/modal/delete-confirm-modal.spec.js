import DeleteConfirmModal from '../../../../../src/components/modal/delete-confirm-modal.vue';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

describe('components/modal/delete-confirm-modal.vue', () => {
    const onClose = sinon.stub();

    const propsData = {
        blackScreenColor: 'rgba(217, 217, 217, 0.75)',
        isActive: true,
        onClose: onClose
    };

    describe('HTML elements', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const div = wrapper.find('div#delete-confirm-modal');
        const buttons = wrapper.find('button#delete-button');

        it('mounted', () => {
            expect(div.is('div')).is.eql(true);
            expect(buttons.is('button')).is.eql(true);
        });
    });

    describe('activities', () => {
        const clickDeleteButton = sinon.spy(DeleteConfirmModal.methods, 'clickDeleteButton');
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const button = wrapper.find('button#delete-button');

        it('click button#delete-button', () => {
            button.trigger('click');
            expect(clickDeleteButton.callCount).to.be.eql(1);
        });

        clickDeleteButton.restore();
    });

    describe('clickDeleteButton()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData, attachToDocument: true });
        const div = wrapper.find('div#delete-confirm-modal');
        wrapper.vm.clickDeleteButton();

        it('change values of property', () => {
            expect(wrapper.vm.modalHeight).is.eql(0);
            expect(wrapper.vm.showDeleteConfirm).is.true;
        });

        it('add style attribute value of \'height\' of div#delete-confirm-modal', () => {
            expect(div.hasStyle('height',wrapper.vm.modalHeightWhenSlideOpened)).to.be.eql(true);
        });
    });

    describe('clickDeleteCancel()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const div = wrapper.find('div#delete-confirm-modal');
        wrapper.vm.clickDeleteCancel();

        it('change a HTML elements', () => {
            expect(div.hasStyle('height', wrapper.vm.modalHeight)).is.true;
        });

        it('change a state value', () => {
            expect(wrapper.vm.showDeleteConfirm).is.false;
        });
    });

    describe('clickDeleteOK()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const emit = sinon.spy(wrapper.vm, '$emit');
        wrapper.vm.clickDeleteOK();

        it('fire $emit(\'onDeleteOK\')', () => {
            expect(emit.callCount).is.eql(1);
            expect(emit.calledWith('onDeleteOK')).is.to.be.ok;
        });

        emit.restore();
    });

    describe('close()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const emit = sinon.spy(wrapper.vm, '$emit');
        wrapper.vm.close();

        it('calls onClose()', () => {
            expect(onClose.callCount).is.eql(1);
        });

        it('fire $emit(\'update:deleteResult\')', () => {
            setTimeout(() => {
                expect(emit.callCount).is.eql(1);
                expect(emit.calledWith('update:deleteResult')).is.to.be.ok;
            }, 1010);
        });

        emit.restore();
    });

    describe('setModalHeight()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const el = wrapper.find('#delete-confirm-modal');

        it('sets \'height\' attribute to \'div.#delete-confirm-modal\' element', () => {
            expect(el.hasStyle('height', wrapper.vm.modalHeight)).is.true;
        });
    });

    describe('isActive', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const spy = sinon.spy(wrapper.vm, 'setModalHeight');

        it('calls setModalHeight()', () => {
                console.log('----------------------------');
                wrapper.setProps({isActive: false});
                wrapper.setProps({isActive: true});
            debugger;
                expect(spy.callCount).is.eql(1);
        });

        spy.restore();
    });
});
