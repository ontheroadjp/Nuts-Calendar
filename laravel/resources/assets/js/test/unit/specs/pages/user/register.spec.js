import Register from '../../../../../src/pages/user/register.vue';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

describe('pages/user/register.vue', () => {

    describe('Input form errors', () => {
        const wrapper = mount(Register);

        const setName = (value) => {
            wrapper.vm.input.name = value;
        }

        const setEmail = (value) => {
            wrapper.vm.input.email = value;
        }

        const setPassword = (value) => {
            wrapper.vm.input.password = value;
        }

        const setPasswordConfirmation = (value) => {
            wrapper.vm.input.passwordConfirmation = value;
        }

        describe('computed: isEmailInvalid', () => {
            it('has empty value', () => {
                expect(wrapper.vm.isNameInvalid()).is.true;
                expect(wrapper.vm.error.name).is.eql('The name field is required.');
            });

            it('has valid name', () => {
                setName('hogehoge');
                expect(wrapper.vm.isNameInvalid()).is.false;
            });
        });

        describe('computed: isEmailInvalid', () => {
            it('has empty value', () => {
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email field is required.');
            });

            it('has valid email', () => {
                setEmail('hoge@hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.false;
            });

            it('has invalid email', () => {
                setEmail('hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email format is invalid.');
            });

            it('has invalid email (reqular expression)', () => {
                setEmail('##87@hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email format is invalid.');
            });
        });

        describe('computed: isPasswordInvalid', () => {
            it('has empty value', () => {
                expect(wrapper.vm.isPasswordInvalid()).is.true;
                expect(wrapper.vm.error.password).is.eql('The password field is required.');
            });

            it('has valid password', () => {
                setPassword('hogepassword');
                expect(wrapper.vm.isPasswordInvalid()).is.false;
            });
        });

        describe('computed: isPasswordConfirmationInvalid', () => {
            it('has empty', () => {
                expect(wrapper.vm.isPasswordConfirmationInvalid()).is.true;
                const errorMessage = 'The password confirmation field is required.';
                expect(wrapper.vm.error.passwordConfirmation).is.eql(errorMessage);
            });

            it('pass: empty, confirmation: password', () => {
                setPasswordConfirmation('password');
                expect(wrapper.vm.isPasswordConfirmationInvalid()).is.true;
                const errorMessage = 'This field must be the same as the password field.';
                expect(wrapper.vm.error.passwordConfirmation).is.eql(errorMessage);
            });

            it('pass: password, confirmation: empty', () => {
                setPassword('password');
                expect(wrapper.vm.isPasswordConfirmationInvalid()).is.true;
                const errorMessage = 'The password confirmation field is required.';
                expect(wrapper.vm.error.passwordConfirmation).is.eql(errorMessage);
            });

            it('pass: password, confirmation: notTheSamePass', () => {
                setPassword('password');
                setPasswordConfirmation('notTheSamePass');
                expect(wrapper.vm.isPasswordConfirmationInvalid()).is.true;
                const errorMessage = 'This field must be the same as the password field.';
                expect(wrapper.vm.error.passwordConfirmation).is.eql(errorMessage);
            });

            it('pass: password, confirmation: password', () => {
                setPassword('password');
                setPasswordConfirmation('password');
                expect(wrapper.vm.isPasswordConfirmationInvalid()).is.false;
            });
        });
    });

    describe('register()', () => {
        const wrapper = mount(Register);

        it('called', () => {
            expect(wrapper.vm.error.name === '').to.be.true;
            expect(wrapper.vm.error.email === '').to.be.true;
            expect(wrapper.vm.error.password === '').to.be.true;
            expect(wrapper.vm.error.passwordConfirmation === '').to.be.true;
        });
    });

});
