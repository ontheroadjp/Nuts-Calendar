import DeleteConfirmModal from '../../../../../src/components/modal/delete-confirm-modal.vue';
//import proxyquire from 'proxyquire';
//import { compileToFunctions } from 'vue-template-compiler'
import { mount } from 'avoriaz';

describe('components/modal/delete-confirm-modal.vue', () => {
    const onClose = sinon.stub();

    const propsData = {
        blackScreenColor: 'rgba(217, 217, 217, 0.75)',
        isActive: true,
        onClose: onClose
    };

    describe('HTML elements', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const divs = wrapper.find('div#delete-confirm-modal');
        const buttons = wrapper.find('button#delete-button');

        it('mounted', () => {
            expect(divs.length).is.eql(1);
            expect(buttons.length).is.eql(1);
        });
    });

    describe('activities', () => {
        const clickDeleteButton = sinon.spy(DeleteConfirmModal.methods, 'clickDeleteButton');
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const button = wrapper.find('button#delete-button')[0];

        it('click button#delete-button', () => {
            button.trigger('click');
            expect(clickDeleteButton.callCount).to.be.eql(1);
        });

        clickDeleteButton.restore();
    });

    describe('clickDeleteButton()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData, attachToDocument: true });
        const div = wrapper.find('div#delete-confirm-modal')[0];
        wrapper.vm.clickDeleteButton();

        it('change values of property', () => {
            expect(wrapper.data().modalHeight).is.eql(0);
        });

        it('add attribute to div#delete-confirm-modal element', () => {
            expect(div.hasStyle(
                'height', wrapper.data().modalHeightWhenSlideOpened)
            ).is.true;
        });
    });

    describe('clickDeleteCancel()', () => {
        const wrapper = mount(DeleteConfirmModal, { propsData });
        const div = wrapper.find('div#delete-confirm-modal')[0];
        wrapper.vm.clickDeleteCancel();

        it('change a HTML elements', () => {
            expect(div.hasStyle('height', wrapper.data().modalHeight)).is.true;
        });

        it('change a state value', () => {
            wrapper.methods.clickDeleteCancel;
            expect(wrapper.data().showDeleteConfirm).is.false;
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
        const el = wrapper.find('#delete-confirm-modal')[0];

        it('sets \'height\' attribute to \'div.#delete-confirm-modal\' element', () => {
            expect(el.hasStyle('height', wrapper.data().modalHeight)).is.true;
        });
    });

    describe('isActive', () => {
        const setModalHeight = sinon.spy(DeleteConfirmModal.methods, 'setModalHeight');
        const wrapper = mount(DeleteConfirmModal, { propsData });

        it('calls setModalHeight()', async () => {
            wrapper.setProps({isActive: true});
            await wrapper.vm.$nextTick(() => {
                expect(setModalHeight.callCount).is.eql(1);
            });
        });

        setModalHeight.restore();
    });
});
