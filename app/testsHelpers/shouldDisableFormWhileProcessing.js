/* global context */

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import waitForExpect from 'wait-for-expect';

export default function shouldDisableFormWhileProcessing(
  formComponentName,
  spinnerSelector,
  methods,
) {
  function checkButtonDisabled(wrapper, value) {
    wrapper.update();
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(value);
  }

  function checkSpinnerPresence(wrapper, value) {
    wrapper.update();
    expect(wrapper.exists(spinnerSelector)).toBe(value);
  }

  let wrapper;

  describe('should have submit disable implemented for fetching form', () => {
    context.each([
      ['when success', { status: 200 }],
      ['when failed', { throws: { message: 'FETCH_ERROR' } }],
    ])('%s', (a, response) => {
      loadApiFetchMock(response);

      context('when waiting for response', () => {
        beforeEach(() => {
          wrapper = methods.configureWrapper();
          wrapper
            .find(formComponentName)
            .instance().unsetStateProcessing = () => {};
          methods.fillInAndSubmitForm();
        });

        it('should disable submit', () => {
          checkButtonDisabled(wrapper, true);
        });

        it('should render spinner', () => {
          checkSpinnerPresence(wrapper, true);
        });
      });

      context('after response received', () => {
        beforeEach(() => {
          wrapper = methods.configureWrapper();
          methods.fillInAndSubmitForm();
        });

        it('should enable submit', async () => {
          await waitForExpect(() => {
            checkButtonDisabled(wrapper, false);
          });
        });

        it('should hide spinner', async () => {
          await waitForExpect(() => {
            checkSpinnerPresence(wrapper, false);
          });
        });
      });
    });
  });
}
